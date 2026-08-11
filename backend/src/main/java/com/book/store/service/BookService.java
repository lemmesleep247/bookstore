package com.book.store.service;

import com.book.store.dto.request.BookRequest;
import com.book.store.dto.request.PurchaseRequest;
import com.book.store.dto.response.BookResponse;
import com.book.store.dto.response.PagedResponse;
import com.book.store.dto.response.PurchaseResponse;
import com.book.store.dto.response.UserTransactionResponse;

public interface BookService {
    PagedResponse<BookResponse> getAllBooks(int pageNo);

    BookResponse getBook(long id);

    BookResponse createBook(BookRequest request);

    BookResponse updateBook(long id, BookRequest request);

    void deleteBook(long id);

    int getBooksCount();

    PurchaseResponse purchaseBook(long userId, String userName, PurchaseRequest request);

    PagedResponse<UserTransactionResponse> getUserTransactions(long userId, int pageNo);
}
