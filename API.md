Book: [List books](#list-books), [Query books](#query-books), [Get a book](#get-a-book), [Create a book](#create-a-book), [Update a book](#update-a-book), [Delete a book](#delete-a-book)

Review: [Create a review](#create-a-review), [Update a review](#update-a-review), [Delete a review](#delete-a-review), 

## List books

> List all books.

**GET** /api/books

**Response**

```
Status: 200
```

```js
[
    {
        "_id": "626644f1f89d4513c6829771",
        "title": "Great Circle: A novel",
        "author": "Maggie Shipstead",
        "image": "https://m.media-amazon.com/images/I/41idnBvdLML.jpg",
        "price": 16.26,
        "description": "After being rescued...",
        "creator": "626644f0f89d4513c6829761",
        "reviews": [],
        "__v": 0
    },
    {
        "_id": "626644f1f89d4513c6829763",
        "title": "The Lincoln Highway: A Novel",
        "author": "Amor Towles",
        "image": "https://m.media-amazon.com/images/I/51wH91YObNL.jpg",
        "price": 18,
        "description": "In June, 1954...",
        "creator": "626644f0f89d4513c6829761",
        "reviews": [],
        "__v": 0
    }
]
```



## Query books

> Find the books with titles that contain the queryString.

**GET** /api/books?q={queryString}

**Response**

```
Status: 200
```

```js
[
    {
        "_id": "626644f1f89d4513c6829771",
        "title": "Great Circle: A novel",
        "author": "Maggie Shipstead",
        "image": "https://m.media-amazon.com/images/I/41idnBvdLML.jpg",
        "price": 16.26,
        "description": "After being rescued...",
        "creator": "626644f0f89d4513c6829761",
        "reviews": [],
        "__v": 0
    },
    {
        "_id": "626644f1f89d4513c6829763",
        "title": "The Lincoln Highway: A Novel",
        "author": "Amor Towles",
        "image": "https://m.media-amazon.com/images/I/51wH91YObNL.jpg",
        "price": 18,
        "description": "In June, 1954...",
        "creator": "626644f0f89d4513c6829761",
        "reviews": [],
        "__v": 0
    }
]
```



## Get a book

> Get the details of the book.

**GET** /api/books/:id

**Response**

```
Status: 200
```

```
{
    "_id": "626644f1f89d4513c6829771",
    "title": "Great Circle: A novel",
    "author": "Maggie Shipstead",
    "image": "https://m.media-amazon.com/images/I/41idnBvdLML.jpg",
    "price": 16.26,
    "description": "After being rescued as infants...",
    "creator": {
        "_id": "626644f0f89d4513c6829761",
        "username": "Harold"
    },
    "reviews": [],
    "__v": 0
}
```



## Create a book

> Create a book. (User has to be logged in to create a book.)

**POST** /api/books

**Parameters**

| Name | Type   |
| ---- | ------ |
| book | object |

Example: 

```js
{	book: {
		"title": "Great Circle: A novel",
		"author": "Maggie Shipstead",
		"image": "https://m.media-amazon.com/images/I/41idnBvdLML.jpg",
		"price": 16.26,
		"description": "After being rescued...",
	}
}
```

##### Response

```
Status: 200
```



## Update a book

> Update the details of the book. (Only the entry creator could update the book.)

**PUT** /api/books/:id

**Parameters**

| Name | Type   |
| ---- | ------ |
| book | object |

Example: 

```js
{	book: {
		"title": "Great Circle: A novel",
		"author": "Maggie Shipstead",
		"image": "https://m.media-amazon.com/images/I/41idnBvdLML.jpg",
		"price": 16.26,
		"description": "After being rescued...",
	}
}
```

##### Response

```
Status: 200
```



## Delete a book

> Delete a book. (Only the entry creator could delete the book.)

**Delete** /api/books/:id

##### Response

```
Status: 200
```



## Create a review

> Create a review. (User has to be logged in to post a review.)

**POST** /api/books/:id/reviews

**Parameters**

| Name   | Type   |
| ------ | ------ |
| review | object |

Request Example: 

```js
{	review: {
		"rating": 5,
		"author": "Excellent!",
	}
}
```

##### Response

```
Status: 200
```



## Update a review

> Update the details of the review. (Only the entry creator could update the review.)

**PUT** /api/reviews/:reviewId

**Parameters**

| Name   | Type   |
| ------ | ------ |
| review | object |

Example: 

```js
{	review: {
		"rating": 5,
		"author": "Excellent!",
	}
}
```

##### Response

```
Status: 200
```



## Delete a review

> Delete a review. (Only the entry creator could delete the review.)

**Delete** /api/reviews/:reviewId

##### Response

```
Status: 200
```