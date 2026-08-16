# Around de U.S.

Around the U.S. is a full-stack web application developed as part of the TripleTen Web Development Program. The project focuses on building a complete web application by integrating a React frontend with a Node.js, Express, and MongoDB backend.

The application allows users to register, log in, edit their profiles, and interact with cards by adding, removing, and liking content.

## Live Demo

Visit the live demo here: **[Around the U.S.](https://web-project-api-full-seven-rho.vercel.app/)**

## Technologies:

### Frontend

- React
- Vite
- React Router
- JavaScript
- HTML5
- CSS3
- Flexbox
- CSS Grid
- Responsive Design
- Protected Routes
- LocalStorage
- REST API Integration

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- REST API
- CRUD operations for users and cards
- Validator
- Celebrate / Joi
- Modular architecture with controllers, models, and routes

### Authentication & Security

- User registration through /signup
- User login through /signin
- Password hashing with bcrypt
- JWT-based authentication
- Authorization middleware
- Unique email validation
- Protected routes
- Access control for application resources

### Business Rules

The application follows business rules to ensure proper data management:

- Users can only edit their own profile information
- Users can only delete their own cards
- Users can like and unlike cards
- User emails must be unique

### Deployment & Infrastructure

- Cloud server
- Nginx
- PM2 for process management and automatic restarts
- HTTPS / SSL
- CORS
- Environment variables

### Error Handling

- 400 — Bad Request
- 401 — Unauthorized
- 403 — Forbidden
- 404 — Not Found
- 500 — Internal Server Error

## Project Purpose

This project was created to practice:

- Full-stack web development
- Building REST APIs
- Frontend and backend integration
- Authentication and authorization
- Database management with MongoDB
- React application development
- Complete CRUD functionality
- Data validation and error handling
- Deploying web applications to a production environment

## Author

Developed by Bianca Baccin as part of the TripleTen Web Development Program.
