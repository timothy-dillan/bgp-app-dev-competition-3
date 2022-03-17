# BGP App Development Competition (Team 3) - Bidding System

**Bidding system** is an auction-inspired bidding system that is built with Go (backend) and React (frontend).

## Overall Tech Stack

- Go (Backend)
- React (Frontend)
- PostgreSQL (Database)
- BigCache (In-memory Database)
- Heroku (planned for deployment purposes)
- Docker

## Installation
Bidding system requires:

- Go (>= 1.4)
- React (install using `brew install node && brew install yarn`)
- Docker

To install the required backend dependencies, change directory (`cd`) to the backend folder, and run this command: `go mod tidy`. 

## Running
### Backend

To run the backend, change directory (`cd`) to the backend folder, and run this command: `make run`. 

### Frontend

To run the frontend, change directory (`cd`) to the frontend folder, and run this command: `yarn install && yarn start`. 

### All

To run both, make sure docker is installed and run `docker-compose up -d` on the backend folder. Then run the backend as instructed, and then run the frontend. 

## Credits
The system is created by team 3, with the following members:

- Ahmad Anan Rafsjani
- Ikhsan Kurniawan
- Nethania Sonya
- Timothy Dillan

