package com.fitness.aiservice.service;

import com.fitness.aiservice.model.GeminiRequestBody;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
public class GeminiService {
    private final WebClient webClient;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public GeminiService(WebClient.Builder webClientBuilder){
        this.webClient = webClientBuilder.build();
    }

    public String getSummary(String content){
        GeminiRequestBody requestBody = GeminiRequestBody.builder()
                .contents(
                        List.of(
                                GeminiRequestBody.Content.builder()
                                        .parts(
                                                List.of(
                                                        GeminiRequestBody.Part.builder()
                                                                .text(content)
                                                                .build()
                                                )
                                        ).build()
                        )
                )
                .build();

        String response = webClient.post()
                .uri(geminiApiUrl + geminiApiKey)
                .header("Content-type","application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return response;
    }
}
