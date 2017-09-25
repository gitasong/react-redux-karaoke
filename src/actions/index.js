import * as types from "./../constants/ActionTypes";
import v4 from "uuid/v4";

export const nextLine = (songId) => ({
  type: types.NEXT_LINE,
  songId
});

export const restartSong = (songId) => ({
  type: types.RESTART_SONG,
  songId
});

export const selectSong = (songId) => ({
  type: types.SELECT_SONG,
  songId
});

export function fetchSongId(title) {
  return function (dispatch) {
    const localSongId = v4();
    dispatch(requestSong(title, localSongId));
    title = title.replace(" ", "_");
    return fetch("http://api.musixmatch.com/ws/1.1/track.search?&q_track=" + title + "&page_size=1&s_track_rating=desc&apikey=2262c7163b127df8ac11b4a0a5cc3965").then(
      response => response.json(),
      error => console.log("An error occured.", error)
    ).then(function(json) {
      if (json.message.body.track_list.length > 0) {
        const musicMatchId = json.message.body.track_list[0].track.track_id;
        const artist = json.message.body.track_list[0].track.artist_name;
        const title = json.message.body.track_list[0].track.track_name;
        fetchLyrics(title, artist, musicMatchId, localSongId, dispatch);
      } else {
        console.log("We couldn't locate a song under that ID!");
      }
    });
  };
}

export function fetchLyrics(title, artist, musicMatchId, localSongId, dispatch) {
  return fetch("http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=" + musicMatchId + "&apikey=2262c7163b127df8ac11b4a0a5cc3965").then(
    response => response.json(),
    error => console.log("An error occurred.", error)
  ).then(function(json) {
    console.log("HEY WOW, A SECOND API RESPONSE!", json);
  });
}

export const requestSong = (title, localSongId) => ({
  type: types.REQUEST_SONG,
  title,
  songId: localSongId
});

export const receiveSong = (title, artist, songId, songArray) => ({
  type: types.RECEIVE_SONG,
  songId,
  title,
  artist,
  songArray,
  receivedAt: Date.now()
})
