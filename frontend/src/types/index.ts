export type Role = "ADMIN" | "USER";

export interface PagedResponse<T> {
  content: T[];
  pageNo: number;
  totalPages: number;
  totalElements: number;
}

export interface AuthResponse {
  token: string;
  userId: number;
  userName: string;
  fullName: string;
  role: Role;
}

export interface UserResponse {
  id: number;
  userName: string;
  fullName: string;
  email: string;
  mobileNo: string | null;
  address: string | null;
  role: Role;
}

export interface BookAuthor {
  id: number;
  name: string;
  age: number;
  email: string;
}

export interface BookCategory {
  id: number;
  name: string;
  description: string | null;
  validFlag: string;
  createdBy: string | null;
  createdAt: string | null;
}

export interface BookPublisher {
  id: number;
  name: string;
  email: string;
  address: string | null;
  phone: string | null;
  validFlag: string;
  createdBy: string | null;
  createdAt: string | null;
}

export interface Book {
  id: number;
  title: string;
  description: string | null;
  authorIds: string[];
  authorNames: string[];
  copies: number;
  price: number;
  categoryId: number;
  categoryName: string;
  publisherId: number;
  publisherName: string;
}

export interface UserTransaction {
  id: number;
  orderId: string;
  bookId: number;
  bookTitle: string;
  quantity: number;
  price: number;
  createdAt: string;
}

export interface DashboardStats {
  categoriesCount: number;
  publishersCount: number;
  authorsCount: number;
  booksCount: number;
}

export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  fieldErrors?: Record<string, string>;
}
