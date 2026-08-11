package com.book.store.repository;

import com.book.store.model.BookPublisher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookPublisherRepository extends JpaRepository<BookPublisher, Long> {
    @Query("SELECT COUNT(*) FROM BookPublisher bp WHERE bp.validFlag = 'Y'")
    int getPublishersCount();
}
