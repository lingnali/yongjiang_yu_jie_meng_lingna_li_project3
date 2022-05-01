# Project 3 - Review App

##### Group: Jie Meng, Lingna Li, Yongjiang Yu

To seed the database, run seeds/seeds.js (from the root folder).

To start the *development* environment, run "devstart" script.

### [Project Writeup](./writeup.md)

## Back End

### [API](API.md)

> Check API Docs on the API page.

### Schemas

```js
const bookSchema = new Schema({
  title: String,
  author: String,
  image: String,
  price: Number,
  description: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});
const reviewSchema = new Schema({
  body: String,
  rating: Number,
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
```

### Authentication

Users are authenticated using sessions. After logging in, the user's _id would be stored in the session.

### Validation middlewares

**Joi** library is installed for data validation. The json object would be validated before saving to the database.  
isLoggedIn() middleware would check user's authorization. If the user is not logged in, a 401 status would be returned.  
The book and the review's creator would be validated before deletion or update.

### Security

Sessions are encrypted and stored in mongoDB using **connect-mongo** library.   
Passwords are hashed using **bcrypt** library.   
Environment variables are stored in the .env file to keep the info secure.

### Error handling

Each async function is wrapped in an asyncWrapper() to catch the errors.  
The ExpressError class could customize error statusCode and message. Different APIs could set their own errors messages.  
In the end, the default error handling middleware would send the response.



## Front End

### Main components

*Books* is the index page. It renders a list of *Book*.   *BookDetail* contains the details of a book.  
There are three forms for user's input: *BookForm* , *ReviewForm* and *UserForm* 

The **react-hook-form** library is used to handle form inputs and validation.  
The **react-rating-stars-component** library is used to render rating stars.

The *AuthContext* stores all the login states. In the Header, the app would call "/api/authenticate" to authenticate the user on refresh.

### Error handling

There is an *Error* component which would render the error message for each page.  
All undefined urls are redirected to the *Error* page.

