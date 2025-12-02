import express from 'express'
import { getAllPlayers, getPlayerById } from '../controllers/playerController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', authMiddleware, getAllPlayers)
router.get('/:id', authMiddleware, getPlayerById)
// router.put('/:id', authMiddleware, upload.single('profileImage'), updateMember)

export default router