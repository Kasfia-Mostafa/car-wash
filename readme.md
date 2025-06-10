# Car Wash Booking System Project with mearn

This project is the backend implementation for a Car Wash Booking System, focused on providing an easy way to book car wash services. The system allows users to create accounts, book available slots, manage services, and maintain booking records. This README outlines the setup and usage instructions for the project.

## Technology Stack Used

- **Node.js**: JavaScript runtime for the backend.
- **Express.js**: Web framework for building the API.
- **MongoDB**: For database management system.
- **Mongoose**: MongoDB ODM for schema-based modeling.
- **TypeScript**: Used for type safety and code maintainability.
- **Zod**: For schema validation and request body validation.
- **JWT**: For secure user authentication and authorization.

## Features

- **User Management**:
  - Users can register and login.
  - Roles: Admin and User.
  - Authentication with secure password hashing and JWT-based authorization.


- **Service Management**:

  - Admins can create, update, delete (soft delete), and view services.
  - Services include name, description, price, and duration.


- **Slot Booking System**:

  - Users can view available slots and book services.
  - Slots include start and end times for specific services.
  - Slot status can be updated (available, booked, canceled).


- **Booking Management**:

  - Users can book services by selecting available slots.
  - Bookings include vehicle details such as type, brand, model, and registration plate.


- **Error Handling & Validation**:

  - Input validation is performed using Zod schemas.
  - Error handling middleware ensures clean API responses for validation errors, server issues, and more.


- **Transactional Support**:
  - If required, Mongoose transactions are used to ensure that multiple related database operations complete successfully.
