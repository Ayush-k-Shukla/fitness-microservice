package com.fitness.activityservice.service;

import com.fitness.activityservice.dto.ActivityRequest;
import com.fitness.activityservice.dto.ActivityResponse;
import com.fitness.activityservice.model.Activity;
import com.fitness.activityservice.repository.ActivityRepository;
import org.springframework.stereotype.Service;

@Service
public class ActivityService {

    private ActivityRepository activityRepository;

    public ActivityResponse trackActivity(ActivityRequest request) {
        Activity activity = Activity.builder()
                .userId(request.getUserId())
                .activityType(request.getActivityType())
                .caloriesBurned(request.getCaloriesBurned())
                .duration(request.getDuration())
                .startedAt(request.getStartedAt())
                .additionalMetrics(request.getAdditionalMetrics())
                .build();

        Activity saved = activityRepository.save(activity);
        return mapToResponse(saved);
    }

    private ActivityResponse mapToResponse(Activity activity){
        return ActivityResponse.builder()
                .id(activity.getId())
                .activityType(activity.getActivityType())
                .additionalMetrics(activity.getAdditionalMetrics())
                .createdAt(activity.getCreatedAt())
                .updatedAt(activity.getUpdatedAt())
                .startedAt(activity.getStartedAt())
                .caloriesBurned(activity.getCaloriesBurned())
                .duration(activity.getDuration())
                .userId(activity.getUserId())
                .build();
    }
}
