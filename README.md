# Introduction

E-commerce website api build using Express Js and Mongo DB.
The API allows users to perform CRUD operations on products,users,categories. Place order and shipment detail. 
We have also implemented the features of authentication and authorization. Proper permissions and role must be provided to provided to access protected and sensitive api.
### Access the project live at [here](https://integrify-backend-ma3it4x6p-albinlamichhane9-gmailcom.vercel.app/).

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

## Table of contents
- [Technologies](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running tests](#running-tests)
  

## Technologies
- Typescript
- Express
- Mongo DB
- Jest

## Project structure

```
.
├── constants
├── controllers
├── coverage
├── errors
├── middleware
├── models
├── routes
├── schemas
├── services
├── test
│   ├── mockData
│   ├── controllers
│   └── services
├── types
└── utils
```

## Getting started

1. Clone this repo with `git clone https://github.com/gayang/fs16-backend.git` command.
2. Install project dependencies using `yarn install` command.
3. Run the app with `yarn run dev`.

## Running tests
- Use `yarn test` command to run test cases.
- Use `yarn test-coverages` to generate coverage report.