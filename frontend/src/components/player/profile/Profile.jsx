import React, { useEffect, useState } from "react";
import defaultProfileImage from "../../../assets/default-img.png"
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../../context/authContext";
import axios from "axios";

const Profile = () => {
    const {userId} = useParams();
    const [player, setPlayer] = useState(null);

    const {user, logout} = useAuth();

    const navigate = useNavigate();

    const handlePlayerStats = () => {
        navigate(`/players-path/game/${player.username}/stats`);
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    useEffect(() => {
        const fetchPlayerInformation = async () => {
            try {
                const token = localStorage.getItem('sctoken');
                const response = await axios.get(`http://localhost:3001/api/profile/${userId}`, {
                    headers: token ? {
                        Authorization: `Bearer ${token}`,
                    } : {},
                });
                console.log("Player data: ", response.data);

                if (response.data.success) {
                    setPlayer(response.data.player);
                }
            } catch (error) {
                console.log("Error fetching player data: ", error);
                console.log("Auth User: ", user);
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        }
        if (userId) fetchPlayerInformation();
    }, [userId]);

    return (
        <>
            <div className="p-6 min-h-screen items-center text-center justify-center w-auto" 
                style={{backgroundColor: "#ffa4a4ff", 
                height: "auto"}}>

            {player ? (
                <div className="p-6 card h-auto outline" style={{backgroundColor: "#ddd"}}>
                    <div className="justify-center w-50 m-auto">
                        <img className="flex justify-center items-center" style={{borderRadius: "50px"}} 
                            src={player?.profileImage ? `http://localhost:3001/uploads/${player.profileImage}` : defaultProfileImage} />
                        <br />

                        {/* View Player Statistics */}
                        <button className="btn p-3 btn-outline mt-4 text-white" style={{backgroundColor: "#d88e8eff"}}
                            onClick={handlePlayerStats}
                        >
                            View Player Statistics
                        </button>
                    </div>

                    <div className="mt-4 p-6 card h-auto" style={{backgroundColor: "#ddd"}}>
                        <p className="justify-center text-lg uppercase font-bold">Player Name:</p>
                        <p className="justify-center">{player?.firstName + " " + player?.lastName}</p>
                        <hr />

                        <p className="justify-center text-lg uppercase font-bold">Username:</p>
                        <p className="justify-center">{player?.username}</p>
                        <hr />

                        <p className="justify-center text-lg uppercase font-bold">Email:</p>
                        <p className="justify-center">{player.email}</p>
                        <hr />

                        <p className="justify-center text-lg uppercase font-bold">Gender:</p>
                        <p className="justify-center">{player.gender}</p>
                        <hr />

                        <p className="justify-center text-lg uppercase font-bold">Age:</p>
                        <p className="justify-center">{new Date(player.age).toLocaleDateString()}</p>
                        <hr />

                        <p className="justify-center text-lg uppercase font-bold">Role:</p>
                        <p className="justify-center">{player.role}</p>
                        <hr />

                        <p className="justify-center text-lg uppercase font-bold">Profession:</p>
                        <p className="justify-center">{player.profession}</p>
                        <hr />

                        <p className="justify-center text-lg uppercase font-bold">Country:</p>
                        <p className="justify-center">{player.country}</p>
                        <hr />

                        <p className="justify-center text-lg uppercase font-bold">Member Since:</p>
                        <p className="justify-center">{new Date(player.createdAt).toLocaleDateString()}</p>

                        <br />

                        {/* Edit Button */}
                        <div>
                            {/* <button 
                                className="p-3 justify-center btn outline w-50"
                                style={{backgroundColor: theme === "dark" ? "#316ba1ff" : "#97c1e9ff", color: theme === "dark" ? "#c6d5e7ff" : "#172c53ff", fontFamily: "Exo", fontWeight: "bold"}}
                                onClick={hanadleEditProfile}>
                                    Edit Profile
                            </button>
                            <br /><br /> */}

                            {/* Logout Button */}
                            <div className="font-bold">
                                <button className="btn p-2 text-white" style={{backgroundColor: "#cc1212ff"}}
                                onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <div className="p-6 text-center">
                    <p>No player information available.</p>
                </div>}
            </div>
        </>
    )
}

export default Profile;