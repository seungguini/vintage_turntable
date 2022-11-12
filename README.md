# Vintage turntable

A 3-dimensional record player simulator with various audio integrations, including [Spotify](https://open.spotify.com/). Made with [React Three Fiber](https://github.com/pmndrs/react-three-fiber), [react-spring](https://react-spring.dev/) and [Blender](https://www.blender.org/).

## Getting Started

To run the project on your local environment, clone the project.

The `frontend/` and `backend/` directories are two separate Node projects. Check out how to run the [frontend](https://github.com/seungguini/vintage_turntable/tree/master/frontend#readme) and [backend](https://github.com/seungguini/vintage_turntable/tree/master/backend#readme).

## Collaboration

### Current Collaborators

- Seunggun Lee
- Justin Chen

We'd love to collaborate!

The _3D models_ and _static resources_ used in the website are not included in the repository for copyright reasons. Please contact Seunggun or open an [Issue](https://github.com/seungguini/vintage_turntable/issues) and request the models in order to collaborate.

For further questions, please open an [Issue](https://github.com/seungguini/vintage_turntable/issues).

## Additional Features

### Front End

- Add multiple royalty-free music + create playlist functionality
- Implement previous / next music skip functionality
- Implement mute v. unmute functionality
- Show album picture on record
- Animate album picture leaving screen and returning with new album picture when skipping songs
- Animate tone arm moving closer to the center with song progression

### Back End

- Connect [Spotify API](https://developer.spotify.com/documentation/web-api/) & [Apple Music API](https://developer.apple.com/documentation/applemusicapi/) to allow playback with Vintage Turntable.
- Implement login funcitonality for the third-party music providers
- Provide song metadata to the front end
- Implement caching for login information
