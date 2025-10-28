ONLINE CROSSWORD BOOKSTORE

Online Crossword Bookstore is a full-stack web application inspired by the Crossword bookstore.
It allows users to browse, search, and purchase books online through a responsive and modern interface.
The project combines a simple html,css and javascript frontend with a powerful Node.js + Express + MongoDB backend.

Overview

The Online Crossword Bookstore provides:

A user-friendly platform to explore and buy books.

A secure backend for managing users and books.

A responsive design suitable for both desktop and mobile devices.

Tech Stack

Frontend

HTML5

CSS3

JavaScript 


Backend

Node.js

Express.js

MongoDB (Mongoose)

Development Tools

Nodemon

dotenv

CORS

Morgan

Deployment / Containerization

Docker

Docker Compose

Installation and Setup

Follow these steps to run the project locally.

1. Clone the Repository

git clone https://github.com/yourusername/onlinecrossword.git
cd onlinecrossword


2. Backend Setup

cd backend
npm install


Create a file named .env in the backend folder and include:

MONGO_URI=your_mongodb_connection_string
PORT=5000


Run the backend:

npm run dev


Server will start on http://localhost:5000

3. Frontend Setup
Open frontend/index.html in your browser,
or use the Live Server extension in VS Code.

4. Docker Setup (Optional)

docker-compose up --build

Features

User Features

Register and log in securely.

Browse and search books by title, author, or category.

View detailed information about each book.

Add or remove books from the cart.

Access a mobile-friendly responsive interface.

Admin Features

Add new books to the catalog.

Edit or delete existing books.

Manage user and book data efficiently.

API Endpoints
Method	Endpoint	Description
GET	/api/books	Retrieve all books
GET	/api/books/:id	Retrieve a single book
POST	/api/books	Add a new book (Admin)
PUT	/api/books/:id	Update book details
DELETE	/api/books/:id	Delete a book
POST	/api/users/signup	Register a new user
POST	/api/users/login	Authenticate an existing user
Folder Structure
ONLINEBOOKSTORE/
│
├── backend/
│   ├── config/          Database configuration
│   ├── controllers/     Route controllers
│   ├── data/            Sample data
│   ├── middlewares/     Authentication and error handlers
│   ├── models/          Mongoose schemas
│   ├── routes/          Express routes
│   ├── utils/           Helper functions
│   ├── server.js        Application entry point
│   ├── Dockerfile       Docker setup for backend
│   ├── docker-compose.yml
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── assets/          Images and icons
│   ├── config.js        API base URL and settings
│   ├── index.html       Main web page
│   ├── script.js        Frontend logic
│   ├── styles.css       Stylesheet
│
└── README.md

Future Enhancements

Integration with online payment gateways.

User order history and invoice generation.

Book review and rating system.

Admin dashboard with analytics.

Conversion to a Progressive Web App (PWA).

Contributing

Contributions are welcome. To contribute:

Fork this repository.

Create a new branch (git checkout -b feature-name).

Commit your changes (git commit -m "Add feature name").

Push to your branch (git push origin feature-name).

Open a Pull Request for review.

License

This project is licensed under the MIT License.
You are free to use, modify, and distribute this project for learning or development purposes.

Author
Project Type: Academic / Portfolio Project
Inspired by: Crossword Bookstore
