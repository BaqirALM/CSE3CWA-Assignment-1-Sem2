# Assignment 2 CSE3CWA

## Student Info
- **Name:** Baqir Al Musawi
- **Student ID:** 21612428

## What I Built
A web app using Next.js and Docker. It includes:
1.  **Main Frontend (`app` folder):** Contains the main user interface with pages like Tabs, About, and Escape Room. Features navigation, dark/light mode, and saves tab content locally.
2.  **Backend API (`api` folder):** Manages user data (name, online/offline status) using Sequelize/SQLite. Has GET/POST/PATCH/DELETE endpoints and an API documentation page.
3.  **Frontend Demo (`frontend` folder):** A separate page showing how to use the API to list, add, update, and delete users.

## Features
- **Main App:**
    - Create/edit tabs & generate HTML code.
    - Dark/light theme toggle.
    - Navigate between pages.
    - Tabs save automatically to Local Storage.
    - Basic Escape Room game with timer and puzzles.
- **API:**
    - `/api/users` endpoints for user Create, Read, Update, Delete (CRUD).
    - API documentation page.
    - Uses SQLite database with migrations.
- **Frontend Demo:**
    - Lists, adds, updates (status), and deletes users via the API.

## How to Run (Using Docker)
1.  Make sure Docker and Docker Compose are installed.
2.  In the main `assignment1` folder (the one with `docker-compose.yml`), open your terminal and run:
    ```bash
    sudo docker-compose up --build or sudo DOCKER_BUILDKIT=0 docker-compose up --build
    ```
3.  Open your web browser to:
    * **API Docs:** `http://ec2-44-203-213-77.compute-1.amazonaws.com:4080`
    * **Frontend Demo:** `http://ec2-44-203-213-77.compute-1.amazonaws.com:80`
4. To get into the front end run the command npm run start then do the following:
    * **Main Frontend (Tabs, Escape Room, etc.):** `http://ec2-44-203-213-77.compute-1.amazonaws.com:3000`
## Pages (Main Frontend - `app` folder)
- **`/` (Tabs):** Create tabs and generate HTML.
- **`/pages/about`:** Project info and video guide.
- **`/pages/escape-room`:** Escape room game.
- **`/coding-races`:** *Under development*.
- **`/pages/court-room`:** *Under development*.

## What Works
- Header and navigation.
- Tab creation, editing, saving, and HTML generation.
- Theme switching.
- Escape Room game basics.
- API CRUD operations for users.
- Frontend Demo interaction with API.