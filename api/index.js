const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const bycryptSalt = bcrypt.genSaltSync(10);

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));
app.use(express.json());
app.use(cookieParser());



// mongoose.connect(process.env.MONGO_URL);
mongoose.connect(process.env.LOCAL_URL);

app.get('/', (req, res) => {
    res.send('Welcome to aircnc');
})

// verify the token to obtain the data
const userVerification = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        // Allow unauthenticated access to certain routes
        if (req.path === '/profile') {
            req.userInfo = null; // Set userInfo to null for unauthenticated users
            return res.json(req.userInfo);
        }
        return res.status(401).json({ message: 'unauthorized access' });
    }
    jwt.verify(token, process.env.SECRET_KEY, async (err, data) => {
        if (err) {
            return res.status(401).json({ message: 'unauthorized access' });
        } else {
            const { name, email, _id } = await User.findById(data.id);
            req.userInfo = { name, email, _id };
            return next();
        }
    })
}

// get the user data from jwt 
// useful when refresh the page (to fetch again)

app.get('/profile', userVerification, (req, res) => {
    // Check if user is authenticated before returning the profile
    if (req.userInfo) {
        return res.json({ ...req.userInfo }); // name, email, _id
    } else {
        return res.status(401).json({ message: 'unauthorized access' });
    }
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

app.post('/logout', (req, res) => {
    return res
        .clearCookie("token")
        .status(200)
        .json({ message: "Successfully logged out 😏 🍀" });
})

app.listen(5000);