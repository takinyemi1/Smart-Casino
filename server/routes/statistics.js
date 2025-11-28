import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { getPlayerStatsByUsername } from '../controllers/statisticsController.js'

const router = express.Router()

router.get('/:username/bindist', authMiddleware, getPlayerStatsByUsername)
// router.post('/:username/stats', authMiddleware, recordGameResult)
// router.get('/:username/player-history', authMiddleware, getPlayerGameHistory)

export default router