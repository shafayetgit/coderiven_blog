# CodeRiven Blog

A modern, high-performance full-stack blogging platform built with **Django Ninja** on the backend and **React (Vite)** on the frontend.

---

## 🚀 Features

- **High-Performance API**: RESTful API powered by **Django Ninja** for fast execution and auto-generated OpenAPI docs.
- **Authentication & Security**: Secure JWT authentication via **Django Ninja JWT** with support for Google OAuth authentication.
- **Rich Markdown Support**: Full Markdown rendering, GitHub Flavored Markdown (GFM), syntax highlighting, and read-time estimation.
- **Nested Comments**: Efficient hierarchical comment tree powered by `django-mptt`.
- **Modern UI/UX**: Responsive and sleek design utilizing **Material UI (MUI v6)** and Emotion styling.
- **State Management**: Predictable global state management using **Redux Toolkit** and **React Redux**.
- **Asset Integration**: Vite build flow configured to seamlessly static-serve the frontend via Django templates.

---

## 🛠️ Tech Stack

### **Backend (`coderiven-backend`)**
- **Framework**: Django 5+ & Django Ninja
- **Authentication**: `django-ninja-jwt`, Google OAuth (`@react-oauth/google`)
- **Database**: SQLite (Development) / PostgreSQL (Production)
- **Utilities**: `django-mptt`, `readtime`, `python-decouple`, `Pillow`, `whitenoise`, `pymemcache`

### **Frontend (`coderiven-frontend`)**
- **Core**: React 19, Vite 6
- **Routing**: React Router v7
- **UI Components**: Material UI (MUI v6), `@mui/icons-material`, `@emotion/react`
- **State Management**: Redux Toolkit (`@reduxjs/toolkit`)
- **Markdown Rendering**: `react-markdown`, `remark-gfm`, `rehype-raw`, `react-syntax-highlighter`

---

## 📁 Project Structure

```text
coderiven_blog/
├── coderiven-backend/       # Django & Django Ninja API Backend
│   ├── apps/                # Django applications (blog, user, etc.)
│   ├── coderiven/           # Project settings, URL routing, Ninja API configuration
│   ├── config/              # Modular settings (base, dev, prod)
│   ├── requirements/        # Python requirements (base.txt, dev.txt, prod.txt)
│   └── manage.py            # Django management script
├── coderiven-frontend/      # React + Vite Frontend
│   ├── src/                 # Application source code (components, pages, store, etc.)
│   ├── public/              # Static assets
│   ├── package.json         # Node dependencies and scripts
│   └── vite.config.js       # Vite build & proxy configuration
└── .gitignore               # Workspace Git ignore rules
```

---

## 🚦 Getting Started

### Prerequisites

- **Python**: `3.10+`
- **Node.js**: `18+` & `npm`

---

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd coderiven-backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements/dev.txt
   ```

4. Set up environment variables:
   Create a `.env` file inside `coderiven-backend/` (refer to `.env.example` if available).

5. Run database migrations:
   ```bash
   python manage.py migrate
   ```

6. Start the backend development server:
   ```bash
   python manage.py runserver
   ```
   The Django Ninja interactive API documentation will be available at `http://127.0.0.1:8000/api/docs`.

---

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd coderiven-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Ensure `.env` in `coderiven-frontend/` points to your local backend API.

4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The React app will run at `http://localhost:5173`.

---

## 📦 Production Build Flow

To bundle the frontend for Django to serve as static templates:

```bash
cd coderiven-frontend
npm run build
```
This triggers the `postbuild` script to place compiled HTML & static bundles into Django's template and static directories.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
