Book: [List books](#list-books), [Query books](#query-books), [Get a book](#get-a-book), [Create a book](#create-a-book), [Update a book](#update-a-book), [Delete a book](#delete-a-book)

Review: [Create a review](#create-a-review), [Update a review](#update-a-review), [Delete a review](#delete-a-review), 

## List books

> List all books.

**GET** /books

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

**GET** /books?q={queryString}

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

**GET** /books/:id

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

> Create a book.

**POST** /books

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

> Update the details of the book.

**PUT** /books/:id

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

> Delete a book

**Delete** /books/:id

##### Response

```
Status: 200
```



## Create a review

> Create a review.

**POST** books/:id/reviews

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

> Update the details of the review.

**PUT** /reviews/:reviewId

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

> Delete a review.

**Delete** /reviews/:reviewId

##### Response

```
Status: 200
```