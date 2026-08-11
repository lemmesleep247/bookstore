package com.book.store.service.impl;

import com.book.store.dto.request.BookRequest;
import com.book.store.dto.request.PurchaseRequest;
import com.book.store.dto.response.BookResponse;
import com.book.store.dto.response.PagedResponse;
import com.book.store.dto.response.PurchaseResponse;
import com.book.store.dto.response.UserTransactionResponse;
import com.book.store.exception.BadRequestException;
import com.book.store.exception.ResourceNotFoundException;
import com.book.store.model.Book;
import com.book.store.model.BookCategory;
import com.book.store.model.BookPublisher;
import com.book.store.model.UserTransaction;
import com.book.store.repository.BookAuthorRepository;
import com.book.store.repository.BookCategoryRepository;
import com.book.store.repository.BookPublisherRepository;
import com.book.store.repository.BookRepository;
import com.book.store.repository.UserTransactionRepository;
import com.book.store.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private static final int PAGE_SIZE = 5;

    private final BookRepository bookRepository;
    private final BookCategoryRepository bookCategoryRepository;
    private final BookPublisherRepository bookPublisherRepository;
    private final BookAuthorRepository bookAuthorRepository;
    private final UserTransactionRepository userTransactionRepository;

    @Override
    public PagedResponse<BookResponse> getAllBooks(int pageNo) {
        Pageable pageable = PageRequest.of(pageNo, PAGE_SIZE);
        Page<Book> books = bookRepository.findAll(pageable);

        return PagedResponse.of(books, pageNo + 1, this::toResponse);
    }

    @Override
    public BookResponse getBook(long id) {
        return toResponse(findBookOrThrow(id));
    }

    @Override
    public BookResponse createBook(BookRequest request) {
        Book book = new Book();
        applyRequest(book, request);
        book.setValidFlag('Y');
        book.setCreatedBy("Admin");
        book.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        return toResponse(bookRepository.save(book));
    }

    @Override
    public BookResponse updateBook(long id, BookRequest request) {
        Book book = findBookOrThrow(id);
        applyRequest(book, request);
        book.setUpdatedBy("Admin");
        book.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        return toResponse(bookRepository.save(book));
    }

    @Override
    public void deleteBook(long id) {
        findBookOrThrow(id);
        bookRepository.deleteById(id);
    }

    @Override
    public int getBooksCount() {
        return bookRepository.getBooksCount();
    }

    @Override
    public PurchaseResponse purchaseBook(long userId, String userName, PurchaseRequest request) {
        Book book = findBookOrThrow(request.getBookId());

        if (book.getCopies() < request.getQuantity()) {
            throw new BadRequestException("Not enough copies available for this book");
        }

        UserTransaction transaction = UserTransaction.builder()
                .orderId(UUID.randomUUID().toString())
                .bookId(book.getId())
                .userId(userId)
                .quantity(request.getQuantity())
                .price(book.getPrice() * request.getQuantity())
                .build();
        transaction.setValidFlag('Y');
        transaction.setCreatedBy(userName);
        transaction.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        userTransactionRepository.save(transaction);
        bookRepository.updateBookCopies(request.getQuantity(), book.getId());

        return PurchaseResponse.builder()
                .orderId(transaction.getOrderId())
                .bookId(book.getId())
                .bookTitle(book.getTitle())
                .quantity(request.getQuantity())
                .totalPrice(transaction.getPrice())
                .build();
    }

    @Override
    public PagedResponse<UserTransactionResponse> getUserTransactions(long userId, int pageNo) {
        Pageable pageable = PageRequest.of(pageNo, PAGE_SIZE);
        Page<UserTransaction> transactions = userTransactionRepository.findAllByUserId(userId, pageable);

        return PagedResponse.of(transactions, pageNo + 1, this::toTransactionResponse);
    }

    private void applyRequest(Book book, BookRequest request) {
        BookCategory category = bookCategoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));
        BookPublisher publisher = bookPublisherRepository.findById(request.getPublisherId())
                .orElseThrow(() -> new ResourceNotFoundException("Publisher not found with id: " + request.getPublisherId()));

        book.setTitle(request.getTitle());
        book.setDescription(request.getDescription());
        book.setAuthors(request.getAuthorIds());
        book.setCopies(request.getCopies());
        book.setPrice(request.getPrice());
        book.setCategory(category);
        book.setPublisher(publisher);
    }

    private Book findBookOrThrow(long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));
    }

    private BookResponse toResponse(Book book) {
        String[] authorIds = book.getAuthors();
        String[] authorNames = authorIds == null
                ? new String[0]
                : Arrays.stream(authorIds)
                        .map(id -> bookAuthorRepository.findById(Long.parseLong(id))
                                .map(author -> author.getName())
                                .orElse("Unknown"))
                        .toArray(String[]::new);

        return BookResponse.builder()
                .id(book.getId())
                .title(book.getTitle())
                .description(book.getDescription())
                .authorIds(authorIds)
                .authorNames(authorNames)
                .copies(book.getCopies())
                .price(book.getPrice())
                .categoryId(book.getCategory().getId())
                .categoryName(book.getCategory().getName())
                .publisherId(book.getPublisher().getId())
                .publisherName(book.getPublisher().getName())
                .build();
    }

    private UserTransactionResponse toTransactionResponse(UserTransaction transaction) {
        String bookTitle = bookRepository.findById(transaction.getBookId())
                .map(Book::getTitle)
                .orElse("Unknown");

        return UserTransactionResponse.builder()
                .id(transaction.getId())
                .orderId(transaction.getOrderId())
                .bookId(transaction.getBookId())
                .bookTitle(bookTitle)
                .quantity(transaction.getQuantity())
                .price(transaction.getPrice())
                .createdAt(transaction.getCreatedAt())
                .build();
    }
}
