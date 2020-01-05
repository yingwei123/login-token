# I used react, material-ui/core, redux-router-dom

#App -> displays Auth

#Auth -> checks to see if the user is logged in or not, if they aren't it will display the signup and log in page only. When the user is logged in, they gain access to the rest of the website, they can get data using the access token. There is also an option to log out which gets rid of the access token and sends you back to login and sign up page

#Content -> content is only displayed when user is logged in(they have a token)

#UserData -> getting user data using the access token
