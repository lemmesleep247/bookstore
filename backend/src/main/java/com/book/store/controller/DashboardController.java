package com.book.store.controller;

import com.book.store.dto.response.DashboardResponse;
import com.book.store.service.BookAuthorService;
import com.book.store.service.BookCategoryService;
import com.book.store.service.BookPublisherService;
import com.book.store.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/dashboard")
public class DashboardController {
    private final BookCategoryService bookCategoryService;
    private final BookPublisherService bookPublisherService;
    private final BookAuthorService bookAuthorService;
    private final BookService bookService;

    @GetMapping
    public ResponseEntity<DashboardResponse> getDashboard() {
        DashboardResponse response = DashboardResponse.builder()
                .categoriesCount(bookCategoryService.getCategoriesCount())
                .publishersCount(bookPublisherService.getPublishersCount())
                .authorsCount(bookAuthorService.getAuthorsCount())
                .booksCount(bookService.getBooksCount())
                .build();

        return ResponseEntity.ok(response);
    }
}
