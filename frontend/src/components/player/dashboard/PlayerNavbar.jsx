import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import { useParams } from "react-router";
import axios from "axios";
import sclogo from "../../../assets/sclogo.gif"
import defaultProfileImage from "../../../assets/default-img.png"
import { NavLink } from "react-router";
import '../../../../src/App.css'

const PlayerNavbar = () => {
    const {playerId} = useParams();
    const {user} = useAuth();
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        const fetchPlayerInformation = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/profile/${playerId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('sctoken')}`,
                    },
                });
                console.log("Player data: ", response.data);

                if (response.data.success) {
                    setPlayer(response.data.player);
                }
            } catch (error) {
                console.log("Error fetching player data: ", error);
                console.log("Auth user: ", user);

                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        }

        if (playerId) fetchPlayerInformation();
    }, [playerId]);

    return (
        <>
            <div style={{backgroundColor: "#dd1818ff"}}>
                <div className="p-6 w-auto h-auto">
                    <div className="px-4 flex items-center justify-between space-x-0">
                        <div className="px-4 flex gap-6">
                            <NavLink to={'/players-path/dashboard'}>
                                <img src={sclogo} alt="Smart Casino Logo" className="img-fluid w-20 align-center justify-center mx-auto" style={{borderRadius: "20px"}} />
                            </NavLink>

                            <h2 style={{ color: "#e7c6c6ff"}}>Smart Casino</h2>
                        </div>

                        <NavLink to='/players-path/dashboard'
                            style={({ isActive }) => ({color: isActive ? "#7a0000ff" : "#ebd1d1ff",
                                backgroundColor: isActive ? "#eea9a9ff" : " ",
                                textDecoration: "none",
                            })}
                            className='flex items-center space-x-4 block py-2.5 px-4 rounded no-underline'
                        >
                            <span>Home</span>
                        </NavLink>

                        <NavLink to='/players-path/statistics'
                            style={({ isActive }) => ({color: isActive ? "#7a0000ff" : "#ebd1d1ff",
                                backgroundColor: isActive ? "#eea9a9ff" : " ",
                                textDecoration: "none",
                            })}
                            className='flex items-center space-x-4 block py-2.5 px-4 rounded no-underline'
                        >
                            <span>Statistics</span>
                        </NavLink>

                        <NavLink to='/players-path/history'
                            style={({ isActive }) => ({color: isActive ? "#7a0000ff" : "#ebd1d1ff",
                                backgroundColor: isActive ? "#eea9a9ff" : " ",
                                textDecoration: "none",
                            })}
                            className='flex items-center space-x-4 block py-2.5 px-4 rounded no-underline'
                        >
                            <span>History</span>
                        </NavLink>

                        <NavLink to={`/players-path/profile/${user.id}`}
                        // .id not _.id
                            className='navlink flex items-center space-x-4 block py-2.5 px-4 rounded w-20'
                        >
                            {player ? (

                                <img className="flex justify-center items-center" style={{borderRadius: "50px"}} 
                                    src={player?.profileImage ? `http://localhost:3001/uploads/${player.profileImage}` : defaultProfileImage} alt="Profile Picture" />
                            ) : (
                                <img className="flex justify-center items-center" style={{borderRadius: "50px"}} 
                                    src={defaultProfileImage} alt="Default Profile Picture" />
                            )}
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlayerNavbar;