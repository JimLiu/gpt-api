# GPT APIs

Build APIs for GPT

## ✨ Features

- URL to Markdown

## 💁‍♀️ How to use

- Install dependencies `npm i`

## Test from local

```
$ npm run dev
```

`http://localhost:3333/api/url2md?url=https://baoyu.io`

## Authentication for your APIs

Add environment variable `BEARER_TOKENS` if you want to add authentication for your API requests, split mutiple tokens with `,`.

```
BEARER_TOKENS=ABC,DEF
```

it will allow the requests with header

```
Authorization: Bearer ABC
```

or

```
Authorization: Bearer DEF
```

## Deploy to production

### Railway

- Connect to your Railway project `railway link`
- Start the development server `railway run yarn dev`

### Vercel

[Deploying to Vercel](https://vercel.com/docs/deployments/overview)

## Config for OpenAI

Add a new action for you GPT, this is an example for you Schema:

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "Fetch page content",
    "description": "Retrieves the page data for a url.",
    "version": "v1.0.0"
  },
  "servers": [
    {
      "url": "https://<YOUR API HOST>"
    }
  ],
  "paths": {
    "/api/url2md": {
      "get": {
        "description": "Get page content for a specific url",
        "operationId": "GetPageContentByUrl",
        "parameters": [
          {
            "name": "url",
            "in": "query",
            "description": "The page url to retrieve the content for",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "deprecated": false
      }
    }
  },
  "components": {
    "schemas": {}
  }
}
```

## Who is using this?

- [科技文章翻译 GPT](https://chat.openai.com/g/g-uBhKUJJTl-ke-ji-wen-zhang-fan-yi)
- [TweetReader GPT](https://chat.openai.com/g/g-jQyjBVVhg-tweetreader)
