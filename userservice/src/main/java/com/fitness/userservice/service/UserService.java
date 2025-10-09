package com.fitness.userservice.service;

import com.fitness.userservice.dto.RegisterRequest;
import com.fitness.userservice.dto.UserResponse;
import com.fitness.userservice.exception.UserNotFoundException;
import com.fitness.userservice.model.User;
import com.fitness.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserResponse getUserProfile(String userId){
        User user = userRepository.findBykeyCloakId(userId)
                .orElseThrow(() -> new UserNotFoundException("User not present"));
        return UserResponse.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .id(user.getId())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .keyCloakId(user.getKeyCloakId())
                .build();
    }

    public UserResponse register(RegisterRequest registerRequest){
        if (userRepository.existsByEmail(registerRequest.getEmail())){
            User presentUser = userRepository.findByEmail(registerRequest.getEmail());

            return UserResponse.builder()
                    .firstName(presentUser.getFirstName())
                    .lastName(presentUser.getLastName())
                    .email(presentUser.getEmail())
                    .id(presentUser.getId())
                    .createdAt(presentUser.getCreatedAt())
                    .updatedAt(presentUser.getUpdatedAt())
                    .keyCloakId(presentUser.getKeyCloakId())
                    .build();
        }

        User user = new User();
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setEmail(registerRequest.getEmail());
        user.setKeyCloakId(registerRequest.getKeyCloakId());

        User savedUser = userRepository.save(user);

        return UserResponse.builder()
                .firstName(savedUser.getFirstName())
                .lastName(savedUser.getLastName())
                .email(savedUser.getEmail())
                .id(savedUser.getId())
                .createdAt(savedUser.getCreatedAt())
                .updatedAt(savedUser.getUpdatedAt())
                .keyCloakId(user.getKeyCloakId())
                .build();
    }

    public Boolean validateUser(String userId) {
        return userRepository.existsBykeyCloakId(userId);
    }
}
