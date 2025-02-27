import { Table, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

function CustomerTable({ customers, editCustomer, deleteCustomer }) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleDelete = (id) => {
    deleteCustomer(id);
    setToastMessage('Customer deleted successfully!');
    setShowToast(true);
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'white', padding: '20px' }}>
      <h1 style={{ background: 'linear-gradient(to right, purple, pink)', WebkitBackgroundClip: 'text', color: 'transparent', textTransform: 'capitalize', animation: 'fadeIn 2s' }}>
        Customer Dashboard
      </h1>
      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)}>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
      {(!Array.isArray(customers) || customers.length === 0) ? (
        <p>No customers available.</p>
      ) : (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>City</th>
              <th>Postal Code</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>
                <td>{customer.city}</td>
                <td>{customer.postalCode}</td>
                <td>{customer.country}</td>
                <td>
                  <Button variant="warning" onClick={() => editCustomer(customer)} className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(customer._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default CustomerTable;