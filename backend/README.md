# Backend

I purposely made the backend not connect with the frontend.
For now you can manually get the access token in the steps below.

## Getting Started

Ensure you have `node v18.12.1` and `npm v9.1.1` installed

1. `npm i`
1. `touch .env`
- Either ask Justin for the environment variables or you can setup on your own spotify account.
- If you are setting up on your own account, make sure to set your callback to `${BASE_URL}/api/spotify/callback` Ex. `http://localhost:8000/api/spotify/callback`

- Example .env
```.env
SPOTIFY_CLIENT_SECRET="your_client_secret_here"
SPOTIFY_CLIENT_ID="your_client_id"
```

3. `npm start` 

## Getting The Spotify Access Token

1. In your browser, type in `localhost:8000/api/spotify/login`
2. Go through the login. When finished, you will end up in the `/statusCheck` route
3. In browser, type in `localhost:8000/api/spotify/token` to get access token.
- The session is set to one hour, so the data will persist for one hour.

## Environment Variables

There are a list of environment variables to consider.

These are used to set the appriopriate backend and frontend urls which are very important for spotify authentication.

`NODE_ENV`: Controls the environment of the service. Has three potential values: "dev" | "staging" | "prod"

Frontend env urls keys
```.env
FRONTEND_PROD_URL: string
FRONTEND_STAGING_URL: string
FRONTEND_DEV_URL: string || "http://localhost:3000"
```

Backend env urls keys
```.env
BACKEND_PROD_URL: string
BACKEND_STAGING_URL: string
BACKEND_DEV_URL: string || "http://localhost:8000"
```

## Tests

Unit tests uses dependencies 
1. Mocha
2. Chai
3. Sinon

All mocha configs are in the [.mocharc.json](./.mocharc.json) file. The configs are used mainly to use typescript in tests.

More info for [ts-node mocha](https://typestrong.org/ts-node/docs/recipes/mocha/)