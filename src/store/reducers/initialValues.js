export const chatNames = [
  'Chat1',
  'Chat2',
  'Chat3'
];

export const amountOfUnreadMessages = [
  1,
  1,
  1,
];

export const mockMessages = [
  [
    {
      text: 'Hello',
      time: new Date().toLocaleTimeString(),
      spanText: 'Delivered',
    },
    {
      text: '#Hello =)',
      time: new Date().toLocaleTimeString(),
      spanText: 'Delivered',
    }
  ],
  [
    {
      text: 'Hi',
      time: new Date().toLocaleTimeString(),
      spanText: 'Delivered',
    },
    {
      text: '#Who are you?',
      time: new Date().toLocaleTimeString(),
      spanText: 'Delivered',
    }
  ],
  [
    {
      text: 'Привет',
      time: new Date().toLocaleTimeString(),
      spanText: 'Delivered',
    },
    {
      text: '#Здарова)',
      time: new Date().toLocaleTimeString(),
      spanText: 'Delivered',
    }
  ],
];

fetch('http://127.0.0.1:5000', {
  method: 'POST',
  body: JSON.stringify({
    'jsonrpc': '2.0',
    'id': 0,
    'method': 'get_messages',
    'params': [2, +localStorage.getItem('userId')],
  })
})
  .then((response) => {
    response.json()
      .then(value => {
        console.log(value);
        let i = 0;
        while(value.result[i]) {
          mockMessages[2].push({
            text: value.result[i].content,
            time: new Date(value.result[i].sent).toLocaleTimeString(),
            spanText: 'Delivered',
          });
          i++;
        }
      })
  });




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
        let i = 0;
        while(value.result[i]) {
          i++;
        }
        localStorage.setItem('amountOfChats', i);
      })
  });

export const formData = new Array(+localStorage.getItem('amountOfChats'));
for (var i = 0; i < formData.length; i++) {
  formData[i] = {
    text: '',
    file: undefined
  };
}
