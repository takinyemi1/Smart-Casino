import Player from "../models/Player.js";

// fetch the player stats
const getPlayerStatsByUsername = async (req, res) => {
    try {
        console.log("Fetching stats for player: ", req.params.username);
        const player = await Player.findOne({ username: req.params.username });
        console.log("Found player: ", player);

        if (!player) {
            return res.status(404).json({ message: "Player not found" });
        }

        res.json(player);
    } catch (error) {
        console.error("Error fetching player stats:", error);
        res.status(500).json({ message: error.message });
    }
}

export { getPlayerStatsByUsername };