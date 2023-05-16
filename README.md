#api

This is an Express API project built using Node.js.

## Setup

1. Clone the repository:
   ```shell
   git clone https://github.com/BHARATH999999/c2
   
2. Install the dependencies:
  ```shell
   npm install
   ```
   
3. Start the development server:
```shell
npm run start:dev
```

## End points

  GET /api/v1/user

  Description: Retrieve all users.
  Response: Status Code: 200 OK
  Body: Array of user objects.

  POST /api/v1/user

  Description: Create a new user.
  Request Body:
  name (string): Name of the user.
  hobbies (string): Array of strings of user hobbies can be empty.
  age (number): Age of the user.
  Response:
  Status Code: 201 Created
  Body: Created user object.
  
  GET /api/v1/user/:userId

  Description: Retrieve a user by ID.
  Parameters:
  userId (string): ID of the user.
  Response:
  Status Code: 200 OK
  Body: User object.
  
  PUT /api/v1/user/:userId

  Description: Update a user by ID.
  Parameters:
  userId (string): ID of the user.
  Request Body:
  name (string): Updated name of the user.
  hobbies (string): Array of strings of user hobbies can be empty.
  age (number): Updated age of the user.
  Response:
  Status Code: 200 OK
  Body: Updated user object.
  
  DELETE /api/v1/user/:userId

  Description: Delete a user by ID.
  Parameters:
  userId (string): ID of the user.
  Response:
  Status Code: 204 
