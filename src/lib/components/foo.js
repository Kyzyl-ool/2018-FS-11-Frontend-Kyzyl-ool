import { BACKEND_SERVER } from '../../config';

function foo(id, text, spanText, file, time){
  if (file) {
    console.log(file);
    const reader = new FileReader();
    reader.onload = (value) => {
      fetch(BACKEND_SERVER, {
        method: 'POST',
        body: JSON.stringify({
          'jsonrpc': '2.0',
          'id': 0,
          'method': 'upload_file',
          'params': [btoa(reader.result), file.name],
        })
      })
        .then((response) => {
          response.json()
            .then(value => {
              console.log(value);
            })
        });
    };

    reader.readAsBinaryString(file);


    fetch(BACKEND_SERVER, {
      method: 'POST',
      body: JSON.stringify({
        'jsonrpc': '2.0',
        'id': 0,
        'method': 'new_file_message',
        'params': [+id, +localStorage.getItem('userId'), text, file.name, file.type, file.size, time],
      })
    })
      .then((response) => {
        response.json()
          .then((value => {
            console.log(value);



            // return value.result.code === 200 ? 'Delivered' : 'ERROR';

          }))
      })



  }
  else {
    fetch(BACKEND_SERVER, {
      method: 'POST',
      body: JSON.stringify({
        'jsonrpc': '2.0',
        'id': 0,
        'method': 'new_message',
        'params': [+id, +localStorage.getItem('userId'), text, time],
      })
    })
      .then((response) => {
        return response.json()
          .then((value) => {
            console.log(value);

            // return value.result.code === 200 ? 'Delivered' : 'ERROR';
            // dispatch({
            //   type: actionTypes.MESSAGE_DELIVERED,
            //   payload: {
            //     message_id:
            //   }
            // })
          });
      });

  }
}

export default foo;
