import { BACKEND_SERVER, CENTRIFUGO_SERVER } from '../../../config';

var Centrifuge = require('centrifuge');
var centrifuge = new Centrifuge(CENTRIFUGO_SERVER);

fetch(BACKEND_SERVER, {
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
