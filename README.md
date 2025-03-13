# Hotel Project Frontend

## Overview

This repository contains the frontend part of the Hotel Project, developed using Angular. The frontend application interacts with two backend services: [`app Hotel`](https://github.com/GNicoDev/app-hotel-backend) and [`app users`](https://github.com/GNicoDev/api_users). The `app Hotel` service handles the management of rooms and clients, while the `app users` service manages the types of users who will use the application, making distinctions between ADMIN and USER roles. This structure allows users to view and book hotel rooms, manage their profiles, and provides administrators with tools to manage room availability, client data, and user 

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Project Structure](#project-structure)
4. [Key Features](#key-features)
5. [Contact](#contact)

## Installation

To get started with the project, follow these steps:

1. **Clone the repository:**

   ```bash
     git clone https://github.com/GNicoDev/app-hotel-frontend.git

2. **Navigate to the project directory:**
   
   ```bash
      cd hotel-project-frontend

3. **Install the dependencies:**

   ```bash
    npm install

## Usage

To run the project locally:

1. **Start the development server:**

     ```bash
    ng serve

2. Open your browser and navigate to http://localhost:4200.

## Project Structure

The project follows a modular structure and uses standalone components to keep the code organized and manageable.

     hotel-project-frontend/
      ├── src/
      │   ├── app/
      │   │   ├── components/       # Reusable standalone components
      │   │   ├── modells/          # Data models
      │   │   ├── services/         # Angular services
      │   │   ├── app.config.ts
      │   │   ├── app.routes.ts
      │   ├── assets/               # Static assets
      │   ├── index.html
      │   ├── main.ts
      │   ├── styles.css
      ├── angular.json              # Angular configuration
      ├── package.json              # Project dependencies
      └── README.md                 # Project README file

## Key Features

- **User Profile Management:** Users can view and edit their profiles, including username, email, and password.

- **Room Booking:** Users can browse available rooms and make reservations with existing clients in the database.

- **Client Management:** Users can perform operations to create and update clients.

- **Role-Based Access:** Different features are accessible based on user roles:

  - **ADMIN:** Has full access and control over the application. Manages rooms and clients in app Hotel and users of the application in app users, performing CRUD (create, read, update, and delete) operations on everything.

  - **USER:** Has access to create and update clients, and read-only access to available rooms for making reservations. They can also modify their user profile, including username, email, and password.

## Contact

For any questions or feedback, please contact gnicolasalvarezfl@gmail.com.


This README now clearly explains how the frontend interacts with the `app Hotel` and `app users` APIs. You can copy and paste this content directly into your README file. If you need further adjustments or have any other questions, I'm here to help! 😊🚀
