# Project 3 - Review App

##### Group: Jie Meng, Lingna Li, Yongjiang Yu

To seed the database, run seeds/seeds.js.

To start the *development* environment, run "devstart" script.

To start the *production* environment, run "start" script.

## Back End

#### [API](API.md)

> Check API Docs on the API page.

#### Schemas

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

#### Authentication

Users are authentied using sessions. After logging in, the user's _id would be stored in the session.

#### Validation middlewares

**Joi** library is installed for data validation. The json object would be validated before saving to the database.
isLoggedIn() middleware would check user's authorization. If the user is not logged in, a 401 status would be returned.
The book and the review's creator would be validated before deletion or update.

#### Security

Sessions are encrypted and stored in mongoDB using **connect-mongo** library. 
Passwords are hashed using **bcrypt** library.

#### Error handling

Each async function is wrapped in an asyncWrapper() to catch the errors.
The ExpressError class could customize error statusCode and message.
In the end, the default error handler middleware would send the response.

## Front End