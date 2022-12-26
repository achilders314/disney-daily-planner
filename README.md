# Disney Daily Planner Web App (in Progress)
An app created with React/Firebase that allows users to plan their trip at Walt Disney World using wait time data from the [Themepark API](https://api.themeparks.wiki/docs/v1/)

[Live Site (Visit "Attractions" page to see where it's headed)](https://disney-daily-planner-dbad2.web.app/)

### Description
In this React/Firebase project, I have a Google cloud function set up to gather data each hour from the Themeparks API. This displays in the app and my plan is to allow users to click the checkboxes and add the attractions to their visit. They will then be able to schedule out times that they'd like to visit the attractions each day of their trip, and print an itinerary if desired.

### Technologies Used
- Google Firebase Realtime Database
- Google Firebase Firestore Database
- React
- Bootstrap
- Vanilla CSS
- Google Cloud Functions
- Themeparks API

### Features
- List of attractions in alphabetical order, sorted by park
- Each attraction has current wait time as well as average wait times from the last 14 days for each hour.
- Checkboxes to select which attractions to add to your trip (coming soon)
- Ability to schedule times you want to block off for attracitons (coming soon)
- Ability to add a custom item (like breaks/meals, Disney Springs excursions, etc) (coming soon)
- Ability to print your schedule (coming soon)


### Lessons Learned
- Setting up my own Firebase back end.
- Setting up hosting through Firebase
- Working more fluently with React Hooks.


## Available Scripts

This app was created using create-react-app. In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

