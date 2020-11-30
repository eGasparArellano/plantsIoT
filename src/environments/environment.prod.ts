export const environment = {
  production: true,
  url: '',
  mqtt: {
    server: 'broker.hivemq.com',
    protocol: 'wss',
    port: 8000
  }
};
/*
  In this case the backend is in the same server,
  so resources are going to be searched in the same URL.
*/
