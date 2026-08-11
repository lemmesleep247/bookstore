package com.book.store.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PurchaseResponse {
    private String orderId;
    private Long bookId;
    private String bookTitle;
    private int quantity;
    private double totalPrice;
}
