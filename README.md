
# Books Management and User Authentication API

This project is an Express.js-based with type script API for managing books and user authentication. It provides functionality for creating, updating, retrieving, and deleting books, as well as user registration and login.

## Features

- User authentication with secure password hashing (bcrypt) and JWT-based token generation.
- Books management with support for file uploads (images and PDFs) using Multer.
- Middleware-based architecture with global error handling.
- APIs for user registration, login, and book CRUD operations.

## Technologies Used

- **Express.js**: Backend framework.
- **TpeScript**: for better code handling and errors
- **Multer**: Middleware for handling file uploads.
- **bcrypt**: Password hashing.
- **jsonwebtoken**: Token-based authentication.
- **mongoose**: MongoDB object modeling for Node.js.

## API Endpoints

### Books Endpoints
- `POST /api/books/create`: Create a new book with `coverImage` and `file` upload support.
- `PATCH /api/books/update/:id`: Update an existing book by ID.
- `GET /api/books/`: Retrieve all books.
- `GET /api/books/:id`: Retrieve a book by ID.
- `DELETE /api/books/:id`: Delete a book by ID.

### User Endpoints
- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Log in as an existing user.

## Multer Configuration

- Stores uploaded files in `public/data/uploads`.
- Validates `coverImage` to accept only PNG, JPEG, and JPG files.
- Validates `file` to accept only PDF files.
- File size limit: 30 MB.

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd <project-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in a `.env` file:
   ```env
   PORT=8080
   JSON_SEC=your-secret-key
   MONGO_URI=your-mongo-db-uri
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Access the API at `http://localhost:8080`.

## Example API Requests

- `GET http://localhost:8080/api/books/6780f3dd335cc82c3ff2d44d`
- `GET http://localhost:8080/api/books/`
- `PATCH http://localhost:8080/api/books/update/780f3dd335cc82c3ff2d44d6`
- `POST http://localhost:8080/api/books/create`
- `POST http://localhost:8080/api/users/register`
- `POST http://localhost:8080/api/users/login`

## Project Structure

```
project-folder
├── controllers/
│   ├── books.controller.js
│   └── user.controller.js
├── middleware/
│   ├── authenticate.js
│   └── globalErrorHandler.js
├── models/
│   ├── book.model.js
│   └── user.model.js
├── routes/
│   ├── books.routes.js
│   └── user.routes.js
├── public/data/uploads/
├── app.js
├── server.js
└── README.md
```

## License

This project is licensed under the MIT License.
