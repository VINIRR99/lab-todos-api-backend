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

  **Edit**: [Link to iteration 4](https://github.com/VINIRR99/lab-todos-frontend)
  
![small](https://user-images.githubusercontent.com/26174871/132945098-6abe8ba4-e623-474a-9fa5-914842e3e622.gif)

Happy coding! 💙