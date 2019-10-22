React-Saga-TS-Material for History Dashboard
============================

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Project src structure

    .
    ├── models                  # Models that used on back-end
    │   ├── index               # Root script for models export
    │   ├── apiResponse         # Response from server model
    │   └── ...                 # etc.
    ├── images                  # Project images
    ├── actions                 # State change actions
    ├── components              # Custom components for project
    │   ├── index               # Root script for components export
    │   ├── Footer              # Footer component
    │   │   ├── FooterComponent.tsx       # Component
    │   │   └── FooterStyle.tsx           # Styles
    │   ├── Header              # Header component
    │   │   ├── HeaderComponent.tsx       # Component
    │   │   └── HeaderStyle.tsx           # Styles
    │   └── ...                 # etc.
    ├── clients                 # Aws Gateway endpoints
    ├── pages                   # Main components which used as pages in router
    │   ├── index               # Root script for pages export
    │   ├── Home                # Home Page
    │   │   ├── HomePage.tsx              # Component
    │   │   └── HomeStyles.tsx            # Styles
    │   ├── NoMatch             # 404 Page
    │   │   └── ...             # etc.
    │   └── ...                 # etc.
    ├── reducers                # Saga reducers
    │   ├── example.ts
    │   └── ...
    ├── sagas                   # Sagas with own tests
    │   ├── *-saga.ts           # Example saga
    │   ├── *-saga.spec.ts      # Tests for example saga
    │   └── ...                 # etc.
    └── index.tsx               # Entry point for project. Setups store and Project theme
    └── App.tsx                 # Main component with html structure and routes rendering
    └── App.test.tsx            # Tests for main component rendering
    └── App.scss                # Global SCSS styles which is not using as theme
    └── aws-exports.js          # Amplify settings (Cognito user pool, current region, etc.)
    └── Routes.ts               # Routes object structure
    └── styles.tsx              # Styles for main App component
    └── theme.tsx               # Theme styles which is overrides Material theme

### Redux-Saga state management

![Redux-Saga state management](https://bitbucket.org/nwaveio/http-caller-history/raw/2c07fd2fcb52c2edc605ecdf05fbfc3789d6c8ea/src/images/saga_flow.png)

See doc: [https://redux-saga.js.org/](https://redux-saga.js.org/)

### Material Components

See doc: [https://material-ui.com/api/app-bar/](https://material-ui.com/api)


## Available Scripts

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run lint`

Launches the linter for typescript code.

### `npm run build`

Builds the app for production to the `build` folder.
