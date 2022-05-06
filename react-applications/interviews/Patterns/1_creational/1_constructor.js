/*
Строитель — это порождающий паттерн проектирования,
который позволяет создавать сложные объекты пошагово.
Строитель даёт возможность использовать один и тот же код
строительства для получения разных представлений объектов.
*/

function Server(name, ip) {
  this.name = name;
  this.ip = ip;
}

Server.prototype.getUrl = function () {
  return `https://${this.ip}:80`;
};

// or

class ClassServer {
  constructor(name, ip) {
    this.name = name;
    this.ip = ip;
  }

  getUrl() {
    return `https://${this.ip}:8080`;
  }
}

const aws = new Server('AWS Romania', '77.44.68.12');
const newServer = new ClassServer('Some Server Name', '11.158.46.77');

console.log('aws', aws.getUrl()); //aws https://77.44.68.12:80
console.log('newServer', newServer.getUrl()); // newServer https://11.158.46.77:8080
