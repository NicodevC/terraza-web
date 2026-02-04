
export default async function handler(req, res) {
  const { code } = req.query;

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        code,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error(data.error);
      res.status(500).send(`Error: ${data.error_description}`);
      return;
    }

    const content = `
      <script>
        (function() {
          function receiveMessage(e) {
            console.log("Received message:", e.data);
            if (e.data.indexOf("authorizing:github") >= 0) {
              window.opener.postMessage(
                'authorization:github:success:${JSON.stringify({
                  token: data.access_token,
                  provider: 'github',
                })}',
                e.origin
              );
              window.removeEventListener("message", receiveMessage, false);
            }
          }
          window.addEventListener("message", receiveMessage, false);
          window.opener.postMessage("authorizing:github", "*");
        })()
      </script>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.send(content);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
