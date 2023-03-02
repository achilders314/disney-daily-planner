# Disney Daily Planner Web App (in Progress)
An app created with React/Firebase that allows users to plan their trip at Walt Disney World using wait time data from the [Themepark API](https://api.themeparks.wiki/docs/v1/)

[Live Site (Visit "Attractions" page, or create an account, update your profile, & begin choosing attractions!)](https://disney-daily-planner-dbad2.web.app/)
![Image of Disney Daily Planner](https://user-images.githubusercontent.com/102301042/209495887-9bcc1414-42c5-4697-9976-bf65be6f0a8d.png)

### Description
In this React/Firebase project, I have a Google cloud function set up to gather data each hour from the Themeparks API. This displays in the app and users can (as of 3/1/23) create an account using either email/password or Google authentication through Firebase, update their profile with Name, Trip Dates, Parks, and then when they visit the "Attractions" page they can select which attractions, restaurants, and shows to add for each day. These will then display on the "My Trip" page. They can then rearrange a custom itinerary for each day, and save or print/create a PDF!

The last step is to allow users to create custom itinerary items, such as shopping, going to Disney Springs, beach, eating at non-park restaurants, take a rest back at the hotel, etc.

### Technologies Used
- Google Firebase Realtime Database
- React
- JavaScript
- Bootstrap
- Vanilla CSS
- Google Cloud Functions
- Themeparks API
- Font Awesome (icons)
- react-to-print npm package

### Features
- List of attractions in alphabetical order, sorted by park
- Each attraction has current wait time as well as average wait times from the last 14 days for each hour.
- Checkboxes to select which attractions to add to your trip
- Ability to schedule times you want to block off for attractions
- Ability to add a custom item (like breaks/meals, Disney Springs excursions, etc) (coming soon)
- Ability to print your schedule


### Lessons Learned
- Setting up my own Firebase back end.
- Setting up hosting through Firebase.
- Working more fluently with React Hooks.
- Handling State and using useEffect to deal with side effects.
- Sending state back up from child to parent components.
- Setting up authentication through Firebase.
- Creating a context using the useContext hook to handle user data that gets used throughout the app.
- How to use the react-to-print package to create a printable PDF.


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

