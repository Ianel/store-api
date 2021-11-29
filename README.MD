# Store API

An API that can be used for a store website including products, users and authentication.

## Installation

- Clone the repository
- Run `npm install`
- Create a .env file and set these environment variables: MONGO_URI, PORT, JWT_SECRET, JWT_LIFETIME
- Run `npm start`

## API endpoints

For the products:
- `GET /api/v1/products` : get the list of products
- `GET /api/v1/products/:productId` : get a specific product
- `POST /api/v1/products` : create a product
- `PATCH /api/v1/products/:productId` : update the product with the given id
- `DELETE /api/v1/products/:productId` : delete the product with the given id

For the users:
- `GET /api/v1/user` : get the list of users
- `GET /api/v1/user/:userId` : get a specific user
- `PATCH /api/v1/user/:userId` : update the user with the given id
- `DELETE /api/v1/user/:userId` : delete the user with the given id

For authentication:
- `POST /api/v1/auth/register` : register a user
- `POST /api/v1/auth/login` : login as a user