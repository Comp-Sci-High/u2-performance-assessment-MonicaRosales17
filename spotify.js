const clientId = "37434e9a9708498cb0437cc41811d6d4";
const redirectUri = "https://www.compscihigh.org/";
const scopes = [
  "ugc-image-upload",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "app-remote-control",
  "streaming",
  "playlist-read-private",
  "playlist-modify-public",
  "playlist-modify-private",
  "playlist-read-collaborative",
  "user-follow-modify",
  "user-follow-read",
  "user-library-modify",
  "user-library-read",
  "user-read-email",
  "user-read-private",
  "user-top-read",
  "user-read-recently-played",
  "user-read-playback-position",
].join("%20");

const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}`;

console.log("Authorize your app by visiting this URL:", authUrl);

async function getSpotifyToken(authCode) {
  const client_id = "37434e9a9708498cb0437cc41811d6d4";
  const client_secret = "fe11b2a2a53249339e882a077a67deef";
  const redirectUri = "https://www.compscihigh.org/"; // Must match the one in the auth URL

  const authOptions = {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: authCode,
      redirect_uri: redirectUri,
    }),
  };

  try {
    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      authOptions
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Error: ${data.error_description}`);
    }

    console.log("Access token:", data.access_token);
    console.log("Refresh token:", data.refresh_token);
    return data;
  } catch (error) {
    console.error("Error fetching token:", error);
  }
}

getSpotifyToken(
  "AQBlnFNM97PXH4WfPinKZB6fqA9yhET26Ewjgyw6Z0bwomajqFjxYXZcgjt2Z-MEHhVVZR9q_-nTvwf0ZUS3epZLrPAnWpIZyfe9xCGPmwuUVcI0GFlYJt5JB9au84DjWttoc4MXzXHJCjcv_nv9ol51HryA3nxAyGEp_4VzueGLswujXd0eIp-E5d7kIS7BoQVJ6x2D_l_SYelzZ-qHVySczh-iicnL4amHdN-NWqT57AL5awxSA3q5ZUuerSuZ75CGb-Y6ISfxiETMHMEBNU_qhIFQjsRE05-d1GTac6_O4KVAA5SXnE2WCtZQZprariC7U80eftop4oxpZiieydzM0g1jTD0Ur3HinqtBDLIgaL7P19ml7J65Pfu-k54Lo-xa435GXnZuvyJzRQtutcb6mJuzNqnCtgr6PQuxCoa1owtLIrfJqpR4bfMenJxU79GAS7p19vSm0sltLJQlyfs77AI5NQm0GdAyL7Io6OuMsIm0bSzbFF-3gzTvv4p7960nniwxxdoV8PmnhXF6n3B5balQKy8wgJHuZ2LKyVkz6Lh83snlqLp_qpn-OaJ_z1lOCCJT3Lmnzt8luOyUxoJk88scsH5y1xZAcCQqQoEH-ie3faMlE6v_p7ZiOzdfwj0REvY8v9bADQnA6ajLmrd9tBqkOta6JiAw9LJuL68Pbj_IJCoYgNlGh2GAZYG0hA1boJfKgyqIedMiwfRiW7N3"
);