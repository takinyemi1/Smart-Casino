import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import multer from 'multer';
import path from 'path';
import Player from '../models/Player.js';

const login = async (req, res) => {
    try {
        const {
            username, 
            password,
        } = req.body;

        console.log("Looking for email: ", username);
        const user = await User.findOne({username});
        console.log("Found user: ", user);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "[ERROR] User does not exist",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "[ERROR] Password does not match",
            });
        }

        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_KEY, {expiresIn: '5d'});

        return res.status(200).json({
            success: true,
            message: "[SUCCESS] User has successfully logged in",
            token,
            user: {
                id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "[ERROR] Internal server error",
        })
    }
}

const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            username,
            country,
            gender,
            profession,
            age,
        } = req.body;
        console.log("Incoming form data: ", req.body);

        if (!firstName || !lastName || !username || !age || !gender || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "[ERROR] All fields are required",
            });
        };

        const existingUser = await User.findOne({username});
        const existingEmail = await User.findOne({email});

        if (existingUser) {
            console.log("Found existing user: ", existingUser);
            return res.status(400).json({
                success: false,
                message: "[ERROR] User already exists",
            });
        }

        if (existingEmail) {
            // console.log("Found existing username: ", existingUsername);
            return res.status(400).json({
                success: false,
                message: "[ERROR] Email already exists",
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "[ERROR] Passwords do not match",
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashPassword,
            role: "player",
            username,
            gender,
            profession: profession ? profession : "Not Selected",
            age,
            profileImage: req.file ? req.file.filename : "",
            country: country ? country : "Not Selected",
        });

        const savedUser = await newUser.save();

        // create a corresponding player document
        const newPlayer = new Player({
            username: savedUser.username,
            totalWins: 0,
            totalLosses: 0,
            balance: 1000,
            bets: [],
        });

        await newPlayer.save(); // ensures that every new user has a corresponding Player document in MongoDB

        console.log("[SUCCESS] User registered: ", savedUser);

        const token = jwt.sign({id: savedUser._id, role: savedUser.role}, process.env.JWT_KEY, {expiresIn: '10d'});

        return res.status(200).json({
            success: true,
            message: "[SUCCESS] User has successfully registered their account",
            token,
            user: {
                id: savedUser._id,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email,
                role: savedUser.role,
                username: savedUser.username,
                profileImage: savedUser.profileImage,
                gender: savedUser.gender,
                profession: savedUser.profession,
                age: savedUser.age,
                country: savedUser.country,
            }
        });

    } catch (error) {
        console.log("Register error: ", error)
        return res.status(500).json({
            success: false,
            message: "[ERROR] Internal server error: " + error.message,
        })
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({storage: storage});

const verify = (req, res) => {
    return res.status(200).json({
        success: true, 
        user: req.user
    });
};

export {login, register, upload, verify};