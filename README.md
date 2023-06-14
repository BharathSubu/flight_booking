# Book Amigo
## Book your tickets with ease, with Ticker Booking!

"Book Amigo" is a Airplane Ticket Booking System designed to provide a seamless and convenient experience for booking flights. With Book Amigo, you can easily search for and reserve flights, making the process of planning your travel hassle-free.  

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#installation)
- [Logical view ](#logical-view )
- [Frontend Architecture](#frontend)
- [Backend End Points](#end-points)

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

To setup the application in your pc follow the steps below:

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

## Installation Video
[![Video](https://img.youtube.com/vi/wk-wcv9wbpI/0.jpg)](https://youtu.be/wk-wcv9wbpI)

## Logical view 
<img src="https://i.imgur.com/mgPP6YF.png" alt="Logical View" width="70%">

## Frontend
<img src="https://i.imgur.com/as2kLKJ.png" alt="Logical View" width="90%">

## End Points
## User

- post: **/user/register** -> "Register User"
- post: **/user/login** -> "Logins user and returns JWT token"
- get : **/user/checkemail/:email** -> "Checks if user already exists in teh database"
- get : **/user/getItems** -> "Return all distinct flight names , From and To place"
- post: **/user/searchflights** -> "Searchs for a flight based on date, time , name"
- get : **/user/getflights** -> "Returns all Available Flights"
- post: **/user/bookflight** -> "Books a flight under the user's email"
- post: **/user/getuserflights** -> "Returns all the flight booked by the user"
- post: **/user/cancelflight** -> "Cancels flight booked by the user"

## Admin

- post: **/admin/register** -> "Register Admin"
- post: **/admin/login** -> "Logins administrator and returns JWT token"
- setInterval() -> "Delete Every Flight Whose arrivalTime is less than the current Time" 
- post: **/admin/deleteflight** -> "Removes a flight from the Database"
- post: **/admin/addflight** -> "Add flights to the database"
- post: **/admin/cancelbooking** -> "Cancels flight booked by users"
- get : **/admin/getalluserflights** -> "Return all flights booked by user along with the ticket count"
- get : **/admin/getallflights** -> "Return all the flights"
