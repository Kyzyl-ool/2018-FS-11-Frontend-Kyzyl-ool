export const mockMessages = {};
export const chatNames = {};
export const formData = {};


if (localStorage.getItem('userId'))
fetch('http://127.0.0.1:5000', {
  method: 'POST',
  body: JSON.stringify({
    'jsonrpc': '2.0',
    'id': 0,
    'method': 'get_chats',
    'params': [localStorage.getItem('userId')],
  })
})
  .then((response) => {
    response.json()
      .then(value => {
        var i = 0;
        var chat_ids = [];
        while(value.result[i]) {
          chat_ids.push(value.result[i].chat_id);
          i++;
        }


        fetch('http://127.0.0.1:5000', {
          method: 'POST',
          body: JSON.stringify(
            chat_ids.map(((value1) => {
              return {
                'jsonrpc': '2.0',
                'id': value1,
                'method': 'get_messages',
                'params': [+value1]
              }
            }))
          )
        })
          .then((response) => {
            response.json()
              .then((value1 => {
                // console.log(value1);
                value1.forEach((resp) => {
                  mockMessages[resp.id] = [];
                  let  j = 0;
                  while (resp.result[j]) {
                    mockMessages[resp.id].push(
                      {
                        text: resp.result[j].content,
                        time: new Date(resp.result[j].sent).toLocaleTimeString(),
                        user_id: resp.result[j].user_id,
                        spanText: 'Delivered'
                      }
                    );
                    j++;
                  }
                })


              }))
          })




      })
  });

