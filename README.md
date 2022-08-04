## Steps of creation

- Install dependencies needed, react router, bulma, eslint, proptypes
- Create the structure of the project
- Creation of backend json-server in a folder called api
- Layout to manage the navigation
- React context created to save the user information and manage routes based in role
- Login page and its components
- Create user page and forms
- Filter page and the option filters needed
- Profile page
- Log out option to navigate to login
- Not found component when user go to an unknown url

## Steps of execution

For the next steps it's neccesary to have yarn installed, follow the next documentation to accomplish it:
- https://classic.yarnpkg.com/lang/en/docs/install

Steps:

- Open terminal
- Execute: git clone https://github.com/micha3l999/employees-vaccionation-inventory.git
- Navigate to the api folder ubicated in the project root to install the backend dependencies: cd api/
- Execute: yarn install
- When it finishs execute: yarn dev
- Navigate to the project root: cd ..
- Then install the dependencies, so execute: yarn install
- Start the front-end executing: yarn start
- Go to the browser and navigate to localhost:3000
- To login as an admin you need to copy this credentials:
  - email: carlos@gmail.com
  - password: admin
- Then, you are there, you can filter and create common users in the web page.
## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
