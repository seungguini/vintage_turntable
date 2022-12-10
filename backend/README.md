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