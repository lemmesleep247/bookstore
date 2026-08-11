package com.book.store.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class PurchaseRequest {
    @NotNull
    private Long bookId;

    @Positive
    private int quantity;
}
