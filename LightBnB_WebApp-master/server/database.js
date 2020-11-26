const properties = require('./json/properties.json');
const users = require('./json/users.json');

// Postgres
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/*
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`
    SELECT * FROM users
    WHERE email = $1
    `, [email])
  .then(res => res.rows[0]);
}

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
    SELECT * FROM users
    WHERE id = $1
    `, [id])
  .then(res => res.rows[0]);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const queryString = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const values = [user.name, user.email, user.password];
  return pool.query(queryString, values)
    .then(res => res.rows[0]);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `
  SELECT * FROM reservations
    JOIN properties ON properties.id = property_id
    WHERE guest_id = $1 AND end_date < now()::date
    LIMIT $2
  `;
  const values = [guest_id, limit];
  return pool.query(queryString, values)
    .then(res => res.rows);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function(options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // const addOptions = () => {
  //   if (options.city) {
  //     queryParams.push(`%${options.city}%`);
  //     queryString += `city LIKE $${queryParams.length}`;
  //   }
  //   if (options.owner_id) {
  //     queryParams.push(`${options.owner_id}`);
  //     queryString += `owner_id = $${queryParams.length}`;
  //   }
  //   if (options.minimum_price_per_night) {
  //     queryParams.push(`${options.minimum_price_per_night}`);
  //     queryString += `cost_per_night >= $${queryParams.length}`;
  //   }
  //   if (options.maximum_price_per_night) {
  //     queryParams.push(`${options.maximum_price_per_night}`);
  //     queryString += `cost_per_night <= $${queryParams.length}`;
  //   }
  //   if (options.minimum_rating) {
  //     queryParams.push(`${options.minimum_rating}`);
  //     queryString += `property_reviews.rating >= $${queryParams.length}`;
  //   }
  // }

  // for (const option in options) {
  //   if (queryParams.length === 0) {
  //     queryString += "WHERE ";
  //     addOptions();
  //   } else {
  //     queryString += " AND "
  //     addOptions();
  //   }
  // }

  for (const option in options) {
    // console.log(queryString);
    // console.log(queryParams.length);
    // console.log(options);
    if (queryParams.length > 0 && options[option]) {
      queryString += " AND ";
    } else if (queryParams.length === 0 && options[option]) {
      queryString += "WHERE ";
    }
    if (options[option] && option === "city") {
      queryParams.push(`%${options.city}%`);
      queryString += `city LIKE $${queryParams.length}`;
    } else if (options[option] && option === "owner_id") {
      queryParams.push(Number(`${options.owner_id}`));
      queryString += `owner_id = $${queryParams.length}`;
    } else if (options[option] && option === "minimum_price_per_night") {
      queryParams.push(Number(`${options.minimum_price_per_night}`));
      queryString += `properties.cost_per_night > $${queryParams.length}`;
    } else if (options[option] && option === "maximum_price_per_night") {
      queryParams.push(Number(`${options.maximum_price_per_night}`));
      queryString += `properties.cost_per_night < $${queryParams.length}`;
    } else if (options[option] && option === "minimum_rating") {
      queryParams.push(Number(`${options.minimum_rating}`));
      queryString += `property_reviews.rating > $${queryParams.length}`;
    } 
  }

  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams)
  .then(res => res.rows);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;