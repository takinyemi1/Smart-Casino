import Player from "../models/Player.js";
// import fs from "fs";

// record a new game result for a player
const recordGameResult = async (req, res) => {
    const { amount, outcome, payout, timePlayed } = req.body;

    console.log("Recording game result for player username: ", req.params.username);

    try {
        const player = await Player.findOne({ username: req.params.username }); // check if the user exists

        if (!player) {
            return res.status(404).json({ message: "Player not found" });
        }

        // add the new bet to the player's record
        player.bets.push({amount, outcome, payout});

        // update player stats based on game outcome
        if (outcome === "win") {
            player.totalWins += 1;
            player.totalGames += 1;
        } else {
            player.totalLosses += 1;
            player.totalGames += 1;
        }

        // update player balance
        player.balance += payout - amount;

        // update total time played
        if (timePlayed) {
            player.totalTimePlayed += timePlayed;
        }

        await player.save();

        // compute the features and append to the csv
        // const features = await computerPlayerFeatures(player);
        // const csvLine = Object.values(features).join(",") + "\n";
        // fs.appendFileSync(path.resolve("player_history.csv"), csvLine);

        res.status(200).json({ 
            success: true,
            message: "Game result recorded", 
            player 
        });
    } catch (error) {
        console.error("Error recording game result:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal server error" 
        });
    }
}

const getPlayerGameHistory = async (req, res) => {
    try {
        console.log("Fetching game history for player: ", req.params.username);
        const player = await Player.findOne({username: req.params.username});

        if (!player) {
            return res.status(404).json({
                success: false,
                message: "Player not found",
            });
        }

        return res.status(200).json({
            success: true,
            username: player.username,
            history: player.bets,
        });

    } catch (error) {
        console.error("Error fetching game history: ", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

// fetch the player stats
const getPlayerStatsByUsername = async (req, res) => {
    try {
        console.log("Fetching stats for player: ", req.params.username);
        const player = await Player.findOne({username: req.params.username});
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

export { recordGameResult, getPlayerStatsByUsername, getPlayerGameHistory }