package com.book.store.repository;

import com.book.store.model.Book;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    @Query("SELECT COUNT(*) FROM Book b WHERE b.validFlag = 'Y'")
    int getBooksCount();

    @Modifying
    @Transactional
    @Query("UPDATE Book SET copies = (copies - :copies) where id = :id")
    void updateBookCopies(@Param("copies") int quantity, @Param("id") long bookId);
}
