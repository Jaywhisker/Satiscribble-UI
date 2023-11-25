# Satiscribble-UI

This is the repository for Satiscribble UI. The UI will integrate AI features to help improve meeting minutes taking.

# Setup
This repository is hosted on a Next.js running in Docker. To set up your docker image, please follow the following steps after git cloning and entering the root folder.
```
cd build
docker compose up
```
Afterwhich, enter the docker container terminal and run `npm run dev` to start the server on http://localhost:8000

# Setting up the endpoint
This Satiscribble UI requires 3 main containers to be running:

```
Satiscribe Python AI service
Satiscribe Mongo DB service
Satiscribe Chroma DB service
```

Ensure that these 3 services is running in the same docker network as the UI container. Once done, edit the .env file in the root folder (not the .env file in the build folder) to define the correct endpoints URL for the next.js server to call to.

# File structure
This section will explain the file structure of the current Next.js file as well as a quick explanation of how should you structure / edit the files if required.

```
├── build                          <- folder containing all docker container related files
│   ├── Dockerfile
│   └── docker-compose.yml (volume mount important files)
│
├── public                         <- folder containing all image assets/icons that are used
│
├── node_modules                   <- folder containing all libraries, run npm install to create this folder (should never be manually created)
│
├── src                            <- base folder containing all the UI components to be imported into the UI pages
│   ├── components                 <- folder containing all the code for component (ideally seperate each component into its individual .tsx files)
│   │
│   ├── data                       <- folder containing data files in JSON (can be configuration files etc to be used in the main pages)
│   │
│   ├── functions                  <- base folder containing all function files that are used
│   │   ├── api                    <- folder containing all function files related to api
│   │   └── helper                 <- folder containing all helper function files (eg. formatting data)
│   │
│   ├── pages                      <- folder containing all main ui files and will define all routes of the UI 
│   │   ├── api                    <- folder containing all server-side api files (each file in this folder will be routed to /api/filename)
|   |   |
│   │   ├── foldername             <- folder containing client-side code, must have an index.tsx inside the foldername which will contain the code for UI routed to /foldername
│   │   |    └── index.tsx
|   |   |
│   │   ├── index.tsx              <- file containing the UI for the route /
│   │   └── _app.tsx               <- config file to package the index.tsx files (should not be edited)
│   │
│   └── styles                     <- folder containing all css stylesheets
│
├── .env                           <- folder containing all environment variables for the Next.js (backend urls)
│
├── next.config.js                 <- next.js compiler file (should not be edited)
│  
├── package-lock.json              <- contains all the dependencies and library used
│  
├── package.json                   <- contains all the dependencies and library used, run npm install 
│  
├── .eslintrc.json                 <- config file for eslint (should not be edited)
│  
├── next-env.d.ts                  <- config file for typescript in next (should not be edited)
│  
└── tsconfig.json                  <- config file for typescript (should not be edited)
```

To create new routes in the UI, create a folder with the route name in the folder pages and add an index.js / index.tsx which contains the code for the UI for the page in that folder

To create new api routes, create a new file with the route name in api 

In the styles folder, there are 2 types of css (global.css and styles.module.css)
- all styles in global.css is accessible by all pages (good for defining global variables like colours)
- styles defined in styles.module.css will have to be imported in each index file 
