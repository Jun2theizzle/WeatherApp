# WeatherApp

## How to run
Please at the root of the project run, **npm install**

Then **npm start**

The app will be running at localhost:8080

## Tests

You will need the karma cli, **npm install karma-cli -g** and Firefox
> Firefox is required because there is a bug with using Karma and the latest version of Chrome

Then you can run , **karma start** to executes the tests 

## What to expect

On page load the app will ask for you location, should you deny it will default to the Rocketmiles office in Chicago (zip 60661).

If you allow, it will use the browser way of determining your locaton. 

You can search on the Google Maps and the Forecasts below the map will refresh automatically. 