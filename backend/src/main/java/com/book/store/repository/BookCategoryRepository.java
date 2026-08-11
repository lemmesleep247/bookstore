package com.book.store.repository;

import com.book.store.model.BookCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookCategoryRepository extends JpaRepository<BookCategory, Long> {
    @Query("SELECT COUNT(*) FROM BookCategory bc WHERE bc.validFlag = 'Y'")
    int getCategoriesCount();
}
