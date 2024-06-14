# ACME Learning Center Web Application 

## Summary
ACME Learning Center Application, illustrating REST client with axios on a simulated API with json-server, using Vue Framework and PrimeVue UI Component Library. The application also shows how to support in-app navigation routing.

## Features
- REST client with axios
- Simulated API with json-server
- PrimeVue UI Component Library
- In-app navigation routing
- Reusable components

## Dependencies
- Vue
- Axios
- PrimeVue
- Vue Router
- json-server

## Mock (Fake) API start
Write the following commands in the terminal to start the mock API server.
```bash
cd server
sh start.sh
```
## Identity and Access Management Features
In this version, the application includes support for user identity and access management. The following features are available:
- Sign Up
- Sign In
- Sign Out

In order to use these features, you need to replace the server base path, so it references the Identity and Access Management Server implemented with ASP.NET Core Web API.
