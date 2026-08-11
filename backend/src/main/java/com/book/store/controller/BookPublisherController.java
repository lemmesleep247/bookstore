package com.book.store.controller;

import com.book.store.dto.request.BookPublisherRequest;
import com.book.store.dto.response.BookPublisherResponse;
import com.book.store.service.BookPublisherService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BookPublisherController {
    private final BookPublisherService bookPublisherService;

    @GetMapping("/api/publishers/{id}")
    public ResponseEntity<BookPublisherResponse> getPublisherDetails(@PathVariable long id) {
        return ResponseEntity.ok(bookPublisherService.getPublisher(id));
    }

    @GetMapping("/api/admin/publishers")
    public ResponseEntity<List<BookPublisherResponse>> getAllPublishers() {
        return ResponseEntity.ok(bookPublisherService.getAllBookPublishers());
    }

    @PostMapping("/api/admin/publishers")
    public ResponseEntity<BookPublisherResponse> createPublisher(@Valid @RequestBody BookPublisherRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bookPublisherService.savePublisher(request));
    }

    @PutMapping("/api/admin/publishers/{id}")
    public ResponseEntity<BookPublisherResponse> updatePublisher(@PathVariable long id, @Valid @RequestBody BookPublisherRequest request) {
        return ResponseEntity.ok(bookPublisherService.updatePublisher(id, request));
    }

    @DeleteMapping("/api/admin/publishers/{id}")
    public ResponseEntity<Void> deletePublisher(@PathVariable long id) {
        bookPublisherService.deletePublisher(id);
        return ResponseEntity.noContent().build();
    }
}
