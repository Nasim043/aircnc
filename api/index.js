const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const bycryptSalt = bcrypt.genSaltSync(10);

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));
app.use(express.json());



// mongoose.connect(process.env.MONGO_URL);
mongoose.connect(process.env.LOCAL_URL);

app.get('/', (req, res) => {
    res.send('Welcome to aircnc');
})

app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.json({ message: 'User already exists' })
        }
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bycryptSalt)
        });
        res.status(201).json({ message: 'User register successfully', success: true, userDoc });
    } catch (error) {
        console.error(error)
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userDoc = await User.findOne({ email });
        if (!userDoc) {
            return res.json({ message: 'Incorrect password or email' })
        }
        const passOk = await bcrypt.compare(password, userDoc.password);
        if (!passOk) {
            return res.json({ message: 'Incorrect password or email' })
        }

        const token = jwt.sign({ email: userDoc.email, id: userDoc._id },
            process.env.SECRET_KEY, { expiresIn: '1h' })

        res.cookie('token', token, { withCredentials: true });
        res.status(201).json({ message: "logged in successfully", success: true, userDoc });
    } catch (error) {
        console.error(error);
    }
})

app.listen(5000);