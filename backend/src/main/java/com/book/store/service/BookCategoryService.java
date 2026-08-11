package com.book.store.service;

import com.book.store.dto.request.BookCategoryRequest;
import com.book.store.dto.response.BookCategoryResponse;

import java.util.List;

public interface BookCategoryService {
    List<BookCategoryResponse> getAllBookCategories();

    BookCategoryResponse saveCategory(BookCategoryRequest request);

    BookCategoryResponse getCategory(long id);

    BookCategoryResponse updateCategory(long id, BookCategoryRequest request);

    void deleteCategory(long id);

    int getCategoriesCount();
}
