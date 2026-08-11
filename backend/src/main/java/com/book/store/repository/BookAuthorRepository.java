package com.book.store.repository;

import com.book.store.model.BookAuthor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookAuthorRepository extends JpaRepository<BookAuthor, Long> {
    @Query("SELECT COUNT(*) FROM BookAuthor ba WHERE ba.validFlag = 'Y'")
    int getAuthorsCount();
}
