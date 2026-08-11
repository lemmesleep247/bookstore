package com.book.store.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookAuthorResponse {
    private Long id;
    private String name;
    private int age;
    private String email;
}
