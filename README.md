Your Bajaar Groysy Store
Backend Server
Installation
To install and run the backend server locally, follow these steps:

Clone the repository:
bash
C
git clone <backend-repo-url>
cd <backend-folder>
Install dependencies:
bas
npm install
Set up environment variables:

Create a .env file in the root directory.
Define the following variables:
PORT=3000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
Replace <your-mongodb-uri> and <your-jwt-secret> with your MongoDB connection string and a secret for JWT.

Usage
To start the backend server, run the following command:

bash
npm start

Dependencies
bcrypt: ^5.1.1
cors: ^2.8.5
dotenv: ^16.4.5
express: ^4.19.2
jsonwebtoken: ^9.0.2
mongoose: ^8.4.4
node-cron: ^3.0.3
nodemailer: ^6.9.14
nodemon: ^3.1.4
otp-generator: ^4.0.1
speakeasy: ^2.0.0
Scripts
npm test: Placeholder for test scripts.
npm start: Start the server using nodemon.


Frontend Client
Project Name: yourbajaar


bash


Install dependencies:

bash

npm install
Usage
To start the development server for the frontend, run:

bash

npm start
To build the frontend project for production, run:

bash
Copy code
npm run build
Scripts
npm start: Start the development server.
npm run build: Build the project for production.
npm test: Run tests using React Scripts.