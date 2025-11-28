import mongoose from "mongoose";
import fs from "fs";
import connectToDatabase from "../db/db.js";
import Player from "../models/Player.js";

// connect to MongoDB
// mongoose.connect("mongodb://127.0.0.1:27017/smart-casino");
connectToDatabase();

const computerPlayerFeatures = (player) => {
    try {
        const totalGames = player.bets.length;
        if (totalGames === 0) {
            return null; // no data to extract features from
        }

        const totalWins = player.bets.filter(b => b.outcome === "win").length;
        const totalLosses = player.bets.filter(b => b.outcome === "loss").length;

        const averageBet = player.bets.reduce((sum, b) => sum + b.amount, 0) / totalGames;
        const averagePayout = player.bets.reduce((sum, b) => sum + (b.payout || 0), 0) / totalGames;

        // compute the longest loss streak
        let currentStreak = 0, longestLossStreak = 0;
        for (const b of player.bets) {
            if (b.outcome === "loss") {
                currentStreak += 1;
                longestLossStreak = Math.max(longestLossStreak, currentStreak);

            } else {
                currentStreak = 0;
            }
        }

        // compute the aggressiveness of how often they hit multiple times
        const handsWithMultipleHits = player.bets.filter(b => b.actions && b.actions.filter(a => a === "hit").length > 2).length;
        const aggressiveness = handsWithMultipleHits / totalGames;

        return {
            username: player.username,
            win_rate: totalWins / (totalWins + totalLosses || 1),
            average_bet: averageBet.toFixed(2),
            average_payout: averagePayout.toFixed(2),
            loss_streak: longestLossStreak,
            aggressiveness: aggressiveness.toFixed(2),
            player_style: "",
        };

    } catch (error) {
        console.error("Error extracting features:", error);
        return null;
    }
}

const exportPlayerData = async () => {
    try {
        await connectToDatabase();

        const players = await Player.find({});
        const rows = [];

        for (const player of players) {
            const features = computerPlayerFeatures(player);
            if (features) rows.push(features);
        }

        if (rows.length === 0) {
            console.log("No player data found to export");
            return;
        }

        const header = Object.keys(rows[0]).join(",") + "\n";
        const csvRows = rows.map(r => Object.values(r).join(",")).join("\n");

        fs.writeFileSync("player_history.csv", header + csvRows);
        console.log("Exported player_history.csv with", rows.length, "records.");

    } catch (error) {
        console.error("Error exporting player data:", error);
    } finally {
        mongoose.connection.close();
    }
}

exportPlayerData();