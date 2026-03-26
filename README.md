# Full Stack Developer Intern Task

## Setup Instructions

### Prerequisites
- PHP 8+
- Composer
- Node.js & npm
- PostgreSQL

### Database Setup
1. Create a PostgreSQL database named `intern_task`.
2. Import the provided `database_export.sql` file:
   ```bash
   psql -U postgres -d intern_task < database_export.sql
   ```

### Backend Setup (CodeIgniter)
1. Navigate to the `backend` directory: `cd backend`
2. Run `composer install`
3. Copy `env` to `.env` and configure your PostgreSQL database credentials:
   ```env
   database.default.hostname = 127.0.0.1
   database.default.database = intern_task
   database.default.username = your_postgres_user
   database.default.password = your_postgres_password
   database.default.DBDriver = Postgre
   database.default.port = 5432
   database.default.charset = utf8
   ```
4. Run migrations just in case: `php spark migrate`
5. Start the backend server: `php spark serve` (Runs on http://localhost:8080)

### Frontend Setup (React + Vite)
1. Navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Access the application in your browser (usually http://localhost:5173). The React application proxies API requests or makes them directly to `localhost:8080`.

## Features
- Complete API architecture with CodeIgniter 4
- JWT Token-based Authentication
- ReactJS Frontend with TailwindCSS styling
- Data tables displaying Users and Teachers separately
- 1-1 Relationship between `auth_user` and `teachers` tables where registration populates both.
# intern-task
# intern-task
# intern-task
# intern-task
# intern-task
# intern-task
