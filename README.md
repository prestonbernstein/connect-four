# connect-four
A game of connect four, written in rails and react-redux

## Technologies
I chose to use existing frameworks to facilitate speed of development.

* Server - [Ruby on Rails](https://github.com/rails/rails)
* Client - [React-Redux-Starter-Kit](https://github.com/davezuko/react-redux-starter-kit)

## Architecture
The client and the server are separate applications. I chose to separate these two sides to ensure that I could easily use Node and NPM tools such as webpack and babel, and not have to worry about integrating with the asset pipeline in Rails, and could instead immediately focus on the code for the Connect-Four game.

### Why Rails?
I chose to use Rails because of its opinionated workflow. My goal was to get a usable and reliable server up as soon as possible. Even thought this application really only is used to generate JSON, the default Rails middleware provides a lot of useful features.

### Why React-Redux-Starter-Kit?
I chose to use the React-Redux-Starter-Kit to speed up my development time. The starter kit already contains a sophisticated webpack build system already setup with a bunch of useful features, such as hot reloading, SCSS, unit testing, and more.

## TODO
* ~~Setup empty git repo~~
* ~~Add *rails* application for server~~
* ~~Add *react-redux-starter-kit* application for client folder~~
* Develop client app, which contains game logic
  * ~~Add connect four route and relevant files, and remove default routes~~
  * ~~Add logic to determine if game is won~~
    * ~~Add logic to determine if won vertically~~
    * ~~Add logic to determine if won horizontally~~
    * ~~Add logic to determine if won diagonally~~
    * Only use api if logged in
  * Add logic for AI to make moves
    * ~~Add logic for AI to make defensive moves vertically~~
    * ~~Add logic for AI to make defensive moves horizontally~~
    * ~~Add logic for AI to make defensive moves diagonally~~
* Develop server app
  * serve JSON containing array
* BONUS
  * Bonus 1: Add hard mode
    * Logic searches for gaps between pieces that when filled in will result in game over, and AI places piece to prevent
  * Bonus 2: Persist games to a database
    * Have user able to log in and sign up
      * Able to click button to store game to database
