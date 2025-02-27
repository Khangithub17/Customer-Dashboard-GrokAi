const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const customerRoutes = require('./routes/customerRoutes');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running');
})

console.log('MONGO_URI:', process.env.MONGO_URI); // Add this line to log the MONGO_URI value

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.use('/api/customers', customerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));