# FTO-WS

Welcome to FTO-WS, a modern product management application built with Next.js and Firebase Studio. This application provides a robust system for managing products and fabrics, complete with an admin dashboard, user-facing product views, and QR code integration.

## Tech Stack

The application is built with a modern, scalable, and efficient technology stack:

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Generative AI**: [Genkit (via Firebase)](https://firebase.google.com/docs/genkit)
- **Database**: In-memory mock data (for demonstration purposes)

## Key Libraries & Dependencies

### Core
- **react**: A JavaScript library for building user interfaces.
- **next**: The React framework for server-rendered applications.
- **typescript**: A typed superset of JavaScript that compiles to plain JavaScript.

### UI & Styling
- **@radix-ui/react-***: A collection of unstyled, accessible UI components that form the foundation of ShadCN UI.
- **lucide-react**: A beautiful and consistent icon library.
- **class-variance-authority**, **clsx**, **tailwind-merge**: Utilities for building flexible and maintainable Tailwind CSS components.
- **tailwindcss-animate**: A Tailwind CSS plugin for adding animations.

### Forms & Validation
- **react-hook-form**: A performant, flexible, and extensible forms library for React.
- **@hookform/resolvers**: Resolvers for using validation libraries like Zod with React Hook Form.
- **zod**: A TypeScript-first schema declaration and validation library.

### Data & AI
- **genkit**, **@genkit-ai/googleai**: Google's open-source framework for building AI-powered applications.
- **@tanstack/react-table**: A headless UI library for building powerful data tables and datagrids.

### Utility
- **date-fns**: A modern JavaScript date utility library.
- **react-qr-scanner**: For implementing QR code scanning functionality.

## Getting Started: Running Locally with VS Code

Follow these steps to get the application running on your local machine for development and testing.

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Visual Studio Code](https://code.visualstudio.com/)

### 1. Open the Project in VS Code

Open the project folder in Visual Studio Code.

### 2. Install Dependencies

Open the integrated terminal in VS Code (`View` > `Terminal` or `Ctrl+\``) and run the following command to install all the necessary packages defined in `package.json`:

```bash
npm install
```

### 3. Run the Development Server

Once the dependencies are installed, you can start the Next.js development server. The server will watch for file changes and automatically reload the application.

Run the following command in the terminal:

```bash
npm run dev
```

You should see output similar to this, indicating that the server is running:

```
   ▲ Next.js 15.3.3 (Turbopack)
   - Local:        http://localhost:9002
   - Network:      http://0.0.0.0:9002
```

### 4. Access the Application

Your application is now running! You can access it in your web browser at the following local address:

[http://localhost:9002](http://localhost:9002)

### 5. Using the Application

You can log in with the following mock credentials:

- **Admin Account**:
  - **Email**: `admin@example.com`
  - **Password**: `admin123`
- **User Account**:
  - **Email**: `user1@example.com`
  - **Password**: `user123`
