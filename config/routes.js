/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/



  //  '/': { view: 'pages/homepage' },
  '/': 'RentalController.home',
  // 'GET /create': 'RentalController.create',
  // 'GET /detail/:id': 'RentalController.detail',
  // 'GET /search': 'RentalController.search',
  // 'GET /update/:id': 'RentalnController.update',

  'GET /rental/home': 'RentalController.home',

  'GET /rental/create': 'RentalController.create', 
  'POST /rental/create' :'RentalController.create',
  //'POST /rental/create': 'RentalController.create',

  'GET /rental/detail/:id': 'RentalController.detail',
  //'GET /rental/:id': 'RentalController.detail',
  // 'POST /rental/detail/:id': 'RentalController.detail',


  'GET /rental/admin': 'RentalController.admin',

  'GET /rental/search': 'RentalController.search',

  'GET /user/myrental': 'UserController.myrental',
  
  'GET /user/occupants/:id':'UserController.occupants',
  // 'GET /user/myrental': 'RentalController.myrental',
  // 'GET /rental/Myrental/:id': 'RentalController.Myrental',
  //'GET /rental/occupants/:id': 'RentalController.occupants',

  'GET /rental/update/:id': 'RentalnController.update',
  // 'PUT /rental/:id': 'RentalController.update',
  'POST /rental/update/:id': 'RentalController.update',

  //'POST /rental/delete/:id': 'RentalController.delete',
  'DELETE /rental/:id': 'RentalController.delete',

  'GET /user/login': 'UserController.login',
  'POST /user/login': 'UserController.login',
  'POST /user/logout': 'UserController.logout',

  'GET /rental/:id/worksFor': 'RentalController.populate',
  'GET /user/:id/supervises': 'UserController.populate',
  //'POST /user/:id/supervises/add/:id': 'UserController.add',
  'PUT /user/:id/rental/:id': 'UserController.add',
  'DELETE /user/:id/rental/:id': 'UserController.remove',
  // 'POST /user/:id/supervises/remove/:id': 'UserController.remove',

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
