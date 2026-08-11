package com.book.store.service.impl;

import com.book.store.dto.request.BookPublisherRequest;
import com.book.store.dto.response.BookPublisherResponse;
import com.book.store.exception.ResourceNotFoundException;
import com.book.store.model.BookPublisher;
import com.book.store.repository.BookPublisherRepository;
import com.book.store.service.BookPublisherService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookPublisherServiceImpl implements BookPublisherService {
    private final BookPublisherRepository bookPublisherRepository;

    @Override
    public List<BookPublisherResponse> getAllBookPublishers() {
        return bookPublisherRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Override
    public BookPublisherResponse savePublisher(BookPublisherRequest request) {
        BookPublisher publisher = BookPublisher.builder()
                .name(request.getName())
                .email(request.getEmail())
                .address(request.getAddress())
                .phone(request.getPhone())
                .build();
        publisher.setValidFlag('Y');
        publisher.setCreatedBy("Admin");
        publisher.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        return toResponse(bookPublisherRepository.save(publisher));
    }

    @Override
    public BookPublisherResponse getPublisher(long id) {
        return toResponse(findPublisherOrThrow(id));
    }

    @Override
    public BookPublisherResponse updatePublisher(long id, BookPublisherRequest request) {
        BookPublisher publisher = findPublisherOrThrow(id);
        publisher.setName(request.getName());
        publisher.setEmail(request.getEmail());
        publisher.setAddress(request.getAddress());
        publisher.setPhone(request.getPhone());
        publisher.setUpdatedBy("Admin");
        publisher.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        return toResponse(bookPublisherRepository.save(publisher));
    }

    @Override
    public void deletePublisher(long id) {
        findPublisherOrThrow(id);
        bookPublisherRepository.deleteById(id);
    }

    @Override
    public int getPublishersCount() {
        return bookPublisherRepository.getPublishersCount();
    }

    private BookPublisher findPublisherOrThrow(long id) {
        return bookPublisherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Publisher not found with id: " + id));
    }

    private BookPublisherResponse toResponse(BookPublisher publisher) {
        return BookPublisherResponse.builder()
                .id(publisher.getId())
                .name(publisher.getName())
                .email(publisher.getEmail())
                .address(publisher.getAddress())
                .phone(publisher.getPhone())
                .validFlag(publisher.getValidFlag())
                .createdBy(publisher.getCreatedBy())
                .createdAt(publisher.getCreatedAt())
                .build();
    }
}
