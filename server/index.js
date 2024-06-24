const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require("cookie-parser");

app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to your client URL
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const User = require("./models/user");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "foiajwafiowjeoijfojawevjpf[qwe[iojaoj";

app.get('/test', (req, res) => {
    res.json("Test is ok");
});

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const userDoc = await User.findOne({ email });
        if (userDoc) {
            const passOk = bcrypt.compareSync(password, userDoc.password);
            if (passOk) {
                jwt.sign({ email: userDoc.email, _id: userDoc._id, name: userDoc.name }, jwtSecret, {}, (err, token) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: "Internal Server Error" });
                    }
                    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' }).json(userDoc);
                });
            } else {
                res.status(401).json({ error: "Invalid credentials" });
            }
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/profile', async (req, res) => {
    const { token } = req.cookies;
    console.log("Token from cookies:", token);
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, user) => {
            if (err) {
                console.error("JWT verification error:", err);
                return res.status(403).json({ error: "Invalid token" });
            }
            const {name, email, _id} = await User.findById(user._id);
            res.json({name, email, _id});
        });
    } else {
        console.log("No token found in cookies");
        res.json(null);
    }
});

app.post("/logout", (req, res) => {
    res.cookie('token', '').json(true);
})
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
