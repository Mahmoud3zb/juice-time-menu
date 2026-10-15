# Juice Time REST API Documentation

A comprehensive guide for frontend developers integrating with the **Juice Time** backend API.

---

## Table of Contents
1. [General Information](#general-information)
2. [Authentication & Authorization](#authentication--authorization)
3. [Global Error & Response Formats](#global-error--response-formats)
4. [Endpoints Reference](#endpoints-reference)
   - [1. Authentication (`/api/auth`)](#1-authentication-apiauth)
   - [2. User Management (`/api/users`)](#2-user-management-apiusers)
   - [3. Products Management (`/api/products`)](#3-products-management-apiproducts)
   - [4. Expense Categories (`/api/expense-category`)](#4-expense-categories-apiexpense-category)
   - [5. Expenses (`/api/expense`)](#5-expenses-apiexpense)
   - [6. Pending / Extended Controllers](#6-pending--extended-controllers)
5. [Frontend Integration Guide (TypeScript & Axios)](#frontend-integration-guide-typescript--axios)
   - [Axios Client Setup](#axios-client-setup)
   - [TypeScript Models](#typescript-models)
   - [Code Examples](#code-examples)

---

## General Information

- **Base URL (Local Development):** `http://localhost:3000` (or the configured `PORT` in `.env`)
- **Default Headers:**
  - `Content-Type: application/json`
  - `Accept: application/json`
- **File Upload Headers:**
  - `Content-Type: multipart/form-data`
- **CORS & Credentials:**
  - When making requests from the frontend, if you rely on cookies, ensure `withCredentials: true` is configured in Axios or `credentials: "include"` in `fetch`.

---

## Authentication & Authorization

### How It Works:
1. Upon successful login (`POST /api/auth/login`), the server:
   - Sets HTTP-only cookies (`token` valid for 2 hours, `refreshToken` valid for 7 days).
   - Returns the user object.
2. For all protected routes, the frontend **must send the JWT token in the `Authorization` header**:
   ```http
   Authorization: Bearer <YOUR_JWT_TOKEN>
   ```
3. **User Roles:**
   - `"owner"`: Full system access.
   - `"admin"`: Standard administrative access.

---

## Global Error & Response Formats

### 1. Successful Responses
Most endpoints return a JSON payload with a `message` and either `data` or paginated fields:
```json
{
  "message": "Operation successful",
  "data": { ... }
}
```

### 2. Validation Errors (`400 Bad Request`)
When input validation fails (via `express-validator`):
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    },
    {
      "field": "password",
      "message": "Password is required"
    }
  ]
}
```

### 3. Authentication Errors (`401 Unauthorized`)
Returned when token is missing, expired, or invalid:
```json
{
  "message": "Unauthorized: No token provided"
}
```
or
```json
{
  "message": "Unauthorized, please login"
}
```

### 4. Forbidden Errors (`403 Forbidden`)
Returned when the authenticated user does not have sufficient role permissions:
```json
{
  "message": "Forbidden"
}
```

### 5. Server Errors (`500 Internal Server Error`)
```json
{
  "message": "Internal Server Error"
}
```

---

## Endpoints Reference

### 1. Authentication (`/api/auth`)

#### 1.1 Login User
Authenticate an existing admin/owner and receive session cookies.

- **Method:** `POST`
- **URL:** `/api/auth/login`
- **Auth Required:** No
- **Request Headers:** `Content-Type: application/json`
- **Request Body:**
  | Field | Type | Required | Description |
  | :--- | :--- | :--- | :--- |
  | `email` | `string` | **Yes** | Valid registered email address. |
  | `password` | `string` | **Yes** | Account password. |

  ```json
  {
    "email": "admin@juicetime.com",
    "password": "secretPassword123"
  }
  ```

- **Responses:**
  - `200 OK`:
    ```json
    {
      "message": "Logged in successfully",
      "user": {
        "_id": "670cb1e2fa31980012345678",
        "name": "Mahmoud",
        "email": "admin@juicetime.com",
        "role": "admin",
        "createdAt": "2026-10-15T10:00:00.000Z",
        "updatedAt": "2026-10-15T10:00:00.000Z"
      }
    }
    ```
    *Note: Server also sets `token` (2h) and `refreshToken` (7d) cookies.*
  - `401 Unauthorized`:
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

#### 1.2 Logout User
Clear the authentication session cookies.

- **Method:** `DELETE`
- **URL:** `/api/auth/logout`
- **Auth Required:** No
- **Responses:**
  - `200 OK`:
    ```json
    {
      "message": "Logged out successfully"
    }
    ```

---

### 2. User Management (`/api/users`)
*All endpoints in this group require authentication via `Authorization: Bearer <token>`.*

#### 2.1 Get All Users (Paginated)
Fetch paginated list of registered users.

- **Method:** `GET`
- **URL:** `/api/users`
- **Auth Required:** Yes
- **Query Parameters:**
  | Parameter | Type | Default | Description |
  | :--- | :--- | :--- | :--- |
  | `page` | `number` | `1` | Page number (minimum: 1). |
  | `limit` | `number` | `10` | Records per page (minimum: 1). |

- **Responses:**
  - `200 OK`:
    ```json
    {
      "message": "Users found successfully",
      "page": 1,
      "limit": 10,
      "total": 3,
      "totalPage": 1,
      "data": [
        {
          "_id": "670cb1e2fa31980012345678",
          "name": "Mahmoud",
          "email": "admin@juicetime.com",
          "role": "admin",
          "createdAt": "2026-10-15T10:00:00.000Z",
          "updatedAt": "2026-10-15T10:00:00.000Z"
        }
      ]
    }
    ```

#### 2.2 Add New User
Create a new admin or owner user.

- **Method:** `POST`
- **URL:** `/api/users`
- **Auth Required:** Yes
- **Request Headers:** `Content-Type: application/json`
- **Request Body:**
  | Field | Type | Required | Description |
  | :--- | :--- | :--- | :--- |
  | `name` | `string` | **Yes** | Full name. |
  | `email` | `string` | **Yes** | Unique email address. |
  | `password` | `string` | **Yes** | User password (will be hashed). |
  | `role` | `string` | No | `"admin"` or `"owner"`. Defaults to `"admin"`. |

  ```json
  {
    "name": "Ahmed Hassan",
    "email": "ahmed@juicetime.com",
    "password": "Password123!",
    "role": "admin"
  }
  ```

- **Responses:**
  - `200 OK`:
    ```json
    {
      "message": "User added successfully",
      "data": {
        "_id": "670cb2e2fa31980012345679",
        "name": "Ahmed Hassan",
        "email": "ahmed@juicetime.com",
        "role": "admin",
        "createdAt": "2026-10-15T11:00:00.000Z",
        "updatedAt": "2026-10-15T11:00:00.000Z"
      }
    }
    ```
  - `400 Bad Request`: Validation failed or email already exists.

#### 2.3 Delete User
Delete a user by ID.

- **Method:** `DELETE`
- **URL:** `/api/users/:id`
- **Auth Required:** Yes
- **URL Parameters:**
  | Parameter | Type | Required | Description |
  | :--- | :--- | :--- | :--- |
  | `id` | `string` | **Yes** | Valid 24-character MongoDB ObjectId. |

- **Responses:**
  - `200 OK`:
    ```json
    {
      "message": "User deleted successfully"
    }
    ```
  - `400 Bad Request`: Invalid ObjectId or User not found.

---

### 3. Products Management (`/api/products`)
*All endpoints in this group currently require authentication (`Authorization: Bearer <token>`).*

#### 3.1 Get All Products (Paginated)
Retrieve a paginated list of menu items.

- **Method:** `GET`
- **URL:** `/api/products`
- **Auth Required:** Yes
- **Query Parameters:**
  | Parameter | Type | Default | Description |
  | :--- | :--- | :--- | :--- |
  | `page` | `number` | `1` | Page number. |
  | `limit` | `number` | `10` | Products per page. |

- **Responses:**
  - `200 OK`:
    ```json
    {
      "message": "Products fetched successfully",
      "total": 50,
      "page": 1,
      "limit": 10,
      "totalPage": 5,
      "data": [
        {
          "_id": "670cb501fa31980012345680",
          "name": "مانجو",
          "prices": {
            "cup": 50,
            "liter": 100
          },
          "description": "عصير مانجو طبيعي فريش 100% غني بالطعم الاستوائي المنعش",
          "imageurl": "https://res.cloudinary.com/demo/image/upload/v1234/Juice-Time/mango.jpg",
          "type": "fresh-juices",
          "createdAt": "2026-10-15T12:00:00.000Z",
          "updatedAt": "2026-10-15T12:00:00.000Z"
        }
      ]
    }
    ```

#### 3.2 Add Product (with Image Upload)
Create a new menu item and upload its image to Cloudinary.

- **Method:** `POST`
- **URL:** `/api/products`
- **Auth Required:** Yes
- **Request Headers:** `Content-Type: multipart/form-data`
- **Form-Data Fields:**
  | Field | Type | Required | Description |
  | :--- | :--- | :--- | :--- |
  | `name` | `string` | **Yes** | Product name in Arabic/English. |
  | `prices[cup]` | `number` | **Yes** | Cup price (numeric string or number). |
  | `prices[liter]`| `number` | No | Liter price (optional for single-sized items). |
  | `type` | `string` | **Yes** | Category slug (e.g. `"fresh-juices"`, `"milkshake"`, `"waffles"`). |
  | `description` | `string` | No | Product description. |
  | `image` | `File` | No | Image file (`.jpg`, `.jpeg`, `.png`, `.webp`, max 5MB). |

- **Responses:**
  - `200 OK`:
    ```json
    {
      "message": "Product added successfully",
      "data": {
        "_id": "670cb501fa31980012345680",
        "name": "فراولة",
        "prices": {
          "cup": 50,
          "liter": 100
        },
        "description": "عصير فراولة طبيعي فريش",
        "imageurl": "https://res.cloudinary.com/...",
        "type": "fresh-juices",
        "createdAt": "2026-10-15T12:00:00.000Z",
        "updatedAt": "2026-10-15T12:00:00.000Z"
      }
    }
    ```
  - `400 Bad Request`: Validation failed.

#### 3.3 Update Product
Update an existing product by ID.

- **Method:** `PUT`
- **URL:** `/api/products/:id`
- **Auth Required:** Yes
- **Request Headers:** `Content-Type: application/json`
- **URL Parameters:**
  | Parameter | Type | Required | Description |
  | :--- | :--- | :--- | :--- |
  | `id` | `string` | **Yes** | Product MongoDB ObjectId. |
- **Request Body (all fields optional):**
  ```json
  {
    "name": "مانجو استوائي",
    "prices": {
      "cup": 55,
      "liter": 110
    },
    "description": "مانجو طبيعي فريش ومثلج",
    "imageurl": "https://res.cloudinary.com/...",
    "type": "fresh-juices"
  }
  ```
- **Responses:**
  - `200 OK`:
    ```json
    {
      "message": "Product updated successfully",
      "data": {
        "_id": "670cb501fa31980012345680",
        "name": "مانجو استوائي",
        "prices": {
          "cup": 55,
          "liter": 110
        },
        "description": "مانجو طبيعي فريش ومثلج",
        "imageurl": "https://res.cloudinary.com/...",
        "type": "fresh-juices",
        "createdAt": "2026-10-15T12:00:00.000Z",
        "updatedAt": "2026-10-15T12:30:00.000Z"
      }
    }
    ```
  - `400 Bad Request`: Invalid ObjectId or validation errors.
  - `404 Not Found`: Product not found.

---

### 4. Expense Categories (`/api/expense-category`)

#### 4.1 Get All Active Categories
Retrieve all active expense categories for expense tracking forms/dropdowns.

- **Method:** `GET`
- **URL:** `/api/expense-category`
- **Auth Required:** No
- **Responses:**
  - `200 OK`:
    ```json
    {
      "message": "Expense categories fetched successfully",
      "data": [
        {
          "_id": "670cb701fa31980012345685",
          "name": "فواكه ومستلزمات العصير",
          "isActive": true,
          "createdAt": "2026-10-15T09:00:00.000Z",
          "updatedAt": "2026-10-15T09:00:00.000Z"
        },
        {
          "_id": "670cb701fa31980012345686",
          "name": "ألبان وآيس كريم",
          "isActive": true,
          "createdAt": "2026-10-15T09:05:00.000Z",
          "updatedAt": "2026-10-15T09:05:00.000Z"
        }
      ]
    }
    ```

#### 4.2 Get Category by ID
Retrieve details of a single category.

- **Method:** `GET`
- **URL:** `/api/expense-category/:id`
- **Auth Required:** No
- **URL Parameters:**
  | Parameter | Type | Required | Description |
  | :--- | :--- | :--- | :--- |
  | `id` | `string` | **Yes** | Category MongoDB ObjectId. |
- **Responses:**
  - `200 OK`:
    ```json
    {
      "message": "Expense category found successfully",
      "data": {
        "_id": "670cb701fa31980012345685",
        "name": "فواكه ومستلزمات العصير",
        "isActive": true,
        "createdAt": "2026-10-15T09:00:00.000Z",
        "updatedAt": "2026-10-15T09:00:00.000Z"
      }
    }
    ```
  - `400 Bad Request`: Invalid ObjectId.
  - `404 Not Found`: Category not found or inactive.

#### 4.3 Add Expense Category
Create a new category for expenses.

- **Method:** `POST`
- **URL:** `/api/expense-category`
- **Auth Required:** No
- **Request Headers:** `Content-Type: application/json`
- **Request Body:**
  | Field | Type | Required | Description |
  | :--- | :--- | :--- | :--- |
  | `name` | `string` | **Yes** | Category name (min length: 3 characters, unique). |
  | `isActive` | `boolean`| No | Active flag (default: `true`). |

  ```json
  {
    "name": "فواتير كهرباء ومياه",
    "isActive": true
  }
  ```

- **Responses:**
  - `201 Created`:
    ```json
    {
      "message": "Expense category added successfully",
      "data": {
        "_id": "670cb701fa31980012345687",
        "name": "فواتير كهرباء ومياه",
        "isActive": true,
        "createdAt": "2026-10-15T13:00:00.000Z",
        "updatedAt": "2026-10-15T13:00:00.000Z"
      }
    }
    ```
  - `400 Bad Request`: Validation failure (name < 3 characters or already exists).

---

### 5. Expenses (`/api/expense`)

#### 5.1 Add New Expense
Record a new branch or operational expense.

- **Method:** `POST`
- **URL:** `/api/expense`
- **Auth Required:** No
- **Request Headers:** `Content-Type: application/json`
- **Request Body:**
  | Field | Type | Required | Description |
  | :--- | :--- | :--- | :--- |
  | `expenseCategoryID` | `string` | **Yes** | Valid MongoDB ObjectId of an active expense category. |
  | `amount` | `number` | **Yes** | Positive number greater than 0 (`min: 0.1`). |
  | `expenseDate` | `string` | **Yes** | Date of expense in `YYYY-MM-DD` or ISO string. |
  | `description` | `string` | No | Notes or explanation of the expense. |

  ```json
  {
    "expenseCategoryID": "670cb701fa31980012345685",
    "amount": 750.5,
    "expenseDate": "2026-10-15",
    "description": "شراء كراتين مانجو وفراولة للفرع"
  }
  ```

- **Responses:**
  - `201 Created`:
    ```json
    {
      "message": "Expense added successfully",
      "data": {
        "_id": "670cb901fa31980012345690",
        "expenseCategoryID": "670cb701fa31980012345685",
        "amount": 750.5,
        "expenseDate": "2026-10-15T00:00:00.000Z",
        "description": "شراء كراتين مانجو وفراولة للفرع",
        "createdAt": "2026-10-15T13:30:00.000Z",
        "updatedAt": "2026-10-15T13:30:00.000Z"
      }
    }
    ```
  - `400 Bad Request`: Category not found/inactive or invalid fields.

#### 5.2 Get Expenses (Filterable & Paginated)
Query expenses with advanced date filtering, category filtering, and pagination.

- **Method:** `GET`
- **URL:** `/api/expense`
- **Auth Required:** No
- **Query Parameters:**
  | Parameter | Type | Required | Description |
  | :--- | :--- | :--- | :--- |
  | `page` | `number` | No | Page number (default: `1`). |
  | `limit` | `number` | No | Records per page (default: `10`, max: `100`). |
  | `date` | `string` | No | Exact single day filter in `YYYY-MM-DD` format (e.g., `2026-10-15`). |
  | `from` | `string` | No | Range start date in `YYYY-MM-DD` format. |
  | `to` | `string` | No | Range end date in `YYYY-MM-DD` format (inclusive). |
  | `categoryID` | `string` | No | Filter by category ObjectId. |

> **Date Filter Logic:**
> - If `date` is provided, it filters expenses occurring on that specific calendar day.
> - If `from` or `to` is provided, it filters within that date range. `from` must be before or equal to `to`.

- **Example Query:**
  `GET /api/expense?from=2026-10-01&to=2026-10-15&categoryID=670cb701fa31980012345685&page=1&limit=20`

- **Responses:**
  - `200 OK`:
    ```json
    {
      "message": "Expenses retrieved successfully",
      "total": 35,
      "page": 1,
      "limit": 20,
      "totalPages": 2,
      "data": [
        {
          "_id": "670cb901fa31980012345690",
          "expenseCategoryID": {
            "_id": "670cb701fa31980012345685",
            "name": "فواكه ومستلزمات العصير"
          },
          "amount": 750.5,
          "expenseDate": "2026-10-15T00:00:00.000Z",
          "description": "شراء كراتين مانجو وفراولة للفرع",
          "createdAt": "2026-10-15T13:30:00.000Z",
          "updatedAt": "2026-10-15T13:30:00.000Z"
        }
      ]
    }
    ```
  - `400 Bad Request`: Invalid date format or category ID.

---

### 6. Pending / Extended Controllers
The backend codebase contains the following controllers already written in the controller files. Once registered in the Express routers, frontend developers can immediately call them as specified below:

#### 6.1 Update Category (`src/expense-category/expense-category-controllers.ts/update-category.ts`)
- **Method:** `PUT /api/expense-category/:id`
- **Request Body:**
  ```json
  {
    "name": "اسم جديد للقسم",
    "isActive": false
  }
  ```
- **Response:** `200 OK` with updated category document.

#### 6.2 Get Expense By ID (`src/expense/expense-controllers/get-expense-by-id.ts`)
- **Method:** `GET /api/expense/:id`
- **Response:** `200 OK` with populated `expenseCategoryID`.

#### 6.3 Update Expense (`src/expense/expense-controllers/update-expense.ts`)
- **Method:** `PUT /api/expense/:id`
- **Request Body:**
  ```json
  {
    "amount": 800,
    "description": "تعديل في سعر الشراء"
  }
  ```
- **Response:** `200 OK` with updated expense document.

#### 6.4 Delete Expense (`src/expense/expense-controllers/delete-expense.ts`)
- **Method:** `DELETE /api/expense/:id`
- **Response:** `200 OK` with deleted expense document.

#### 6.5 Daily Expense Report (`src/expense/expense-controllers/reports/get-daily-report.ts`)
- **Method:** `GET /api/expense/reports/daily?date=YYYY-MM-DD`
- **Query:** `date` (optional, defaults to current date `YYYY-MM-DD`).
- **Response:**
  ```json
  {
    "message": "Daily report retrieved successfully",
    "data": {
      "date": "2026-10-15",
      "totalExpenses": 1850.5,
      "expensesCount": 6,
      "categories": [
        {
          "categoryID": "670cb701fa31980012345685",
          "categoryName": "فواكه ومستلزمات العصير",
          "totalAmount": 1200,
          "expensesCount": 3
        }
      ],
      "expenses": [ ... ]
    }
  }
  ```

#### 6.6 Monthly Expense Report (`src/expense/expense-controllers/reports/get-monthly-report.ts`)
- **Method:** `GET /api/expense/reports/monthly?month=10&year=2026`
- **Query:** `month` (1-12, optional), `year` (e.g. 2026, optional).
- **Response:**
  ```json
  {
    "message": "Monthly report retrieved successfully",
    "data": {
      "month": 10,
      "year": 2026,
      "totalExpenses": 45000,
      "expensesCount": 120,
      "dailyTotals": [
        {
          "date": "2026-10-01",
          "totalAmount": 1500,
          "expensesCount": 4
        }
      ],
      "categories": [
        {
          "categoryID": "670cb701fa31980012345685",
          "categoryName": "فواكه ومستلزمات العصير",
          "totalAmount": 28000,
          "expensesCount": 65
        }
      ]
    }
  }
  ```

---

## Frontend Integration Guide (TypeScript & Axios)

Here is a recommended integration pattern for the frontend team.

### Axios Client Setup

```typescript
// src/api/client.ts
import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Needed for HttpOnly session cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach Bearer Token from localStorage or memory
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Global 401 handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Session expired or unauthorized. Redirecting to login...");
      // localStorage.removeItem("auth_token");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```

---

### TypeScript Models

```typescript
// src/types/api.ts

export type UserRole = "owner" | "admin";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface ProductPrice {
  cup: number;
  liter?: number;
}

export interface Product {
  _id: string;
  name: string;
  prices: ProductPrice;
  type: string;
  description?: string;
  imageurl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseCategory {
  _id: string;
  name: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Expense {
  _id: string;
  expenseCategoryID: string | ExpenseCategory;
  amount: number;
  expenseDate: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedResponse<T> {
  message: string;
  total: number;
  page: number;
  limit: number;
  totalPage?: number;
  totalPages?: number;
  data: T[];
}

export interface ValidationErrorResponse {
  success: false;
  message: string;
  errors: Array<{
    field: string;
    message: string;
  }>;
}
```

---

### Code Examples

#### 1. Login & Store Session
```typescript
import { apiClient } from "./client";
import { User } from "./types/api";

export async function loginUser(email: string, password: string): Promise<User> {
  const response = await apiClient.post<{ message: string; user: User }>("/api/auth/login", {
    email,
    password,
  });

  return response.data.user;
}
```

#### 2. Fetch Products with Pagination
```typescript
import { apiClient } from "./client";
import { PaginatedResponse, Product } from "./types/api";

export async function getProducts(page = 1, limit = 10): Promise<PaginatedResponse<Product>> {
  const response = await apiClient.get<PaginatedResponse<Product>>("/api/products", {
    params: { page, limit },
  });
  return response.data;
}
```

#### 3. Add Product with Image File (Multipart)
```typescript
import { apiClient } from "./client";
import { Product } from "./types/api";

export async function addProduct(payload: {
  name: string;
  cupPrice: number;
  literPrice?: number;
  type: string;
  description?: string;
  imageFile?: File;
}): Promise<Product> {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("prices[cup]", payload.cupPrice.toString());
  if (payload.literPrice) {
    formData.append("prices[liter]", payload.literPrice.toString());
  }
  formData.append("type", payload.type);
  if (payload.description) {
    formData.append("description", payload.description);
  }
  if (payload.imageFile) {
    formData.append("image", payload.imageFile);
  }

  const response = await apiClient.post<{ message: string; data: Product }>(
    "/api/products",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.data;
}
```

#### 4. Add & Filter Expenses
```typescript
import { apiClient } from "./client";
import { Expense, PaginatedResponse } from "./types/api";

// Create expense
export async function createExpense(data: {
  expenseCategoryID: string;
  amount: number;
  expenseDate: string; // e.g. "2026-10-15"
  description?: string;
}): Promise<Expense> {
  const res = await apiClient.post<{ message: string; data: Expense }>("/api/expense", data);
  return res.data.data;
}

// Filter expenses by date range
export async function getExpensesByDateRange(
  from: string, // "YYYY-MM-DD"
  to: string,   // "YYYY-MM-DD"
  page = 1,
  limit = 20
): Promise<PaginatedResponse<Expense>> {
  const res = await apiClient.get<PaginatedResponse<Expense>>("/api/expense", {
    params: { from, to, page, limit },
  });
  return res.data;
}
```

