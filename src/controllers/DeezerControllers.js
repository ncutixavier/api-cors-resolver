import axios from 'axios';

// let redirect_uri = 'http://localhost:8005/api/v1/deezer';
// let client_uri = 'http://localhost:3000';
let redirect_uri = 'https://leave-app-sys.herokuapp.com/api/v1/deezer';
let client_uri = 'https://jammming-ncuti.netlify.app/';
const app_id = 511302;
const secret_key = '4ec83554df8ddb834eb35bd17192c2d1';

class DeezerControllers{
  static login(req, res) {
    const code = req.query.code;
    axios
      .get(
        `https://connect.deezer.com/oauth/access_token.php?app_id=${app_id}&secret=${secret_key}&code=${code}`
      )
      .then((response) => {
        let token = response.data.match(/access_token=([^&]*)/);
        console.log(response.data);
        res.redirect(`${client_uri}?token=${token[1]}`);
      })
      .catch((error) => res.send(error));
  }

  static auth(req, res) {
    res.redirect(
      `https://connect.deezer.com/oauth/auth.php?app_id=${app_id}&redirect_uri=${redirect_uri}&perms=basic_access,email,manage_library`
    );
  }

  static search(req, res) {
    const term = req.query.term;
    axios
      .get(`https://api.deezer.com/search?q=${term}`)
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static getUser(req, res) {
    let token = req.query.token;
  axios
    .get(`https://api.deezer.com/user/me?access_token=${token}`)
    .then((response) => res.send(response.data))
    .catch((error) => res.send(error));
  }

  static createPlaylist(req, res) {
    let user_id = req.query.userid;
    let token = req.query.token;
    let playlist_name = req.query.name;
    let songs = req.query.songs;

    axios
      .post(
        `https://api.deezer.com/user/${user_id}/playlists?title=${playlist_name}&access_token=${token}`
      )
      .then((response) => {
        return axios
          .post(
            `https://api.deezer.com/playlist/${response.data.id}/tracks?songs=${songs}&access_token=${token}`
          )
          .then((response) => res.send(response.data))
          .catch((error) => {
            res.send(error);
          });
      })
      .catch((error) => {
        res.send(error);
      });
  }

}

export default DeezerControllers

