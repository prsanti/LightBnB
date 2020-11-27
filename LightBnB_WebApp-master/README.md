# LightBnB

## Project Structure

```
├── public
│   ├── index.html
│   ├── javascript
│   │   ├── components 
│   │   │   ├── header.js
│   │   │   ├── login_form.js
│   │   │   ├── new_property_form.js
│   │   │   ├── property_listing.js
│   │   │   ├── property_listings.js
│   │   │   ├── search_form.js
│   │   │   └── signup_form.js
│   │   ├── index.js
│   │   ├── libraries
│   │   ├── network.js
│   │   └── views_manager.js
│   └── styles
├── sass
└── server
  ├── apiRoutes.js
  ├── database.js
  ├── json
  ├── server.js
  └── userRoutes.js
```

* `public` contains all of the HTML, CSS, and client side JavaScript. 
  * `index.html` is the entry point to the application. It's the only html page because this is a single page application.
  * `javascript` contains all of the client side javascript files.
    * `index.js` starts up the application by rendering the listings.
    * `network.js` manages all ajax requests to the server.
    * `views_manager.js` manages which components appear on screen.
    * `components` contains all of the individual html components. They are all created using jQuery.
* `sass` contains all of the sass files. 
* `server` contains all of the server side and database code.
  * `server.js` is the entry point to the application. This connects the routes to the database.
  * `apiRoutes.js` and `userRoutes.js` are responsible for any HTTP requests to `/users/something` or `/api/something`. 
  * `json` is a directory that contains a bunch of dummy data in `.json` files.
  * `database.js` is responsible for all queries to the database. It doesn't currently connect to any database, all it does is return data from `.json` files.

## Final Product
# View All Listings
!["Screenshot of all listings](https://github.com/prsanti/LightBnB/blob/master/LightBnB_WebApp-master/docs/view-all-listings.png)
# Search Listings
!["Screenshot of search listing feature"](https://github.com/prsanti/LightBnB/blob/master/LightBnB_WebApp-master/docs/search-listings.png)
# Filtered Results
!["Screenshot of filtered results"](https://github.com/prsanti/LightBnB/blob/master/LightBnB_WebApp-master/docs/filtered-results.png)
# Create Your Own Listings
!["Screenshot of create own listing feature"](https://github.com/prsanti/LightBnB/blob/master/LightBnB_WebApp-master/docs/create-listing.png)
# See Your Own Listings
!["Screenshot of user's own listing"](https://github.com/prsanti/LightBnB/blob/master/LightBnB_WebApp-master/docs/view-own-listings.png)
# See Your Past Reservations
!["Screenshot of user's past reservations"](https://github.com/prsanti/LightBnB/blob/master/LightBnB_WebApp-master/docs/see-past-reservations.png)

## Dependencies
- Express
- Node 5.10.x or above
- Bodyparser
- Bcrypt
- Cookie-Session
- pg

## Getting Started
- Install all dependencies (using the npm install command).
- Run the development web server using the npm run local command.