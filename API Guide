# REST API Guide



## Overview

There are two APIs. A production API and a development API. The production API is running
on a fixed version of the backend code. The development API experiences
live updates whenever backend code is changed. To call either API use one of
the following urls:
1. https://720phsp0e7.execute-api.us-east-1.amazonaws.com/dev
2. https://720phsp0e7.execute-api.us-east-1.amazonaws.com/prod

Inputs to the different methods are validated according to the Request JSON schema. The JSON
response schema are less accurate and will be updated later.


This guide is currently only for the [dev API](https://console.aws.amazon.com/apigateway/home?region=us-east-1#/apis/720phsp0e7/stages/dev). However, most of the info applies to the
prod API as well.

To view or edit the two API's go to [API Gateway stage section](https://console.aws.amazon.com/apigateway/home?region=us-east-1#/apis/720phsp0e7/stages)

To view or edit the latest JSON schemas go to [API Gateway schema section](https://console.aws.amazon.com/apigateway/home?region=us-east-1#/apis/720phsp0e7/models)

For more info on interpreting JSON schema read the [JSON schema guide](https://json-schema.org/draft/2019-09/json-schema-validation)

## NOTE! All userID queryStringParameters will be removed once authorization is enabled.

### Methods

#### /deletePost
/deletePost takes two queryStringParameters, the postID to be deleted and the
user that is doing the deleting. Note that users can only delete posts with userID matching the one submitted
* ```?postID=____&userID=____```

#### /getPopularHashtags
Returns a JSON object containing a list of recently used hashtags. Currently
this is total usages. At some point these will be ordered using a formula based
on the one used by reddit.

##### Response JSON schema
```JSON
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "get popular hashtags json",
  "type": "object",
  "properties": {
    "body": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  }
}
```

#### /newPost
To make a newPost send the endpoint a JSON object matching the following schema. Some
Notes on interpreting the schema are listed
1. A post must be either 10 words long or contain at-least one image
2. latitude and longitude must have at-least 4 decimal places and be a valid number
3. Location's that are incorrectly formatted (including empty objects) will be rejected
4. The post body must not contain more than 250 characters
5. The post must have a userID (___NOTE:___ this will be going away once auth is setup)

##### Request Body JSON schema
```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "New Post Schema",
  "type": "object",
  "properties": {
    "content": {
      "type": "string",
      "maxLength": 250
    },
    "location": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "longitude": {
          "type": "string",
          "pattern": "^-?[0-9]+\\.[0-9]{4,}$"
        },
        "latitude": {
          "type": "string",
          "pattern": "^-?[0-9]+\\.[0-9]{4,}$"
        }
      },
      "required": [
        "name",
        "longitude",
        "latitude"
      ]
    },
    "userID": {
      "type": "integer"
    },
    "images": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "maxItems": 5
    }
  },
  "required": [
    "userID"
  ],
  "minProperties": 2,
  "anyOf": [
    {
      "properties": {
        "content": {
          "type": "string",
          "minLength": 10
        }
      }
    },
    {
      "properties": {
        "images": {
          "type": "array",
          "minItems": 1
        }
      }
    }
  ]
}
```
##### Sample Request Body
___TODO___


#### /favouritePost

favouritePost takes two queryStringParameters the postID to favorite and the
user that is doing the favoriting.
* ```?postID=____&userID=____```



#### /getPosts

getPosts takes No parameters, One parameter or Three Parameters

* A blank query string or no parameters. This will fetch the most recent page of
posts.

* ```?startID=____``` where startID is a postID for pagination purposes

* ```?searchType=____&searchParameter=_____``` where the parameters are one of the following:
 * "TAG" and the name of a hashtag to get the most recent posts with the hashtag
 * "POST" and a postID to get a single post
 * "USER" and a userID to get the most recent posts by the user with userID
 * "FAV" and a userID to get the most recent posts favorited by the user with userID
 * "LOCATION" and a comma separated longitude latitude pair formatted as a string.
* ```?searchType=____&searchParameter=_____&startID=____``` same as above
but supply a postID to start paginating

##### Response JSON body schema
```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "Get Post Schema",
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "userID": {
        "type": "string"
      },
      "postID": {
        "type": "number"
      },
      "images": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "content": {
        "type": "string"
      },
      "location": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "latitude": {
            "type": "string"
          },
          "longitude": {
            "type": "string"
          }
        }
      },
      "timeUploaded": {
        "type": "string"
      }
      }
    }
  }
}
```
#### /getLocations
___TODO___ Fill this in

Just call it to get a list of locations formatted as strings
