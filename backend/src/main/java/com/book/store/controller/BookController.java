package com.book.store.controller;

import com.book.store.dto.request.BookRequest;
import com.book.store.dto.response.BookResponse;
import com.book.store.dto.response.PagedResponse;
import com.book.store.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    @GetMapping("/api/books")
    public ResponseEntity<PagedResponse<BookResponse>> getAllBooks(
            @RequestParam(defaultValue = "1") int pageNo
    ) {
        return ResponseEntity.ok(bookService.getAllBooks(pageNo - 1));
    }

    @GetMapping("/api/books/{id}")
    public ResponseEntity<BookResponse> getBook(@PathVariable long id) {
        return ResponseEntity.ok(bookService.getBook(id));
    }

    @PostMapping("/api/admin/books")
    public ResponseEntity<BookResponse> createBook(@Valid @RequestBody BookRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bookService.createBook(request));
    }

    @PutMapping("/api/admin/books/{id}")
    public ResponseEntity<BookResponse> updateBook(@PathVariable long id, @Valid @RequestBody BookRequest request) {
        return ResponseEntity.ok(bookService.updateBook(id, request));
    }

    @DeleteMapping("/api/admin/books/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
}
