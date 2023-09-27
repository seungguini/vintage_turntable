const SPOTIFY_API_URL = "https://api.spotify.com";

export const transferPlayback = (
  token: string,
  deviceId: string,
  shouldPlayOnTransfer: boolean = false
) : Promise<Response> => {
  return fetch(`${SPOTIFY_API_URL}/v1/me/player`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({device_ids: [deviceId], play: shouldPlayOnTransfer})
  });
};


export const getAvailableDevices = (
  token: string
) : Promise<SpotifyApi.UserDevicesResponse | null> => {
  return fetch(`${SPOTIFY_API_URL}/v1/me/player/devices`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  }).then((res : Response) => {
    if(res.status === 200) {
      return res.json()
    }
    return null;
  });
}