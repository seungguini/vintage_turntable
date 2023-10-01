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
