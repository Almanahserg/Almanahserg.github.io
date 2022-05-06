/*
Декоратор — это структурный паттерн проектирования, который позволяет
динамически добавлять объектам новую функциональность,
оборачивая их в полезные «обёртки»
*/

class Server {
  constructor(ip, port) {
    this.ip = ip;
    this.port = port;
  }

  get url() {
    return `https://${this.ip}:${this.port}`;
  }
}

function aws(server) {
  server.isAWS = true;
  server.awsInfo = function () {
    return server.url;
  };

  return server;
}

function azure(server) {
  server.isAzure = true;
  server.azureInfo = function () {
    return server.url;
  };

  return server;
}

const s1 = aws(new Server('12.46.787.4', 8080));
const s2 = azure(new Server('78.89.464.4', 9000));

console.log(s1.isAWS); // true
console.log(s1.awsInfo()); // https://12.46.787.4:8080
console.log(s2.isAzure); // true
console.log(s2.url); // https://78.89.464.4:9000
