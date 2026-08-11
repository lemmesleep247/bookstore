package com.book.store.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateUserRequest {
    @NotBlank
    private String fullName;

    @Email
    @NotBlank
    private String email;

    private String mobileNo;
    private String address;
}
