# myapp
This is a Node.js app that will run on localhost:8888

# pre-install
Node.js https://nodejs.org/en/download/
postman https://chrome.google.com/webstore/detail/tabbed-postman-rest-clien/coohjcphdfgbiolnekdpbcijmhambjff?hl=en

# set up
1. git clone https://github.com/JackyRoss/myapp.git
2. cd place_that_you_clone_this_repository
3. npm install
4. node server.js

# api list
- GET /favorites 
  - return that the user has previously favoritted.
- POST /favorite/:id 
  - add a favorite movie
- GET /movies?search={search} 
  - return popular movies or what the user searched for
- GET /movies/:id - return that specific movie in detail
  - return that specific movie in detail

# how to test
- GET /favorites 
  - open postman
  - inut the url : http://localhost:8888/favorites
- POST /favorite/:id 
  - open postman
  - inut the url : http://localhost:8888/favorite
  - add parameters as below:
    - ![image](https://user-images.githubusercontent.com/40786702/115745377-559ee800-a3ce-11eb-8d9f-164a4d2c54e1.png)
- GET /movies?search={search}
  - open postman
  - inut the url : http://localhost:8888/movies?search=Select Movie.name, Movie.showTime, Movie.madeIn, Movie.language From Movie INNER JOIN Popular on Movie.id = Popular.id
  - inut the url : http://localhost:8888/movies?search=
- GET /movies/:id - return that specific movie in detail 
  - open postman
  - inut the url : http://localhost:8888/movies/6
