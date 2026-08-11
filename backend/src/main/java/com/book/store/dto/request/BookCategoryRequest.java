package com.book.store.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class BookCategoryRequest {
    @NotBlank
    private String name;

    private String description;
}
