import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function CustomerForm({ addCustomer }) {
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '' });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCustomer(customer);
    setCustomer({ name: '', email: '', phone: '' });
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={customer.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={customer.email}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          name="phone"
          value={customer.phone}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Add Customer
      </Button>
    </Form>
  );
}

export default CustomerForm;