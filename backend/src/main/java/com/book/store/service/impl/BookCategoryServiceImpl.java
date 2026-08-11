package com.book.store.service.impl;

import com.book.store.dto.request.BookCategoryRequest;
import com.book.store.dto.response.BookCategoryResponse;
import com.book.store.exception.ResourceNotFoundException;
import com.book.store.model.BookCategory;
import com.book.store.repository.BookCategoryRepository;
import com.book.store.service.BookCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookCategoryServiceImpl implements BookCategoryService {
    private final BookCategoryRepository bookCategoryRepository;

    @Override
    public List<BookCategoryResponse> getAllBookCategories() {
        return bookCategoryRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Override
    public BookCategoryResponse saveCategory(BookCategoryRequest request) {
        BookCategory category = BookCategory.builder()
                .name(request.getName())
                .description(request.getDescription())
                .build();
        category.setValidFlag('Y');
        category.setCreatedBy("Admin");
        category.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        return toResponse(bookCategoryRepository.save(category));
    }

    @Override
    public BookCategoryResponse getCategory(long id) {
        return toResponse(findCategoryOrThrow(id));
    }

    @Override
    public BookCategoryResponse updateCategory(long id, BookCategoryRequest request) {
        BookCategory category = findCategoryOrThrow(id);
        category.setName(request.getName());
        category.setDescription(request.getDescription());
        category.setUpdatedBy("Admin");
        category.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        return toResponse(bookCategoryRepository.save(category));
    }

    @Override
    public void deleteCategory(long id) {
        findCategoryOrThrow(id);
        bookCategoryRepository.deleteById(id);
    }

    @Override
    public int getCategoriesCount() {
        return bookCategoryRepository.getCategoriesCount();
    }

    private BookCategory findCategoryOrThrow(long id) {
        return bookCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
    }

    private BookCategoryResponse toResponse(BookCategory category) {
        return BookCategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .validFlag(category.getValidFlag())
                .createdBy(category.getCreatedBy())
                .createdAt(category.getCreatedAt())
                .build();
    }
}
