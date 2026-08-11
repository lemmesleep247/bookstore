package com.book.store.controller;

import com.book.store.dto.request.PurchaseRequest;
import com.book.store.dto.response.PagedResponse;
import com.book.store.dto.response.PurchaseResponse;
import com.book.store.dto.response.UserTransactionResponse;
import com.book.store.security.UserPrincipal;
import com.book.store.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/purchases")
public class PurchaseController {
    private final BookService bookService;

    @PostMapping
    public ResponseEntity<PurchaseResponse> purchaseBook(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody PurchaseRequest request
    ) {
        PurchaseResponse response = bookService.purchaseBook(
                principal.getUserId(), principal.getUsername(), request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<PagedResponse<UserTransactionResponse>> getUserTransactions(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam(defaultValue = "1") int pageNo
    ) {
        return ResponseEntity.ok(bookService.getUserTransactions(principal.getUserId(), pageNo - 1));
    }
}
