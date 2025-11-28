import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Root from './utils/Root'
import Login from './pages/Login'
import Register from './pages/Register'
import Unauthorized from './pages/Unauthorized'
import ProtectedRoutes from './utils/ProtectedRoutes'
import PlayerDashboard from './components/player/dashboard/PlayerDashboard'
import PlayerLayout from './components/player/dashboard/PlayerLayout'
import Home from './components/player/blackjack/Home'
import BlackJackRoot from './components/player/blackjack/BlackJackRoot'
import Profile from './components/player/profile/Profile'
import PlayerStatistics from './components/player/blackjack/PlayerStatistics'
import GeneralStatistics from './components/player/statistics/GeneralStatistics'
import BinomialDistribution from './components/player/statistics/BinomialDistribution'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Default Path */}
          <Route path='/' element={<Root />} />

          {/* Login/Register/Unauthorized Routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/unauthorized' element={<Unauthorized />} />

          {/* Admin Routes */}

          {/* Member Routes */}
          <Route element={<PlayerLayout />}>
            <Route path='/players-path/dashboard' element={
              <ProtectedRoutes requiredRole={['player']}>
                <PlayerDashboard />
              </ProtectedRoutes>
            } />

            {/* Member Profile */}

            {/* Blackjack Game */}
            <Route path='/players-path/blackjack' element={<BlackJackRoot />} />
            <Route path='/players-path/profile/:userId' element={<Profile />} />
            <Route path='/players-path/game/:username/stats' element={<PlayerStatistics />} />

            {/* Statistics - Distribution */}
            <Route path='/players-path/statistics' element={<GeneralStatistics />} />
            <Route path='/players-path/statistics/:username/bindist' element={<BinomialDistribution />} />

          </Route>

        </Routes>
      </div>
    </Router>
  )
}

export default App
