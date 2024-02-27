# Blogging Platform

A simple blogging platform with user registration, login, authentication, authorization, and REST API functionality.

## Table of Contents
1. [User Registration](#user-registration)
2. [User Login](#user-login)
3. [Authentication Middleware](#authentication-middleware)
4. [Authorization](#authorization)
5. [Admin Credentials](#admin-credentials)
6. [Installation](#installation)
7. [REST API](#rest-api)
8. [Language Switch](#language-switch)


## User Registration
- Create a registration page where users can sign up with a unique username, password, and additional required information.
- Hash user passwords using bcrypt before storing them in the database.
- Ensure username uniqueness to prevent conflicts.

## User Login
- Implement a login page where users can input their username and password.
- Retrieve hashed passwords from the database based on the provided username.
- Use bcrypt to compare stored hashed passwords with user input during login.
- If passwords match, authenticate the user and redirect to the main page.

## Authentication Middleware
- Implement middleware to protect routes requiring authentication.
- Verify user authentication by checking for a session token or other authentication mechanisms.
- Redirect unauthenticated users to the login page.

## Authorization
- Define user roles or permissions, such as 'admin' or 'regular user'.
- Store user roles in the database.
- Implement authorization checks on routes requiring specific permissions.
- For example, restrict access to administrative actions to users with the 'admin' role.

## Admin Credentials
- Admin username: master@mail.ru
- Admin password: 1

## Installation
1. Clone the repository.
   ```bash
   git clone https://github.com/9ani/AITU-blog.git
   cd AITU-blog
   ```

2. **Install Dependencies:**
  ```bash
  npm install
  ```
3. **Run the Application:**
    ```bash
    npm start
    ```
## REST API

Implement functionality within the admin page to add, edit, and delete items related to your topic on the main page. Each item should include three pictures, two names for localization, two descriptions for localization, and timestamps for creation, update, and deletion. Display items on the main page in well-designed blocks, featuring a carousel with three pictures, the name, and description of each item.

## Language Switch
<<<<<<< HEAD
A language switch functionality is available. Users can change their preferred language for a personalized experience.
=======
A language switch functionality is available. Users can change their preferred language for a personalized experience.
>>>>>>> c7693b6b410ca192abf97fafa88a05fee1aaa285
