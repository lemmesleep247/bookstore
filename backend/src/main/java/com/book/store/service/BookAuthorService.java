package com.book.store.service;

import com.book.store.dto.request.BookAuthorRequest;
import com.book.store.dto.response.BookAuthorResponse;

import java.util.List;

public interface BookAuthorService {
    List<BookAuthorResponse> getAllBookAuthors();

    BookAuthorResponse saveAuthor(BookAuthorRequest request);

    BookAuthorResponse getAuthor(long id);

    BookAuthorResponse updateAuthor(long id, BookAuthorRequest request);

    void deleteAuthor(long id);

    int getAuthorsCount();

    String[] getAuthorNames(String[] authorIds);
}
