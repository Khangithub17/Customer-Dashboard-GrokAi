import { Table, Button } from 'react-bootstrap';

function CustomerTable({ customers, editCustomer, deleteCustomer }) {
  console.log('CustomerTable customers:', customers); // Debug log

  // Safeguard: if customers is not an array or is empty
  if (!Array.isArray(customers) || customers.length === 0) {
    return <p>No customers available.</p>;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer._id}>
            <td>{customer.name}</td>
            <td>{customer.email}</td>
            <td>{customer.phone}</td>
            <td>
              <Button
                variant="warning"
                onClick={() => editCustomer(customer)}
                className="me-2"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => deleteCustomer(customer._id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default CustomerTable;