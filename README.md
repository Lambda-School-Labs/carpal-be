
[![Maintainability](https://api.codeclimate.com/v1/badges/a8ec7fda3d1cf5e2c7b1/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/carpal-be/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/a8ec7fda3d1cf5e2c7b1/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/carpal-be/test_coverage)

🚫 Note: All lines that start with 🚫 are instructions and should be deleted before this is posted to your portfolio. This is intended to be a guideline. Feel free to add your own flare to it.

🚫 The numbers 1️⃣ through 3️⃣ next to each item represent the week that part of the docs needs to be comepleted by. Make sure to delete the numbers by the end of Labs.

🚫 Each student has a required minimum number of meaningful PRs each week per the rubric. Contributing to docs does NOT count as a PR to meet your weekly requirements.

# API Documentation

#### 1️⃣ Backend delpoyed at [🚫name service here](🚫add URL here) <br>

## 1️⃣ Getting started

To get the server running locally:

🚫 adjust these scripts to match your project

-   Clone this repo and cd into carpal-be directory
-   **npm install** to install all required dependencies 
-   **npm run server** to start the local server
-   **npm run test** to start server using testing environment

### Backend framework goes here

### Express.js
🚫 Why did you choose this framework?

-   Simplicity
-   Minimal lines of code
-   Flexible
-   Scalable 

## 2️⃣ Endpoints

🚫This is a placeholder, replace the endpoints, access control, and description to match your project

#### Location Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/locations`            | all users      | Returns all locations entered by all users   |
| GET    | `/locations/:id`        | owner          | Returns a single location entered by user    |
| POST   | `/locations`            | owner          | Allows user to enter in a new location       |
| PUT    | `/locations/:id`        | owner          | Allows user to enter to update a location    |
| DELETE | `/locations/:id`        | owner          | Delete a location                            |

#### User Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| POST    | `/auth/register`       | all users           | Allows user to create an account                   |
| POST    | `/auth/login`          | all users           | Allows user to authenticate and log into account   |
| GET    | `/auth`                 | all users           | Allows for user retrieval from a token             |
| PUT    | `/users/update`         | owner               | Allows user to update their account                |
| DELETE | `/users/delete`         | owner               | Allows user to delete their account                |

### Favorite Locations Routes

| Method | Endpoint                     | Access Control | Description                                  |
| ------ | ---------------------------- | -------------- | -------------------------------------------- |
| GET    | `/locations/favorites`       | owner          | Returns all favorite locations for a user    |
| PUT    | `/locations/favorites/:name` | owner          | Update a user's certain favorite location    |
| POST    | `/locations/favorites`      | owner          | Add a favorite location for a user           |
| DELETE | `/locations/favorites/:id`   | owner          | Delete a a user's favorite location          |

# Data Model

🚫This is just an example. Replace this with your data model

#### 2️⃣ LOCATIONS

---

```
{
  "id": 1,
  "lat": 39.385348651562,
  "long": -99.797763874469
}
```

#### USERS

---

```
{
  "id": 10,
  "first_name": "panda",
  "last_name": "express",
  "email": "pandaboiii@carpal.com",
  "is_driver": false,
  "phone_number": "3324343433",
  "created_at": "2020-03-17T00:21:48.597Z",
  "zip_code": 55343,
  "is_admin": false,
  "is_disabled": false,
  "bio": null,
  "profile_picture": null
}
```

## 2️⃣ Actions

🚫 This is an example, replace this with the actions that pertain to your backend

`findBy(filter)` -> find a single item using a filter (ie email, address, etc.)

`findAll()` -> Returns all from requested database

`add(item)` -> Add a record to requested database

`update(id, item)` -> Update a location using the id from req.params

`delete(id)` -> Delete a record using id from req.params
<br>
<br>
<br>
`verifyToken()` -> verifies that user is authorized. Checks if they have a token

`validateUserToken()` -> Returns user information from token


## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:
    *DATABASE_URL - URL for postgres database
    *DB - Connection for local Postgres DB instance
    *DB_TEST - Connection for local Postgres DB instance
    *USER - Reflect what is setup in pgAdmin in your local environment
    *PASSWORD - Reflect what is setup in pgAdmin in your local environment
    *NODE_ENV - set to "development" until ready for "production"

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

-   Check first to see if your issue has already been reported.
-   Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
-   Create a live example of the problem.
-   Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

-   Ensure any install or build dependencies are removed before the end of the layer when doing a build.
-   Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
-   Ensure that your code conforms to our existing code conventions and test coverage.
-   Include the relevant issue number, if applicable.
-   You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](🚫link to your frontend readme here) for details on the fronend of our project.
🚫 Add DS iOS and/or Andriod links here if applicable.
