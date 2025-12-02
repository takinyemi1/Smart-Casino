import express from 'express'
import { login, register, upload, verify } from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/login', login)
router.post('/register', upload.single("profileImage"), register)
router.get('/verify', authMiddleware, verify)

export default router