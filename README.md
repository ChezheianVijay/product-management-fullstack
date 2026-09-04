# Product Management System Made with ❤️‍🔥 by Loki 🚀

A full-stack Product Management application built using **React JS** and **Spring Boot**.

This project allows users to manage products with basic CRUD operations and role-based access.

---

## 🛠️ Tech Stack

### Frontend

* React JS
* JavaScript
* Bootstrap
* Axios
* React Router DOM

### Backend

* Java
* Spring Boot
* Spring Data JPA
* Spring Security
* REST API
* MySQL

### Tools

* VS Code
* IntelliJ IDEA
* Postman
* MySQL

---

## ✨ Features

### Authentication

* Basic Authentication
* Login validation
* Logout functionality
* Spring Security for API authorization

### Product Management

* View all products
* Add a new product
* Edit existing products
* Delete products
* Form validation
* Product list refresh after Add, Update, and Delete operations

### Role-Based Access

* Admin users can:

  * Add products
  * Update products
  * Delete products

* Other users can:

  * View products

---

## 🔐 Security

Spring Security is used to protect API endpoints.

* `GET` requests are publicly accessible
* `POST` requests require `ADMIN` role
* `PUT` requests require `ADMIN` role
* `DELETE` requests require `ADMIN` role

Basic Authentication is used for this project.

---

## 🔄 Frontend Concepts Used

* Functional Components
* JSX
* `useState`
* `useEffect`
* Controlled Components
* Form Validation
* Conditional Rendering
* Props
* Component Reusability
* React Router
* API Integration using Axios

---

## 🔗 Backend Concepts Used

* REST API
* Controller Layer
* Service Layer
* Repository Layer
* DTO
* Entity
* Spring Data JPA
* CRUD Operations
* Validation
* Exception Handling
* Spring Security
* CORS Configuration

---

## 📁 Project Structure

### Frontend

```text
src
│
├── components
│   └── ProductForm.js
│
├── pages
│   ├── Login.js
│   └── Products.js
│
├── services
│   └── Api.js
│
└── App.js
```

### Backend

```text
src/main/java
│
├── config
├── controller
├── dto
├── entity
├── repository
└── service
```

---

## 🔌 API Endpoints

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/products`      | Get all products  |
| GET    | `/products/{id}` | Get product by ID |
| POST   | `/products`      | Create product    |
| PUT    | `/products/{id}` | Update product    |
| DELETE | `/products/{id}` | Delete product    |

---

## 🔄 Application Flow

```text
React Frontend
      ↓
Axios API Calls
      ↓
Spring Boot REST API
      ↓
Service Layer
      ↓
Repository Layer
      ↓
MySQL Database
```

## 🚀 How to Run

### Backend

1. Clone the repository
2. Configure MySQL database in `application.properties`
3. Run the Spring Boot application

### Frontend

```bash
npm install
npm start
```

---

## 👨‍💻 Author

Made with ❤️‍🔥 by **Loki**

---

## 📌 Learning Outcome

Through this project, I practiced building a complete full-stack CRUD application using React JS and Spring Boot, including API integration, authentication, security, validation, and database operations.
