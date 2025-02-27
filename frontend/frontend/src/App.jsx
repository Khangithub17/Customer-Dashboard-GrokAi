import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerForm from './components/CustomerForm';
import CustomerTable from './components/CustomerTable';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('/api/customers');
      setCustomers(response.data || []);
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError('Failed to load customers. Please try again.');
      setCustomers([]);
    }
  };

  const addCustomer = async (customer) => {
    try {
      const response = await axios.post('/api/customers', customer);
      setCustomers([...customers, response.data]);
      toast.success('Customer added successfully!');
    } catch (err) {
      console.error('Error adding customer:', err);
      setError('Failed to add customer.');
    }
  };

  const editCustomer = async (customer) => {
    const updatedData = prompt('Edit customer details (name, email, phone, address, city, postalCode, country)', 
      `${customer.name},${customer.email},${customer.phone},${customer.address},${customer.city},${customer.postalCode},${customer.country}`);
    if (updatedData) {
      const [name, email, phone, address, city, postalCode, country] = updatedData.split(',');
      try {
        const response = await axios.put(`/api/customers/${customer._id}`, {
          name,
          email,
          phone,
          address,
          city,
          postalCode,
          country,
        });
        setCustomers(customers.map((c) => (c._id === customer._id ? response.data : c)));
        toast.success('Customer updated successfully!');
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
      toast.success('Customer deleted successfully!');
    } catch (err) {
      console.error('Error deleting customer:', err);
      setError('Failed to delete customer.');
    }
  };

  if (error) {
    return <div className="container mt-5 text-danger">{error}</div>;
  }

  return (
    <div className="container mt-5" style={{ backgroundColor: 'black', color: 'white' }}>
      <h1 style={{ background: 'linear-gradient(to right, purple, pink)', textTransform: 'capitalize', animation: 'fadeIn 2s' }}>
        Customer Dashboard
      </h1>
      <CustomerForm addCustomer={addCustomer} />
      <CustomerTable
        customers={customers}
        editCustomer={editCustomer}
        deleteCustomer={deleteCustomer}
      />
      <ToastContainer />
    </div>
  );
}

export default App;