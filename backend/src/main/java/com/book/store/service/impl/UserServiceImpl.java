package com.book.store.service.impl;

import com.book.store.dto.request.ChangePasswordRequest;
import com.book.store.dto.request.LoginRequest;
import com.book.store.dto.request.RegisterRequest;
import com.book.store.dto.request.UpdateUserRequest;
import com.book.store.dto.response.AuthResponse;
import com.book.store.dto.response.UserResponse;
import com.book.store.exception.BadRequestException;
import com.book.store.exception.ResourceNotFoundException;
import com.book.store.model.Role;
import com.book.store.model.User;
import com.book.store.repository.UserRepository;
import com.book.store.security.JwtService;
import com.book.store.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Override
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUserName(), request.getPassword()));

        User user = userRepository.findByUserName(request.getUserName())
                .orElseThrow(() -> new BadCredentialsException("Invalid username or password"));

        String token = jwtService.generateToken(user.getUserName(), Map.of(
                "role", user.getRole().name(),
                "userId", user.getId(),
                "fullName", user.getFullName()
        ));

        return AuthResponse.builder()
                .token(token)
                .userId(user.getId())
                .userName(user.getUserName())
                .fullName(user.getFullName())
                .role(user.getRole())
                .build();
    }

    @Override
    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByUserName(request.getUserName())) {
            throw new BadRequestException("Username is already taken");
        }

        User user = new User();
        user.setUserName(request.getUserName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setMobileNo(request.getMobileNo());
        user.setAddress(request.getAddress());
        user.setRole(Role.USER);
        user.setValidFlag('Y');
        user.setCreatedBy(request.getUserName());
        user.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        return toResponse(userRepository.save(user));
    }

    @Override
    public UserResponse getCurrentUser(long userId) {
        return toResponse(findUserOrThrow(userId));
    }

    @Override
    public UserResponse updateCurrentUser(long userId, UpdateUserRequest request) {
        User user = findUserOrThrow(userId);
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setMobileNo(request.getMobileNo());
        user.setAddress(request.getAddress());
        user.setUpdatedBy(user.getUserName());
        user.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        return toResponse(userRepository.save(user));
    }

    @Override
    public void changePassword(long userId, ChangePasswordRequest request) {
        User user = findUserOrThrow(userId);

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new BadRequestException("Current password is incorrect");
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new BadRequestException("New passwords do not match");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setUpdatedBy(user.getUserName());
        user.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        userRepository.save(user);
    }

    private User findUserOrThrow(long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }

    private UserResponse toResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .userName(user.getUserName())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .mobileNo(user.getMobileNo())
                .address(user.getAddress())
                .role(user.getRole())
                .build();
    }
}
