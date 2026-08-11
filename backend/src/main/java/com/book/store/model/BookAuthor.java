package com.book.store.model;

import jakarta.persistence.*;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "book_author_info")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookAuthor extends Common {
    @Id
    @GeneratedValue(generator = "book_author_seq", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "book_author_seq", sequenceName = "book_author_seq", allocationSize = 1)
    private Long id;
    private String name;
    private int age;
    private String email;
}
