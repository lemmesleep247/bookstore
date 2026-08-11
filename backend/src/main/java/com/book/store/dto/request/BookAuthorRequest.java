package com.book.store.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class BookAuthorRequest {
    @NotBlank
    private String name;

    @Min(0)
    private int age;

    @Email
    @NotBlank
    private String email;
}
