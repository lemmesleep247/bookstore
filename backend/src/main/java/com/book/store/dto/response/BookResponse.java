package com.book.store.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookResponse {
    private Long id;
    private String title;
    private String description;
    private String[] authorIds;
    private String[] authorNames;
    private int copies;
    private double price;
    private Long categoryId;
    private String categoryName;
    private Long publisherId;
    private String publisherName;
}
