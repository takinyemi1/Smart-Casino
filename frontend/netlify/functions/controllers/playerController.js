// await User.find({}, {password: 0})

import User from "../models/User.js"
import multer from "multer";

const getAllPlayers = async (req, res) => {
    try {
        const players = await User.find({ role: "player" }).select('-password');
        return res.status(200).json({
            success: true,
            players,
        });
    } catch (error) {
        console.log("Error fetching players: ", error);
        return res.status(500).json({
            success: false,
            error: "[ERROR] Internal server error: " + error.message,
        })
    }
}

const getPlayerById = async (req, res) => {
    const { id } = req.params;
    console.log("Received ID: ", id);
    
    try {
        if (!id) {
            return res.status(400).json({
                message: "No ID provided",
            })
        }
        const player = await User.findById(id).select('-password');

        if (!player) {
            return res.status(404).json({
                success: false,
                error: "[ERROR] Player not found",
            });
        }

        return res.status(200).json({
            success: true,
            player,
        });
    } catch (error) {
        console.log("[ERROR] Error fetching player by Id: ", error);
        return res.status(500).json({
            success: false,
            error: "[ERROR] Internal server error: " + error.message,
        });
    }
}

const updatePlayer = async (req, res) => {
    try {
        const {id} = req.params;
        const {
            firstName,
            lastName,
            email,
            username,
            gender,
            profession,
            age,
            // profileImage,
            country,
        } = req.body;
        console.log(req.body);

        const player = await User.findById(id);
        const existingUsername = await User.findOne({username});

        if (!player) {
            return res.status(404).json({
                success: false,
                error: "User does not exist",
            });
        };

        if (existingUsername && existingUsername._id.toString() !== id) {
            // console.log("Found existing username: ", existingUsername);
            return res.status(400).json({
                success: false,
                message: "[ERROR] Username already exists",
            });
        };

        const updatePlayerInformation = await User.findByIdAndUpdate(id, {
            firstName: firstName ? firstName : player.firstName,
            lastName: lastName ? lastName : player.lastName,
            email: email ? email : player.email,
            profileImage: req.file ? req.file.filename : player.profileImage,
            username: username ? username : player.username,
            gender,
            profession: profession ? profession : "Not Provided",
            age: age ? age : player.age,
            profileImage: req.file ? req.file.filename : "",
            country: country ? country : "Not Selected",
        }, {new: true} // return the updated document
        );

        if (!updatePlayerInformation) {
            return res.status(404).json({
                success: false,
                error: "Document not found",
            });
        };

        return res.status(200).json({
            success: true,
            message: "Player information has been successfully updated",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Error updating player information",
        });
    };
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

export { getAllPlayers, getPlayerById, updatePlayer, upload }