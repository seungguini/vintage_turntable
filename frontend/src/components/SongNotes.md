State - Song list, songPlaying

## Song Component

Song Component = {

}

- generalizable to music type (ie. local mp3 files, Spotify, Apple Music (?))
- title
- artist
- album name
- album picture

**Song**

- SongInfo (generalizable) (multiple exists ... for displaying song info)
- SongPlayer (specific to platform)
  - SpotifyPlayer
  - LocalPlayer
  - AppleMusicPlayer

mp3.

streamer.play()
.pause()

## Song Data

Queue Data - JSON : [
{
"title": "1",
"song" : "abc.mp3"
}, {
"title": "2",
"song" : "spotify_id_uri"
}, {
"title": "3"
},
]
