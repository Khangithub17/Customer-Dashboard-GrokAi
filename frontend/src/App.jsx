import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerForm from './components/CustomerForm';
import CustomerTable from './components/CustomerTable';
import './App.css';

function App() {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('/api/customers');
      console.log('Fetched customers:', response.data); // Debug log
      setCustomers(response.data || []); // Default to empty array if null
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError('Failed to load customers. Please try again.');
      setCustomers([]); // Fallback to empty array
    }
  };

  const addCustomer = async (customer) => {
    try {
      const response = await axios.post('/api/customers', customer);
      setCustomers([...customers, response.data]);
    } catch (err) {
      console.error('Error adding customer:', err);
      setError('Failed to add customer.');
    }
  };

  const editCustomer = async (customer) => {
    const updatedData = prompt('Edit customer details (name, email, phone)', 
      `${customer.name},${customer.email},${customer.phone}`);
    if (updatedData) {
      const [name, email, phone] = updatedData.split(',');
      try {
        const response = await axios.put(`/api/customers/${customer._id}`, {
          name,
          email,
          phone,
        });
        setCustomers(customers.map((c) => (c._id === customer._id ? response.data : c)));
      } catch (err) {
        console.error('Error editing customer:', err);
        setError('Failed to edit customer.');
      }
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await axios.delete(`/api/customers/${id}`);
      setCustomers(customers.filter((c) => c._id !== id));
    } catch (err) {
      console.error('Error deleting customer:', err);
      setError('Failed to delete customer.');
    }
  };

  if (error) {
    return <div className="container mt-5 text-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1>Customer Dashboard</h1>
      <CustomerForm addCustomer={addCustomer} />
      <CustomerTable
        customers={customers}
        editCustomer={editCustomer}
        deleteCustomer={deleteCustomer}
      />
    </div>
  );
}

export default App;