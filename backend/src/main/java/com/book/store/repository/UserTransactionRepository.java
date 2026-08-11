package com.book.store.repository;

import com.book.store.model.UserTransaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTransactionRepository extends JpaRepository<UserTransaction, Long> {
    Page<UserTransaction> findAllByUserId(Long userId, Pageable pageable);
}
