import { BACKEND_SERVER } from '../../config';

async function foo(id, text, spanText, file, time) {
  if (file) {
    console.log(file);
    const reader = new FileReader();
    reader.onload = async () => {
      const response = await fetch(BACKEND_SERVER, {
        method: 'POST',
        body: JSON.stringify({
          'jsonrpc': '2.0',
          'id': 0,
          'method': 'upload_file',
          'params': [btoa(reader.result), file.name],
        })
      });
      console.log(await response.json());
    };

    reader.readAsBinaryString(file);

    const response = await fetch(BACKEND_SERVER, {
      method: 'POST',
      body: JSON.stringify({
        'jsonrpc': '2.0',
        'id': 0,
        'method': 'new_file_message',
        'params': [+id, +localStorage.getItem('userId'), text, file.name, file.type, file.size, time],
      })
    });
    console.log(await response.json());
  }
  else {
    const response = await fetch(BACKEND_SERVER, {
      method: 'POST',
      body: JSON.stringify({
        'jsonrpc': '2.0',
        'id': 0,
        'method': 'new_message',
        'params': [+id, +localStorage.getItem('userId'), text, time],
      })
    });
    console.log(await response.json());
  }
}

export default foo;
