import React from "react";
import { Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import dashboardLogo from '../../../assets/scgif.gif'
import blackjack from '../../../assets/blackjack-carousel.gif'
import roulette from '../../../assets/roulette-carousel.gif'
import bingo from '../../../assets/bingo-carousel.gif'
import { useNavigate } from "react-router";

const PlayerDashboard = () => {
    const navigate = useNavigate();

    const navigateBlackjack = () => {
        navigate('/players-path/blackjack');
    }

    return (
        <>
            <div>
                <div className="p-6 min-h-screen flex items-center justify-center w-auto" style={{fontFamily: "JosefinSans", height: "auto", width: "auto", backgroundColor: "#ffa4a4ff"}}>
                    <div className="card p-6 text-white w-100" style={{height: "auto", borderRadius: "60px", backgroundColor: "#922626ff"}}>
                        <div className="p-6 flex justify-between gap-2">
                            <div className="text-red-200 text-5xl text-bold" style={{letterSpacing: "2px", width: "70%"}}>
                                <p>
                                    Here at SmartCasino, players will be able to play common casino games and discover the use of mathematics in them.
                                </p>
                            </div>

                            <div className="d-flex align-items-center justify-center" style={{borderRadius: "30px"}}>
                                <img src={dashboardLogo} className="img-fluid rounded" alt="Smart Casino Dashboard Logo" />
                            </div>
                        </div>

                        <hr />
                        
                        <div className="p-6">
                            <Carousel>
                                {/* blackjack */}
                                <Carousel.Item interval={1000} className="p-6">
                                    <div className="flex justify-center gap-4 mb-3">
                                        <img src={blackjack} className="rounded" />

                                        <div className="align-center">
                                            <h3>Blackjack</h3>

                                            <p>Beat any hand that isn't a blackjack, even one with a value of 21. </p>

                                            <button onClick={navigateBlackjack} className="p-6 btn" style={{backgroundColor: "#f07f7fff"}}>Learn More</button>
                                        </div>
                                    </div>
                                </Carousel.Item>

                                {/* roulette */}
                                <Carousel.Item interval={500} className="p-6">
                                    <div className="flex justify-center gap-4 mb-3">
                                        <img src={roulette} className="rounded" />

                                        <div className="align-center">
                                            <h3>Roulette</h3>

                                            <p>Spin a wheel, spin a ball 🔃 and determine the winning number!</p>

                                            <button className="p-6 btn" style={{backgroundColor: "#f07f7fff"}}>Learn More</button>
                                        </div>
                                    </div>
                                </Carousel.Item>

                                {/* bingo */}
                                <Carousel.Item interval={1000} className="p-6">
                                    <div className="flex justify-center gap-4 mb-3">
                                        <img src={bingo} className="rounded" />

                                        <div className="align-center">
                                            <h3>Bingo</h3>

                                            <p>A game of chance.</p>

                                            <button className="p-6 btn" style={{backgroundColor: "#f07f7fff"}}>Learn More</button>
                                        </div>
                                    </div>
                                </Carousel.Item>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlayerDashboard;