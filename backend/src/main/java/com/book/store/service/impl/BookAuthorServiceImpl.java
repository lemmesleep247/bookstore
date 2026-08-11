package com.book.store.service.impl;

import com.book.store.dto.request.BookAuthorRequest;
import com.book.store.dto.response.BookAuthorResponse;
import com.book.store.exception.ResourceNotFoundException;
import com.book.store.model.BookAuthor;
import com.book.store.repository.BookAuthorRepository;
import com.book.store.service.BookAuthorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookAuthorServiceImpl implements BookAuthorService {
    private final BookAuthorRepository bookAuthorRepository;

    @Override
    public List<BookAuthorResponse> getAllBookAuthors() {
        return bookAuthorRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Override
    public BookAuthorResponse saveAuthor(BookAuthorRequest request) {
        BookAuthor author = BookAuthor.builder()
                .name(request.getName())
                .age(request.getAge())
                .email(request.getEmail())
                .build();
        author.setValidFlag('Y');
        author.setCreatedBy("Admin");
        author.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        return toResponse(bookAuthorRepository.save(author));
    }

    @Override
    public BookAuthorResponse getAuthor(long id) {
        return toResponse(findAuthorOrThrow(id));
    }

    @Override
    public BookAuthorResponse updateAuthor(long id, BookAuthorRequest request) {
        BookAuthor author = findAuthorOrThrow(id);
        author.setName(request.getName());
        author.setAge(request.getAge());
        author.setEmail(request.getEmail());
        author.setUpdatedBy("Admin");
        author.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        return toResponse(bookAuthorRepository.save(author));
    }

    @Override
    public void deleteAuthor(long id) {
        findAuthorOrThrow(id);
        bookAuthorRepository.deleteById(id);
    }

    @Override
    public int getAuthorsCount() {
        return bookAuthorRepository.getAuthorsCount();
    }

    @Override
    public String[] getAuthorNames(String[] authorIds) {
        if (authorIds == null) {
            return new String[0];
        }

        return Arrays.stream(authorIds)
                .map(id -> bookAuthorRepository.findById(Long.parseLong(id))
                        .map(BookAuthor::getName)
                        .orElse("Unknown"))
                .toArray(String[]::new);
    }

    private BookAuthor findAuthorOrThrow(long id) {
        return bookAuthorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Author not found with id: " + id));
    }

    private BookAuthorResponse toResponse(BookAuthor author) {
        return BookAuthorResponse.builder()
                .id(author.getId())
                .name(author.getName())
                .age(author.getAge())
                .email(author.getEmail())
                .build();
    }
}
