import React, { useEffect, useState } from "react"
import { 
  SS_ACCESS_TOKEN_KEY, 
  SS_REFRESH_TOKEN_KEY,
  SS_DEVICE_ID_KEY,
  BACKEND_DEV_URL } from "./utils/constants";

import { useSpotifyActions, useSpotifyPlayer } from "./states/spotifyPlayerStore";
import { getAvailableDevices } from "./utils/spotifyClient";
import { usePlaybackActions } from "./states/playbackStore";

export default function SpotifyPlayer() {

  const { setPlayer, setIsCurrentDeviceActive } = useSpotifyActions();
  const player : Spotify.Player | null = useSpotifyPlayer();
  const { play, pause } = usePlaybackActions();

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

  const getDevices = () => {

    const accessToken = localStorage.getItem(SS_ACCESS_TOKEN_KEY);

    if(!accessToken) {
      console.log("Spotify Access Token Empty");
      return;
    }
    getAvailableDevices(accessToken)
    .then((data: SpotifyApi.UserDevicesResponse | null) => {
      if(!data) {
        return;
      }

      if(data.devices.length === 0) {
        // No devices playing.
        return;
      }

      data.devices.forEach((device : SpotifyApi.UserDevice) => {
        console.log(device);
      });
    })
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
            sessionStorage.setItem(SS_DEVICE_ID_KEY, device_id);
            console.log('Ready with Device ID', device_id);
        });

        player.addListener('not_ready', ({ device_id } : any) => {
            console.log('Device ID has gone offline', device_id);
        });

        player.addListener('player_state_changed', (
          playbackPlayer: Spotify.PlaybackState
        ) => {
          if(!playbackPlayer) return;
          if(playbackPlayer.loading) return;
          if(playbackPlayer.paused && playbackPlayer.playback_id.length === 0) return;

          if(playbackPlayer.paused) {
            // Invoke pause animation
            pause()
            // setIsCurrentDeviceActive(false);
            console.log("Play from remote pause");
            // pauseAnimation();
          } else {
            // Invoke play animation
            play()
            console.log("Play from remote play");
          }

          console.log(playbackPlayer);
        })

        player.on('authentication_error', ({ message }) => {
          console.log('Failed to authenticate: Attempting to reauthenticate');
          refreshToken()
        });

        await player.connect();
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
      <button onClick={getDevices}>Get Devices</button>
      <button onClick={refreshToken}>Refresh</button>
    </div>
  );
}
