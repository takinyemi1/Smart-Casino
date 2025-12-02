import express from 'express'
import { recordGameResult, getPlayerStatsByUsername, getPlayerGameHistory } from '../controllers/gameController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

// router.post('/:id/game-result', authMiddleware, recordGameResult)
router.get('/:username/stats', authMiddleware, getPlayerStatsByUsername)
router.post('/:username/stats', authMiddleware, recordGameResult)
router.get('/:username/player-history', authMiddleware, getPlayerGameHistory)

export default router