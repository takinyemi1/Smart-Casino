import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectToDatabase from './db/db.js'
import authRouter from './routes/auth.js'
import playerRouter from './routes/player.js'
import playerPathRouter from './routes/playerPath.js'
import gameRouter from './routes/game.js'
import statisticsRouter from './routes/statistics.js'

dotenv.config()

connectToDatabase() // database connection
const app = express()

// middleware
app.use(cors())
app.use('/uploads', express.static('public/uploads'))

app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/players', playerRouter)
app.use('/api/profile', playerPathRouter)
app.use('/api/game', gameRouter)
app.use('/api/statistics', statisticsRouter)

app.listen(process.env.PORT, () => {
    console.log(`Application is running on port ${process.env.PORT}`)
})