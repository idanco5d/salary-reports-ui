# Salary Reports UI

A frontend application built with React, TypeScript, Material UI, and React Query.  
The application provides an intuitive interface for users to anonymously report and view salary information in the Israeli high-tech industry, with features including role management, salary filtering, and user authentication.

This project is part of a larger system - [Anonymous Salary Reports](https://github.com/Anonymous-Salary-Reports)

## 🛠️ Tech Stack
| Layer              | Technology                               |
|--------------------|------------------------------------------|
| **Runtime**        | Node.js                                  |
| **Framework**      | React + Vite                             |
| **Language**       | TypeScript                               |
| **UI Library**     | Material UI (MUI)                        |
| **State Management**| React Query (TanStack Query)            |
| **Routing**        | React Router v6                          |
| **Testing**        | Vitest + Testing Library                 |
| **HTTP Client**    | Axios                                    |
| **Code Quality**   | ESLint + Prettier                        |

## 📱 Key Features
- **Anonymous Salary Reporting** - Submit salary information without revealing identity
- **Salary Browsing** - View and filter salary reports by role and role category
- **Role & Category Management** - Create and manage job roles and categories (admin)
- **User Management** - Admin dashboard for user permissions (admin)
- **Like/Dislike System** - Community feedback on salary reports
- **Secure Authentication** - Google OAuth integration with JWT tokens
- **Responsive Design** - Mobile-friendly interface using Material UI
- **Protected Routes** - Authentication-based access control
- **Optimistic UI Updates** - Instant feedback with React Query

## 🚀 Getting Started
### Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** 18+ (LTS recommended)
- **npm** 9+ or **yarn** 1.22+
- **Git** (for cloning the repository)

### Installation
- Run `git clone https://github.com/Anonymous-Salary-Reports/salary-reports-ui.git`
- Run `cd salary-reports-ui`
- Run `npm install`
- Start the development server with `npm run dev`
- Open browser and navigate to `http://localhost:5173` (or the port shown in terminal)

## 🧪 Testing
- Run `npm run test` to execute unit and integration tests with Vitest
- Tests cover component rendering, user interactions, and API integration
- Uses `@testing-library/react` for component testing with realistic user interactions

## 📄 Project Structure
```
src/
├── api/              # API client functions and endpoints
├── pages/            # Page components organized by feature
│   ├── role-category/
│   ├── role/
│   ├── report-salary/
│   ├── view-salaries/
│   └── user-management/
├── test-utils/       # Testing utilities and helpers
├── AuthContext.tsx   # Authentication context and hooks
├── Layout.tsx        # Main layout with navigation
└── App.tsx           # Root component with routing
```

## 🔐 Authentication Flow
1. User clicks "Sign in with Google" on login page
2. Redirected to Google OAuth consent screen
3. After approval, redirected back with authentication token
4. Token stored and used for subsequent API requests
5. Protected routes verify authentication before rendering

## Future Improvements
- [ ] Implement advanced salary filtering (by date range, education, etc.)
- [ ] Implement user profile page to view/edit own salary reports
- [ ] Add export functionality (CSV, PDF) for salary data
- [ ] Implement paging for large datasets
- [ ] Add comprehensive E2E tests with Playwright or Cypress