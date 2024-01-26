# mind-Inventory3

## installation 
1. Clone the repository
2. Run 'npm install' to install all dependency
3. start the appliction with `npm run server`

## Usage 
1. Set the enviroment variable: `DATABASENAME, USERNAME2, PASSWORD, SALT`

## API
1. http://localhost:2323/api/v1/signUp
this API is used to sign up the user

2. http://localhost:2323/api/v1/signIn
this API is used to sign in the user

2. http://localhost:2323/api/v1/employee-leave
this API is used to type the mesaage to get leave information

## Description
first of all user is need to sign up and the server will store the user information and save hashed passaword in db 
then user can login then server will return token so than user can be authenticated for other route