import mongoose from 'mongoose';

// schema for player bets - model will be trained from this data
const playerBetSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    }, outcome: {
        type: String,
        enum: ["win", "loss", "tie"], 
        required: true,
    }, // actions: {
        // type: [String] // [hit, stand, hit, etc]
    // }, 
    payout: {
        type: Number,
        required: true,
    }, timestamp: {
        type: Date,
        default: Date.now,
    }
});

// player schema
const playerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    }, totalWins: {
        type: Number,
        default: 0,
    }, totalTies: {
        type: Number,
        default: 0,
    }, totalLosses: {
        type: Number,
        default: 0,
    }, totalGames: {
        type: Number,
        default: 0,
    }, totalTimePlayed: {
        type: Number,
        default: 0,
    }, balance: {
        type: Number,
        default: 1000,
    }, bets: [playerBetSchema],
});

const Player = mongoose.model("Player", playerSchema);
export default Player