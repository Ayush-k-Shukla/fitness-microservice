package com.example.gateway.service;

import com.example.gateway.dto.RegisterRequest;
import com.example.gateway.dto.UserResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final WebClient userServiceWebClient;

    public Mono<Boolean> validateUser(String userId){
        log.info("User validation call: {}", userId);
        return userServiceWebClient.get()
                .uri("/api/users/{userId}/validate", userId)
                .retrieve()
                .bodyToMono(Boolean.class)
                .onErrorResume(WebClientResponseException.class, e -> {
                    if(e.getStatusCode() == HttpStatus.NOT_FOUND){
                        return Mono.error(new RuntimeException("User not found: " + userId));
                    } else  if(e.getStatusCode() == HttpStatus.BAD_REQUEST){
                        return Mono.error(new RuntimeException("Invalid: " + userId));
                    }

                    return Mono.error(new RuntimeException("Something went wrong: " + e.getMessage()));
                });
    }

    public Mono<UserResponse> registerRequest(RegisterRequest request){
        log.info("User registration call: {}", request.getKeyCloakId());

        return userServiceWebClient.post()
                .uri("/api/users/register")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(UserResponse.class)
                .onErrorResume(WebClientResponseException.class, e -> {
                    return Mono.error(new RuntimeException("Something went wrong: " + e.getMessage()));
                });
    }
}
