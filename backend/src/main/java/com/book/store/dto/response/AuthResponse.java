package com.book.store.dto.response;

import com.book.store.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthResponse {
    private String token;
    private long userId;
    private String userName;
    private String fullName;
    private Role role;
}
