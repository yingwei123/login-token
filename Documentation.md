How to Run program ->
Open up Node ->
Change directory to ServerSide -> npm start
-> open up a new tab and Change directory to client -> npm start

#I used nodemon, mongoose, express, bcrypt , body-parser, mongoose-timestamp

#Users Model
firstname : Firstname of user
lastname : Lastname of user
email : Email of User
password : Password of users

__________________

#UserSession Model
userId : Stores the user's Id to gain access to data via the token
timeStamp : Time of creation
isDeleted : Check to see if the token is valid or not(Whenever a user logs out the token is deleted and is no longer valid)

__________________

#Route, the purpose is to get all the users and check whats happening to the database when I post things

URL : '/user'

Method : GET

URL Parameters : none

Data Parameters : none

Success Response :
Code : 200
Content : {All the Users in the Database}

Error Response :
Code : 400

Sample call : http://localhost:3001/user

__________________

#Route, the purpose is to add a user to the database, it also encrypts the user's password to make it more secure

URL : '/signup'

Method : POST

URL Parameters : none

Data Parameters :
firstname : String
lastname : String
email : String
password : String

Success Response : 200

Error Response : 400

Sample call : http://localhost:3001/signup with firstname, lastname, email, password in raw data

__________________

#Route, the purpose is to check to see if the user is in the database, and if they are then give them a access token, the access token is the ID of the session which is made every time the user successfully logs in

URL : '/login'

Method : POST

URL Parameters : none

Data Parameters :
email : String
password : String

Success Response :
success: true,
message: "Valid Sign in",
token : Id of session

Error Response :
success : false,
message: 'Error : Server Error'

Sample call : http://localhost:3001/login with email and password in raw data

__________________

#Route, the purpose is to check to see if the user's token is valid or not
URL : '/verify'

Method : GET

URL Parameters : Token

Data Parameters : none

Success Response :
success : true,
message : 'Good'

Error Response :
success: false,
message : 'Error : Server Error'

Sample call : http://localhost:3001/verify?token=thetoken

__________________

#Route, the purpose is to update the access token to be deleted so it is no longer valid to use to get dataa

URL : '/logout'

Method : GET

URL Parameters : Token

Data Parameters : none

Success Response :
success : true,
message : 'Good'

Error Response :
success : false,
message : 'Error : Server Error'

Sample call : http://localhost:3001/logout?token=thetoken

__________________

#Route, the purpose is to check the amount os sessions i have in the database and check to see if it was updating correctly

URL : '/sessions'

Method : GET

URL Parameters : None

Data Parameters : None

Success Response :
Content = All the sessions in the Database
Response :   
success : true,
message : 'Good'

Error Response :
success : false,
message: 'Error : Server Error'

Sample call : http://localhost:3001/sessions


__________________

#Route, the purpose is to use the user's access token to access their data, it makes it more secure

URL : '/data'

Method : GET

URL Parameters : Token

Data Parameters : none

Success Response :
Status : 200
Content : User

Error Response :
message: "System Error"
message: "Error : Session is Over"

Sample call : http://localhost:3001/data?token=sometoken

__________________
