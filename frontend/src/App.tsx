import { Navigate, Route, Routes } from "react-router-dom";
import { GuestRoute } from "@/routes/GuestRoute";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { AdminRoute } from "@/routes/AdminRoute";
import { StorefrontLayout } from "@/components/layout/StorefrontLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";

import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";

import { BooksBrowsePage } from "@/pages/storefront/BooksBrowsePage";
import { BookPurchasePage } from "@/pages/storefront/BookPurchasePage";
import { PurchaseSuccessPage } from "@/pages/storefront/PurchaseSuccessPage";
import { TransactionsPage } from "@/pages/storefront/TransactionsPage";
import { CategoryDetailsPage } from "@/pages/storefront/CategoryDetailsPage";
import { PublisherDetailsPage } from "@/pages/storefront/PublisherDetailsPage";

import { ProfilePage } from "@/pages/account/ProfilePage";
import { EditProfilePage } from "@/pages/account/EditProfilePage";
import { ChangePasswordPage } from "@/pages/account/ChangePasswordPage";

import { DashboardPage } from "@/pages/admin/DashboardPage";
import { BooksListPage } from "@/pages/admin/books/BooksListPage";
import { BookFormPage } from "@/pages/admin/books/BookFormPage";
import { AuthorsListPage } from "@/pages/admin/authors/AuthorsListPage";
import { AuthorFormPage } from "@/pages/admin/authors/AuthorFormPage";
import { CategoriesListPage } from "@/pages/admin/categories/CategoriesListPage";
import { CategoryFormPage } from "@/pages/admin/categories/CategoryFormPage";
import { PublishersListPage } from "@/pages/admin/publishers/PublishersListPage";
import { PublisherFormPage } from "@/pages/admin/publishers/PublisherFormPage";

function App() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<StorefrontLayout />}>
          <Route path="/" element={<BooksBrowsePage />} />
          <Route path="/books/:id" element={<BookPurchasePage />} />
          <Route path="/purchase-success" element={<PurchaseSuccessPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/categories/:id" element={<CategoryDetailsPage />} />
          <Route path="/publishers/:id" element={<PublisherDetailsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route path="/profile/change-password" element={<ChangePasswordPage />} />
        </Route>
      </Route>

      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<DashboardPage />} />
          <Route path="/admin/books" element={<BooksListPage />} />
          <Route path="/admin/books/new" element={<BookFormPage />} />
          <Route path="/admin/books/:id/edit" element={<BookFormPage />} />
          <Route path="/admin/authors" element={<AuthorsListPage />} />
          <Route path="/admin/authors/new" element={<AuthorFormPage />} />
          <Route path="/admin/authors/:id/edit" element={<AuthorFormPage />} />
          <Route path="/admin/categories" element={<CategoriesListPage />} />
          <Route path="/admin/categories/new" element={<CategoryFormPage />} />
          <Route path="/admin/categories/:id/edit" element={<CategoryFormPage />} />
          <Route path="/admin/publishers" element={<PublishersListPage />} />
          <Route path="/admin/publishers/new" element={<PublisherFormPage />} />
          <Route path="/admin/publishers/:id/edit" element={<PublisherFormPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
