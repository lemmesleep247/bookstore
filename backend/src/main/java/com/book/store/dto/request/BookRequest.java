package com.book.store.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class BookRequest {
    @NotBlank
    private String title;

    private String description;

    private String[] authorIds;

    @Min(0)
    private int copies;

    @Positive
    private double price;

    @NotNull
    private Long categoryId;

    @NotNull
    private Long publisherId;
}
