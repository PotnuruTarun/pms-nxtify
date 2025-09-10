# Product Management System

A modern, responsive Product Management System built with React and Node.js.  
Easily add, view, edit, and manage products with a beautiful UI and professional features.

## Features

- **Landing Page** with animated blocks,  and themed design
- **Product CRUD**: Add, view, edit, and delete products
- **Responsive UI**: Works great on desktop and mobile
- **Dark/Light Theme**: Toggle between light and dark modes
- **Search & Filter**: Search by name, filter by category, and sort products
- **Professional UI**: Indian price formatting, attractive buttons, and modern layout
- **Loading & Error Handling**: Spinners and friendly messages for all states

## Tech Stack

- **Frontend**: React, React Router, CSS Modules
- **Backend**: Node.js, Express, MongoDB
- **Deployment**: Render

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PotnuruTarun/product-management-system.git
   cd product-management-system
   ```

2. **Install dependencies**
   ```bash
   cd backend
   npm install
   cd ../pms
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the `backend` folder:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=8080
   ```

4. **Run the backend**
   ```bash
   cd backend
   node server.js
   ```

5. **Run the frontend**
   ```bash
   cd ../pms
   npm run dev
   ```

6. **Open in browser**
   Visit [http://localhost:5173](http://localhost:5173)

## Deployment

- The app is ready to deploy on platforms like Render, Vercel, or Netlify.
- Set the correct environment variables for production.


## License

MIT

---

**Made with ❤️**
