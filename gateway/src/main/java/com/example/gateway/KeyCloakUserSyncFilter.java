package com.example.gateway;

import com.example.gateway.dto.RegisterRequest;
import com.example.gateway.service.UserService;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class KeyCloakUserSyncFilter implements WebFilter {

    @Autowired
    private UserService userService;

    @Override
    public Mono<Void> filter(ServerWebExchange webExchange, WebFilterChain chain){
        String userId = getHeaderValueFromRequest(webExchange, "X-User-ID");
        String token = getHeaderValueFromRequest(webExchange, "Authorization");
        RegisterRequest registerRequest = getUserDetails(token);

        if(userId == null){
            userId = registerRequest.getKeyCloakId();
        }

        if(userId != null && token != null){
            String finalUserId = userId;
           return userService.validateUser(userId)
                   .flatMap(e-> {
                       if(!e){
                           log.info("User not present: {} , calling for creation", finalUserId);
                           if(registerRequest != null){
                               return userService.registerRequest(registerRequest).then(Mono.empty());
                           }
                           return Mono.empty();
                       }
                       log.info("User exists: {} , moving forward", finalUserId);
                       return Mono.empty();
                   })
                   .then(Mono.defer(()->{
                       ServerHttpRequest mutatedRequest = webExchange.getRequest()
                               .mutate()
                               .header("X-User-Id", finalUserId)
                               .build();
                       return chain.filter(webExchange.mutate().request(mutatedRequest).build());
                   }));
        }

        return chain.filter(webExchange);
    }

    private String getHeaderValueFromRequest(ServerWebExchange exchange, String key){
        return exchange.getRequest().getHeaders().getFirst(key);
    }

    private RegisterRequest getUserDetails(String token){
        try{
            String tokenWithoutBearer = token.split(" ")[1];
            SignedJWT signedJWT = SignedJWT.parse(tokenWithoutBearer);
            JWTClaimsSet claims = signedJWT.getJWTClaimsSet();

            return RegisterRequest.builder()
                    .keyCloakId(claims.getStringClaim("sub"))
                    .firstName(claims.getStringClaim("given_name"))
                    .lastName(claims.getStringClaim("family_name"))
                    .email(claims.getStringClaim("email"))
                    .build();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
