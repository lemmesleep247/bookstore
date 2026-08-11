package com.book.store.controller;

import com.book.store.dto.request.BookAuthorRequest;
import com.book.store.dto.response.BookAuthorResponse;
import com.book.store.service.BookAuthorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/authors")
public class BookAuthorController {
    private final BookAuthorService bookAuthorService;

    @GetMapping
    public ResponseEntity<List<BookAuthorResponse>> getAllAuthors() {
        return ResponseEntity.ok(bookAuthorService.getAllBookAuthors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookAuthorResponse> getAuthor(@PathVariable long id) {
        return ResponseEntity.ok(bookAuthorService.getAuthor(id));
    }

    @PostMapping
    public ResponseEntity<BookAuthorResponse> createAuthor(@Valid @RequestBody BookAuthorRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bookAuthorService.saveAuthor(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookAuthorResponse> updateAuthor(@PathVariable long id, @Valid @RequestBody BookAuthorRequest request) {
        return ResponseEntity.ok(bookAuthorService.updateAuthor(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAuthor(@PathVariable long id) {
        bookAuthorService.deleteAuthor(id);
        return ResponseEntity.noContent().build();
    }
}
