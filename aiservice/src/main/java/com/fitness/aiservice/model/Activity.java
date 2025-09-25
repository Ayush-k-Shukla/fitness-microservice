package com.fitness.aiservice.model;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;


@Data
@Builder
public class Activity {
    private String id;
    private String userId;
    private String activityType;
    private Integer duration;
    private Integer caloriesBurned;
    private LocalDateTime startedAt;
    private Map<String, Object> additionalMetrics;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
