package com.book.store.service;

import com.book.store.dto.request.BookPublisherRequest;
import com.book.store.dto.response.BookPublisherResponse;

import java.util.List;

public interface BookPublisherService {
    List<BookPublisherResponse> getAllBookPublishers();

    BookPublisherResponse savePublisher(BookPublisherRequest request);

    BookPublisherResponse getPublisher(long id);

    BookPublisherResponse updatePublisher(long id, BookPublisherRequest request);

    void deletePublisher(long id);

    int getPublishersCount();
}
