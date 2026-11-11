# Product Management Dashboard

A full-stack product management dashboard built with React, Kotlin, Spring Boot, and PostgreSQL.

The application provides product management, inventory availability tracking, search functionality, dashboard statistics, and price analytics.

## Features

### Dashboard
- Overview of product statistics.
- Total products and availability information.
- Product summary table.

### Product Management
- Create products.
- Edit existing products.
- Delete products.
- Search products.
- Track product availability.

### Analytics
- Product price visualization.
- Price highlights and statistics.

### Settings
- Dark mode support.
- Responsive user interface.

## Tech Stack

**Frontend**
- React.js
- JavaScript
- CSS
- HTTP Proxy Middleware

**Backend**
- Kotlin
- Spring Boot
- Spring Data JPA
- Spring Security
- Hibernate

**Database**
- PostgreSQL

## Project Structure

The frontend source code is available in this repository. The backend is distributed separately through GitHub Releases.

```text
Product-Management-Dashboard/
│
├── src/
├── public/
├── package.json
├── .gitignore
├── .env.example
└── README.md
```

## Requirements

Install the following before running the application:

- Node.js and npm.
- Java 17 or later.
- PostgreSQL.
- A web browser.

## Getting Started

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd Product-Management-Dashboard
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Configure Frontend Authentication

Create a `.env.local` file in the frontend root directory:

```env
REACT_APP_API_USERNAME=admin
REACT_APP_API_PASSWORD=YOUR_API_PASSWORD
```

These credentials must match the backend's Spring Security configuration.

**Important:**
- Do not commit `.env.local` to GitHub.
- The frontend proxy uses these variables to authenticate API requests.
- Restart the React development server after changing environment variables.

### 4. Start the Frontend

```bash
npm start
```

The frontend will be available at:

http://localhost:3000

## Backend Setup

The backend is distributed as a prebuilt JAR file through GitHub Releases.

### 1. Download the Backend

1. Open the repository's Releases section.
2. Download the latest release.
3. Extract the downloaded files into a folder.

The release contains:

```text
backend-release/
├── backend.jar
├── run-backend.bat
└── database-schema.sql
```

### 2. Configure PostgreSQL

Create a PostgreSQL database named:

```sql
CREATE DATABASE "Product";
```

Import the provided `database-schema.sql` file using pgAdmin:

1. Open the `Product` database.
2. Open the Query Tool.
3. Load `database-schema.sql`.
4. Execute the SQL script.

Alternatively, use:

```bash
psql -U postgres -d Product -f database-schema.sql
```

Use your own PostgreSQL username and password.

### 3. Configure the Backend Launcher

Open `run-backend.bat` using a text editor.

Update the database configuration:

```bat
set "DB_NAME=Product"
set "DB_USERNAME=postgres"
set "DB_PASSWORD=YOUR_POSTGRES_PASSWORD"
```

Update the API authentication password:

```bat
set "API_PASSWORD=YOUR_API_PASSWORD"
```

The API username in the example is `admin`. It must match the username configured in Spring Security.

Save the file.

**Security note:** Keep your actual credentials private. Do not upload a batch file containing personal passwords to a public release.

### 4. Start the Backend

Double-click:

```text
run-backend.bat
```

The backend will start on:

http://localhost:8080

Keep the terminal window open while using the application.

## How Frontend and Backend Communicate

During local development, the React development server uses `http-proxy-middleware` to forward requests to the Spring Boot API.

```text
React Frontend
localhost:3000
       |
       |  /product
       v
React Development Proxy
       |
       |  HTTP Basic Authentication
       v
Spring Boot API
localhost:8080
       |
       v
PostgreSQL Database
```

The proxy forwards requests to the backend and adds the configured authentication credentials.

## Important Notes

- PostgreSQL must be installed and running locally.
- The backend JAR does not contain the PostgreSQL database.
- Java 17 or later must be available through the system PATH.
- The database schema is provided separately in the GitHub Release.
- The frontend proxy configuration is intended for local development.
- A production deployment requires appropriate API routing and authentication configuration.
- Never publish real database or API credentials.

## Author

