package com.book.store.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserTransactionResponse {
    private Long id;
    private String orderId;
    private Long bookId;
    private String bookTitle;
    private int quantity;
    private double price;
    private Timestamp createdAt;
}
