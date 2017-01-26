# connect-four
A game of connect four, written in rails and react-redux

## Technologies
I chose to use existing frameworks to facilitate speed of development.

* Client - [React-Redux-Starter-Kit](https://github.com/davezuko/react-redux-starter-kit)

### Why React-Redux-Starter-Kit?
I chose to use the React-Redux-Starter-Kit to speed up my development time. The starter kit already contains a sophisticated webpack build system already setup with a bunch of useful features, such as hot reloading, SCSS, unit testing, and more.

## TODO
* ~~Setup empty git repo~~
* ~~Add *react-redux-starter-kit* application for client folder~~
* ~~Develop client app, which contains game logic~~
  * ~~Add connect four route and relevant files, and remove default routes~~
  * ~~Add logic to determine if game is won~~
    * ~~Add logic to determine if won vertically~~
    * ~~Add logic to determine if won horizontally~~
    * ~~Add logic to determine if won diagonally~~
  * ~~Add logic for AI to make moves~~
    * ~~Add logic for AI to make defensive moves vertically~~
    * ~~Add logic for AI to make defensive moves horizontally~~
    * ~~Add logic for AI to make defensive moves diagonally~~
* BONUS
  * Bonus 1: Add hard mode
    * Add logic for AI to make offensive moves vertically
    * Add logic for AI to make offensive moves horizontally
    * Add logic for AI to make offensive moves diagonally
  * Bonus 2: Persist games to a database
    * Develop server app
      * Have user able to log in and sign up
        * Able to click button to store game to database
        * connect client app to server app
