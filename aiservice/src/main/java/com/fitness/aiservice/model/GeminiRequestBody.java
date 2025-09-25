package com.fitness.aiservice.model;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class GeminiRequestBody {
    private List<Content> contents;

    @Data
    @Builder
    public static class Content {
        private List<Part> parts;
    }

    @Data
    @Builder
    public static class Part {
        private String text;
    }
}
