small-blog
==========

Implemented:

  * symfony backend
  * json rest-api
  * doctrine
  * single page application
  * CRUD for blog articles
  * twitter bootstrap

not implemented:

  * use css-preprocessors
  * no frontend framework used
  I've think about React+Redux, but it is not so simple and fast to bootstrap, as I haven't started any projects with this stack.
  Angular has some disadvantages, such as tight coupling with business logic.
  Decided to make almost VanillaJs SPA using JQuery. It is fast (but dirty) to achieve a prototype.
  Then rendering part can be rewritten to use React and after that Redux can be introduced.
  It will help to keep business and presentation logic simple after many iterations. 
  Current implementation should work without precompiling in all modern browsers.

things to do:

  * test in narrow screen and add design for mobile version
  * authorization token, for example, using OAuth
  * write unit tests for backend and client-side covering important logic
  * error handling
  * load 3rd party modules with bower or npm
  * js(x) preprocess
   

INSTALLATION:

    composer install
    php bin/console doctrine:database:create
    php bin/console doctrine:schema:create
    php bin/console server:start