package com.book.store.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "book_publisher_info")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookPublisher extends Common {
    @Id
    @GeneratedValue(generator = "book_publisher_seq", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "book_publisher_seq", sequenceName = "book_publisher_seq", allocationSize = 1)
    private Long id;
    private String name;
    private String email;
    private String address;
    private String phone;

    @JsonIgnore
    @OneToMany(mappedBy = "publisher", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Book> books = new ArrayList<>();
}
