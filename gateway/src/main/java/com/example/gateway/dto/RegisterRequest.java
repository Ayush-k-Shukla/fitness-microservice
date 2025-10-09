package com.example.gateway.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterRequest {
    @NotBlank(message= "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message= "KeyCloak Id is required")
    private String keyCloakId;

    private String firstName;
    private String lastName;
}
