package com.book.store.controller;

import com.book.store.dto.request.BookCategoryRequest;
import com.book.store.dto.response.BookCategoryResponse;
import com.book.store.service.BookCategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BookCategoryController {
    private final BookCategoryService bookCategoryService;

    @GetMapping("/api/categories/{id}")
    public ResponseEntity<BookCategoryResponse> getCategoryDetails(@PathVariable long id) {
        return ResponseEntity.ok(bookCategoryService.getCategory(id));
    }

    @GetMapping("/api/admin/categories")
    public ResponseEntity<List<BookCategoryResponse>> getAllCategories() {
        return ResponseEntity.ok(bookCategoryService.getAllBookCategories());
    }

    @PostMapping("/api/admin/categories")
    public ResponseEntity<BookCategoryResponse> createCategory(@Valid @RequestBody BookCategoryRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bookCategoryService.saveCategory(request));
    }

    @PutMapping("/api/admin/categories/{id}")
    public ResponseEntity<BookCategoryResponse> updateCategory(@PathVariable long id, @Valid @RequestBody BookCategoryRequest request) {
        return ResponseEntity.ok(bookCategoryService.updateCategory(id, request));
    }

    @DeleteMapping("/api/admin/categories/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable long id) {
        bookCategoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}
