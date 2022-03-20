  **Edit**: [lab-todos-api-frontend](https://github.com/VINIRR99/lab-todos-frontend)
![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# Todos Api

## Introduction


## Requirements

- Api for complete CRUD on Todo Models

## Start your api Project

- run the following commands:

  ```
  git init
  npm init
  npm i mongoose express
  touch .gitignore
  ```

- Includes node modules and package-lock.json on gitignore file

## Instructions

### Iteration 1 - Setting your folder structure

You will need:

- app.js file -> To be our server, and have all the routes we need

- config folder > db.config.js -> With a function that handle with our mongo connection

- models folder > Todo.js -> create an Schema instance and export our model Todo


### Iteration 2 - Todo Schema

Create a `Todo` model . The schema should have the following fields:

- **title** - Type `String`. It should be required.
- **completed** - Type `Bollean`, should have default `false` 
- **timestamps** - use, timstamps config of mongoose

### Iteration 3 - Api Routes

Ok, with the model created lets start to create our routes, for complete CRUD.

| Method | Endpoint   | Payload                                | Response  | Action                     |
| ------ | ---------- | -------------------------------------- | --------- | -------------------------- |
| GET    | /todos     | \-                                     | \[todos\] | Get All Todos form DB      |
| POST   | /todos     | {"title":String, "completed": Bollean} | {todo}    | Create New Todo            |
| PUT    | /todos/:id | {"title":String, "completed": Bollean} | {todo}    | Update Existing Todo by Id |
| DELETE | /todos/:id | \-                                     | \-        | Deletes todo               |


Test every single route using `postman` or `insomnia`



### Iteration 4 - Create Front-End React

  Now use what we learn on module 2 to create a React UI that consumes our routes on Api.
  
  This is a chalenge, you need to have your express server running in some port to be able to connect your react application using axios
  
![small](https://user-images.githubusercontent.com/26174871/132945098-6abe8ba4-e623-474a-9fa5-914842e3e622.gif)

# Todos Api Part 2

# Introduction
 Now we have an complete CRUD api for todos we will create users for our aplication, every user will have an password that will bem save encrypted on our database, every user will have an array of todos an we will add on our todos an reference for the user that create it.

# Requirements

- Api for complete CRUD on Todo Models


- Includes node modules and package-lock.json on gitignore file

# Instructions

## Iteration 1 

#### 1.1 - Create user model

- **name** - Type `String`. It should be required.
- **email** - Type `String`, It should be required, and you can use match to setting only valid emails
- **passwordHash** - Type `String`, It should be required but here we dont set de match we will save hash password
- **todos** - Type  array of `ObjectId` this one will be an reference to our todo model
- **timestamps** - use, timstamps config of mongoose


#### 1.2 - change Todo model

Includes an new field on todo model

- **user** - Type `ObjectId`, will be an reference to user model


## Iteration 2 - Auth Routes

#### 2.1
Ok, with the model created lets start to create our routes, for complete CRUD.

| Method | Endpoint   | Payload                                | Response  | Action                     |
| ------ | ---------- | -------------------------------------- | --------- | -------------------------- |
| POST | /auth/signup | {"name":String, "email":String "password":String} | {newUser (without password)}                    | Create new user              |

In this route we will need to use bcrypt to hash our password, and save the has on database

check if we already have an user with the email, and response with its true

#### 2.2
| Method | Endpoint   | Payload                                | Response  | Action                     |
| ------ | ---------- | -------------------------------------- | --------- | -------------------------- |
| POST | /auth/login  | {"email":String, "password":String} | {user; JWT} | Return JWT to private routes |

This route need to check the password and return an jwt coded token

Test every single route using `postman` or `insomnia`



### Iteration 3 - Create authentication middleware

Create an middleware to check our jwt token that needs to:

1- Check if the resquest came with token
2- validate token
3 - insert the decoded token on req 
4 - call  next param

### Iteration 4 - Change todo routes

In this point we need to change our todo routes to includes user on create Todo and push this todo to the user

### Iteration 5 - Reacting

Now we have to create new pages on our react page, with you get here considerer that an chalenge we will do this togheter in class

Happy coding! 💙
