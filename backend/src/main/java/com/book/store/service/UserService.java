package com.book.store.service;

import com.book.store.dto.request.ChangePasswordRequest;
import com.book.store.dto.request.LoginRequest;
import com.book.store.dto.request.RegisterRequest;
import com.book.store.dto.request.UpdateUserRequest;
import com.book.store.dto.response.AuthResponse;
import com.book.store.dto.response.UserResponse;

public interface UserService {
    AuthResponse login(LoginRequest request);

    UserResponse register(RegisterRequest request);

    UserResponse getCurrentUser(long userId);

    UserResponse updateCurrentUser(long userId, UpdateUserRequest request);

    void changePassword(long userId, ChangePasswordRequest request);
}
