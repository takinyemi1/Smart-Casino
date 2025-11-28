import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useAuth } from "../../../context/authContext";

// records each game result to the backend and displays player stats like total wins losses, and balance
const PlayerStatistics = ({token}) =>  {
    const {user} = useAuth();
    const [statistics, setStatistics] = useState(null);
    const [error, setError] = useState(null);

    const [history, setHistory] = useState([]);

    const {username} = useParams();
    const navigate = useNavigate();

    const returnToProfile = () => {
        navigate(`/players-path/profile/${user?.id}`);    
    }
    
    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const token = localStorage.getItem("sctoken");
                const response = await axios.get(`http://localhost:3001/api/game/${username}/stats`,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                setStatistics(response.data);  
            } catch (error) {
                console.error("Error fetching player statistics: ", error);
                setError("Failed to load player statistics");
            }
        }
        fetchStatistics();
    }, [username, token]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem("sctoken");
                const response = await axios.get(`http://localhost:3001/api/game/${username}/player-history`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setHistory(Array.isArray(response.data.history) ? response.data.history : []);
                console.log(response.data)
            } catch (error) {
                console.error("Error fetching history: ", error);
            }
        }
        fetchHistory();
    }, [username, token]);

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    if (!statistics) {
        return (
            <div className="p-6">
                <h2>Loading player information...</h2>
            </div>
        );
    }

    const totalGames = statistics.totalGames || 0;

    // calculate win rate
    const winRatePercent = totalGames > 0 ? ((statistics.totalWins / totalGames) * 100).toFixed(2) : 0;
    
    // calculate loss rate
    const lossRatePercent = totalGames > 0 ? ((statistics.totalLosses / totalGames) * 100).toFixed(2) : 0;

    return (
        <>
            <div className="p-6 text-white text-center" style={{backgroundColor: "#ffa4a4ff", fontFamily: "JosefinSans"}}>
                {error && 
                    <p className="text-red-600 bg-white p-3 mb-4 font-bold rounded">
                        {error}
                    </p>
                }

                <div className="flex gap-2 justify-between">
                    {statistics ? (
                        <div>
                            <div className="p-6 card border-red-700 text-white" style={{borderRadius: "20px", width: "400px", margin: "0 auto",
                                backgroundColor: "#ce4545ff",
                                border: "5px solid #921313ff",
                                height: "210vh"
                            }}>
                                <h1 style={{fontSize: "3.5rem"}}>
                                    <span className="bg-red-700 border-5 border-red-600"
                                        style={{borderRadius: "30px"}}
                                    >{statistics.username}'s </span> 
                                    Player Statistics
                                </h1>

                                <div>
                                    <h2 className="bg-red-400 border-5 border-red-500 p-1" style={{borderRadius: "30px"}}>Balance</h2>
                                    <h3>${statistics.balance.toFixed(2)}</h3>
                                </div>

                                <hr />

                                <div>
                                    <h2 className="bg-red-400 border-5 border-red-500 p-1" style={{borderRadius: "30px"}}>Total Wins</h2>
                                    <h3>{statistics.totalWins}</h3>

                                    <p style={{borderBottom: "5px solid #e04343ff"}}>Calculate your Win Rate</p>

                                    <div>
                                        <p>Win Rate (%) = (Total Wins ({statistics.totalWins}) / Total Games ({totalGames})) x 100 = {winRatePercent}%</p>
                                    </div>
                                </div>

                                <hr />

                                <div>
                                    <h2 className="bg-red-400 border-5 border-red-500 p-1" style={{borderRadius: "30px"}}>Total Losses</h2>
                                    <h3>{statistics.totalLosses}</h3>

                                    <p style={{borderBottom: "5px solid #e04343ff"}}>Calculate your Win Rate</p>

                                    <div>
                                        <p>Loss Rate (%) = (Total Losses ({statistics.totalLosses}) / Total Games ({totalGames})) x 100 = {lossRatePercent}%</p>
                                    </div>
                                </div>

                                <hr />

                                <div>
                                    <h2 className="bg-red-400 border-5 border-red-500 p-1" style={{borderRadius: "30px"}}>Total Ties</h2>
                                    <h3>{statistics.totalTies}</h3>
                                </div>

                                <hr />

                                <div>
                                    <h2 className="bg-red-400 border-5 border-red-500 p-1" style={{borderRadius: "30px"}}>Games Played</h2>
                                    <h3>{statistics.totalGames}</h3>
                                </div>

                                <hr />

                                <div>
                                    <h2 className="bg-red-400 border-5 border-red-500 p-1" style={{borderRadius: "30px"}}>Time Elapsed</h2>
                                    <h3>{formatTime(statistics.totalTimePlayed)}</h3>
                                </div>

                                <hr />

                                {/* return to profile */}
                                <button onClick={returnToProfile} className="btn btn-outline no-underline text-red-500"
                                    style={{backgroundColor: "#bd1e1eff",
                                        color: "white",
                                        borderRadius: "30px",
                                        border: "5px solid #921313ff"
                                    }}
                                    >
                                    Return to Profile
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p>Loading Statistics...</p>
                    )}

                    <br />

                    <div>
                        <div className="p-6 card border-red-700 text-white" style={{borderRadius: "20px", width: "400px", margin: "0 auto",
                            backgroundColor: "#ce4545ff",
                            border: "5px solid #921313ff",
                            height: "210vh"
                        }}>
                            <h1 style={{fontSize: "3.5rem"}}>
                                <span className="bg-red-700 border-5 border-red-600"
                                    style={{borderRadius: "30px"}}
                                >{username}'s </span> 
                                Player History
                            </h1>

                            <br />
                            <br />

                            <div 
                                style={{borderRadius: "30px",
                                    backgroundColor: "#a31818ff",
                                    border: "6px solid #670000ff",
                                    height: "200vh",
                                }}
                                data-bs-spy="scroll" 
                                data-bs-offset="0" 
                                data-bs-smooth-scroll="true" 
                                tabIndex="0" 
                                className="scroll-box h-90 overflow-y-auto items-center justify-center align-center mx-0 w-100 border-6 border-red-500 p-6 scrollbar"
                            >
                                {history.length === 0 ? (
                                    <p className="font-bold text-2xl">No game history available</p>
                                ) : (
                                    history.slice().reverse().map((bet, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                backgroundColor: "#eeb7b7ff",
                                                color: "white",
                                                margin: "0 auto",
                                                borderRadius: "20px",
                                                border: "5px solid #67000ff",
                                            }}
                                        >
                                            <div className="mt-3 mb-3 p-3">
                                                <h2 className="bg-red-400 border-5 border-red-500 p-1" style={{borderRadius: "30px"}}>Bet Amount</h2>
                                                <h3>${bet.amount.toFixed(2)}</h3>
                                            </div>

                                            <div className="mt-3 mb-3 p-3">
                                                <h2 className="bg-red-400 border-5 border-red-500 p-1" style={{borderRadius: "30px"}}>Round Outcome</h2>
                                                <h3 className="uppercase">{bet.outcome}</h3>
                                            </div>

                                            <div className="mt-3 mb-3 p-3">
                                                <h2 className="bg-red-400 border-5 border-red-500 p-1" style={{borderRadius: "30px"}}>Payout</h2>
                                                <h3>${bet.payout.toFixed(2)}</h3>
                                            </div>

                                            <div className="mt-3 mb-3 p-3">
                                                <h2 className="bg-red-400 border-5 border-red-500 p-1" style={{borderRadius: "30px"}}>Timestamp</h2>
                                                <h3>{formatTime(bet.amount.toFixed(2))}</h3>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* <div>
                                <div>
                                    <h2 className="bg-red-400 border-5 border-red-500 p-1" style={{borderRadius: "30px"}}>Balance</h2>
                                    <h3>${statistics.balance.toFixed(2)}</h3>
                                </div>

                                <hr />

                                <div>
                                    <h2 className="bg-red-400 border-5 border-red-500 p-1" style={{borderRadius: "30px"}}>Total Wins</h2>
                                    <h3>{statistics.totalWins}</h3>
                                </div>

                                <hr />

                                <div>
                                    <h2 className="bg-red-400 border-5 border-red-500 p-1" style={{borderRadius: "30px"}}>Total Losses</h2>
                                    <h3>{statistics.totalLosses}</h3>
                                </div>

                                <hr />

                                <div>
                                    <h2 className="bg-red-400 border-5 border-red-500 p-1" style={{borderRadius: "30px"}}>Total Ties</h2>
                                    <h3>{statistics.totalTies}</h3>
                                </div>

                                <hr />

                                <div>
                                    <h2 className="bg-red-400 border-5 border-red-500 p-1" style={{borderRadius: "30px"}}>Games Played</h2>
                                    <h3>{statistics.totalGames}</h3>
                                </div>

                                <hr />

                                <div>
                                    <h2 className="bg-red-400 border-5 border-red-500 p-1" style={{borderRadius: "30px"}}>Time Elapsed</h2>
                                    <h3>{formatTime(statistics.totalTimePlayed)}</h3>
                                </div>

                                <hr />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlayerStatistics;