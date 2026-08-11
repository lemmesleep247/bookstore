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
public class UserResponse {
    private long id;
    private String userName;
    private String fullName;
    private String email;
    private String mobileNo;
    private String address;
    private Role role;
}
