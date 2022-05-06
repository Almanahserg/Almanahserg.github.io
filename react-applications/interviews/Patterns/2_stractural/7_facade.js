/*
Фасад — это структурный паттерн проектирования,
который предоставляет простой интерфейс к сложной системе классов,
библиотеке или фреймворку
*/

class Complaints {
  constructor() {
    this.complaints = [];
  }

  replay(complaint) {}

  add(complaint) {
    this.complaints.push(complaint);
    return this.replay(complaint);
  }
}

class ProductComplaints extends Complaints {
  replay({ id, customer, details }) {
    return `Product ${id}: ${customer} (${details})`;
  }
}

class ServiceComplaints extends Complaints {
  replay({ id, customer, details }) {
    return `Service ${id}: ${customer} (${details})`;
  }
}

class ComplaintRegistry {
  register(customer, type, details) {
    const id = Date.now();
    let complaint;

    if (type === 'service') {
      complaint = new ServiceComplaints();
    } else {
      complaint = new ProductComplaints();
    }

    return complaint.add({ id, customer, details });
  }
}

const registry = new ComplaintRegistry();

console.log(registry.register('Me', 'service', 'unavailable'));
// Service 1649069909452: Me (unavailable)

console.log(registry.register('Him', 'product', 'error'));
//Product 1649069909455: Him (error)
