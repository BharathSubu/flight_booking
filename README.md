# Book Amigo
## Book your tickets with ease, with Ticker Booking!

"Book Amigo" is a Airplane Ticket Booking System designed to provide a seamless and convenient experience for booking flights. With Book Amigo, you can easily search for and reserve flights, making the process of planning your travel hassle-free.  

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#installation)
- [Logical view ](#logical-view )

## Features

### User Use Cases

- [x] **Login** 
- [x] **Sign up (with apt data validations)** 
- [x] **Searching for flights based on date and time / flight Name / From(or)To places** 
- [x] **Booking tickets on a flight based on availability (with default seat count is 60)** 
- [x] **My Booking -&gt; to list out all the bookings made by that user**
- [x] **Logout** 

### Admin Use Cases

- [x] **Admin Login with Administrators access** 
- [x] **Add Flights into the database**
- [x] **Remove Flights from Databse**
- [x] **View all Booking made by user and also cancel them** 

### System Feature

- [x] **Implemented my own Load balancer to distribute api requests to two instance of api server running at port 2000 and 2001**
- [x] **Implementation of authorization middleware in Node Js for both user and admin for specific endpoints**
- [x] **Containerized application allowing us to create multiple instance of the server by doing very little changes in docker-compose.yaml file**
- [x] **Highly Scalable and faster database**

## Technologies Used

- Frontend: React,  Tailwind, 
- Backend: Node,  Express, 
- Database: Mongo Db
- Version Control: Git,
- Containerization : Docker
- Hosting - GCP ( Google Cloud Platform )

## Installation

To setup the application in you pc follow the steps below:

1. Clone the GitHub repository:

   ```bash
   git clone https://github.com/BharathSubu/flight_booking.git
    ```
2. Install Docker and Configure the Environment.

3. Open Terminal in the cloned repository and build the docker-compose.yaml file:
   ```bash
   sudo docker compose build
   ```
4. Run the application using the following command:
   ```bash
   sudo docker compose up
    ```
5. You can access the application in the following port:
   ```bash
   http://localhost/login
    ```
6. You can also access the live website in the following url:
   ```bash
   http://34.76.8.181/login
    ```
   
Note: To create account as Admin use adminkey : 12345


## logical view 
<img src="https://i.imgur.com/mgPP6YF.png" alt="Logical View" width="70%">

