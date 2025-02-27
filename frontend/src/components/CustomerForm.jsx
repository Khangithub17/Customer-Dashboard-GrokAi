import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Toast, ToastContainer } from 'react-bootstrap';

function CustomerForm({ addCustomer }) {
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', address: '', city: '', postalCode: '', country: '' });
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCustomer(customer);
    setCustomer({ name: '', email: '', phone: '', address: '', city: '', postalCode: '', country: '' });
    setShowToast(true);
  };

  return (
    <>
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
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={customer.address}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={customer.city}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            name="postalCode"
            value={customer.postalCode}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            name="country"
            value={customer.country}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Add Customer
        </Button>
      </Form>

      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
          <Toast.Body>Customer added successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default CustomerForm;