# StockFlow

StockFlow is a full-stack inventory and order management system built with React, TypeScript, ASP.NET Core Web API, Entity Framework Core, and MySQL.

It provides authentication, role-based access control, inventory management, stock tracking, item issue/return workflows, and an operational dashboard.

## Features

### Authentication & Authorization

- JWT authentication
- Role-based authorization
- Protected frontend routes
- Persistent login sessions
- Admin and User roles

### Inventory Management

- Category management
- Item CRUD operations
- Stock quantity tracking
- Search and sorting
- Server-side pagination
- Low-stock monitoring

### Issue & Return Management

- Issue items to borrowers
- Return issued items
- Automatic stock quantity updates
- Active and returned transaction tracking
- Transaction history

### Dashboard

- Total inventory statistics
- Category count
- Low-stock item count
- Active transactions
- Returned transactions
- Recent transaction activity
- Low-stock alerts

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- TanStack Query
- Axios
- React Hook Form
- Zod
- Reusable components
- Responsive UI

### Backend

- ASP.NET Core Web API
- C#
- Entity Framework Core
- MySQL
- Pomelo Entity Framework Core provider
- JWT authentication
- Role-based authorization
- Service layer architecture
- DTO pattern
- RESTful APIs
- Swagger / OpenAPI

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite |
| Styling | Tailwind CSS |
| State Management | Zustand |
| Data Fetching | TanStack Query, Axios |
| Backend | ASP.NET Core Web API |
| Language | C# |
| ORM | Entity Framework Core |
| Database | MySQL |
| Authentication | JWT + ASP.NET Core Identity |
| API Documentation | Swagger / OpenAPI |
| Version Control | Git & GitHub |

## Project Structure

```text
StockFlow/
├── client/          # React + TypeScript frontend
├── server/          # ASP.NET Core Web API
├── screenshots/     # Application screenshots
├── docs/            # Project documentation
└── README.md
Main API Areas
/api/auth
/api/categories
/api/items
/api/transactions
/api/dashboard
Running the Project
Backend
cd server/StoreDesk.API
dotnet restore
dotnet run

The API runs locally on:

http://localhost:5196
Frontend
cd client
npm install
npm run dev

The frontend will be available through the Vite development server.

Database

StockFlow uses MySQL.

Create a database named:

StockFlowDb

The database connection string is stored using ASP.NET Core User Secrets rather than being committed to the repository.

Authentication

The application uses:

ASP.NET Core Identity for user management
JWT tokens for API authentication
Role-based authorization for protected operations

Administrative operations such as issuing and returning inventory require the appropriate role.

Screenshots
Dashboard

Categories

Items

Transactions

Project Status

StockFlow is being developed as a practical inventory management application with a focus on clean full-stack architecture, REST APIs, authentication, database integration, and real-world inventory workflows.