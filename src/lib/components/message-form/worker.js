export default ((self) => {
  const ports = [];
  self.addEventListener('connect', (event) => {
    const port = event.source;
    ports.push(port);
    port.addEventListener('message', (event) => {
      console.log(event.data);
      if (event.data === 'disconnect') {
        ports.splice(ports.indexOf(event.target), 1);
      } else {
        ports[0].postMessage(event.data);
      }
    });
    port.start();
  });
});
