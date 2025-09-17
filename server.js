const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();



const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

const authRoutes = require('./routes/authRoutes');


const categoryRoutes = require('./routes/categoryRoutes');


const serviceRoutes = require('./routes/serviceRoutes');

app.use('/api', authRoutes);
app.use('/api', categoryRoutes);


app.use('/api', serviceRoutes);

app.get('/', (req, res) => {
   return res.send('Server is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
