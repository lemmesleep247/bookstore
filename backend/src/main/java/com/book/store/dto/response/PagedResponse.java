package com.book.store.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.function.Function;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PagedResponse<T> {
    private List<T> content;
    private int pageNo;
    private int totalPages;
    private long totalElements;

    public static <E, T> PagedResponse<T> of(Page<E> page, int pageNo, Function<E, T> mapper) {
        return new PagedResponse<>(
                page.getContent().stream().map(mapper).toList(),
                pageNo,
                page.getTotalPages(),
                page.getTotalElements()
        );
    }
}
