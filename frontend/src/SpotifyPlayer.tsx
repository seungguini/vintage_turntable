import React, { useEffect, useState } from "react"
import { 
  SS_ACCESS_TOKEN_KEY, 
  SS_REFRESH_TOKEN_KEY, 
  BACKEND_DEV_URL } from "./utils/constants";

import { useSpotifyActions } from "./states/spotifyPlayerStore";

export default function SpotifyPlayer() {

  const { setPlayer } = useSpotifyActions();

  const refreshToken = () => {
    const url = `${BACKEND_DEV_URL}api/spotify/refresh_token`;

    const refreshToken = localStorage.getItem(SS_REFRESH_TOKEN_KEY);

    if(refreshToken) {
      fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh_token: refreshToken
        })
      })
      .then((response) => response.json())
      .then((data) => {
        if(data.accessToken && data.refreshToken) {
          const accessToken = data.accessToken
          const refreshToken = data.refreshToken
  
          localStorage.setItem(SS_ACCESS_TOKEN_KEY, accessToken);
          localStorage.setItem(SS_REFRESH_TOKEN_KEY, refreshToken);
  
          invokeSpotifyPlayer();
        } else {
          console.error(data);
        }
      }).catch((err) => {
        console.error("Failure with ", err)
      })
    }
  }

  const loadSpotifyPlayer = () : Promise<void> => {

    // Need to load script of spotify player
    // and to do so we wrap the function in a promise.
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');

      script.id = 'spotify-player';
      script.type = 'text/javascript';
      script.async = false;
      script.defer = true;
      // Async request, but need to load script
      script.src = 'https://sdk.scdn.co/spotify-player.js';

      document.head.appendChild(script);

      script.onload = () => {
        resolve();
      }
      script.onerror = (error: any) => reject(new Error(`loadScript: ${error.message}`));
    });
  }

  const invokeSpotifyPlayer = () => {
    const accessToken = localStorage.getItem(SS_ACCESS_TOKEN_KEY);

    if(!accessToken) {
      console.log("Spotify Access Token Empty");
      return;
    }

    window.onSpotifyWebPlaybackSDKReady = async () => {

        const player : Spotify.Player = new window.Spotify.Player({
            name: 'Turntable Web Player',
            getOAuthToken: (cb : any)=> { cb(accessToken); },
            volume: 0.5
        });

        player.addListener('ready', ({ device_id } : any) => {
            console.log('Ready with Device ID', device_id);
        });

        player.addListener('not_ready', ({ device_id } : any) => {
            console.log('Device ID has gone offline', device_id);
        });

        player.on('authentication_error', ({ message }) => {
          console.log('Failed to authenticate: Attempting to reauthenticate');
          refreshToken()
        });

        await player.connect().then((isConnected: boolean) => {
          if(isConnected) {
            player.activateElement();
          }
        });
        // await player.pause();
        setPlayer(player);
    };
  }

  useEffect(() => {
    loadSpotifyPlayer().then(() => {
      invokeSpotifyPlayer();
    });
  }, []);

  return(
    <div>
      {/* <button onClick={refreshToken}>Refresh</button> */}
    </div>
  );
}
