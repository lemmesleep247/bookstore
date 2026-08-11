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
public class BookCategoryResponse {
    private Long id;
    private String name;
    private String description;
    private char validFlag;
    private String createdBy;
    private Timestamp createdAt;
}
