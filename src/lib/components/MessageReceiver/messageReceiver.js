var Centrifuge = require('centrifuge');
var centrifuge = new Centrifuge('ws://127.0.0.1:8000/connection/websocket');

fetch('http://127.0.0.1:5000', {
  method: 'POST',
  body: JSON.stringify({
    'jsonrpc': '2.0',
    'id': 0,
    'method': 'get_centrifuge_token',
    'params': [+localStorage.getItem('userId')]
  })
})
  .then((response) => {
    response.json()
      .then((value => {
        // console.log(value);
        centrifuge.setToken(value.result);
        centrifuge.connect();
      }))
  });

export default centrifuge;
