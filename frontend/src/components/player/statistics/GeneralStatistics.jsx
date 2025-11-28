import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../context/authContext";

const GeneralStatistics = () => {
    const navigate = useNavigate();
    const {user} = useAuth();

    const onBinomialDistribution = () => {
        navigate(`/players-path/statistics/${user.username}/bindist`);
    }

    const onPoissonDistribution = () => {
        navigate();
    }

    const onBayesDistribution = () => {
        navigate();
    }

    return (
        <>
            <div className="p-6 min-h-screen justify-center w-auto" style={{fontFamily: "JosefinSans", height: "auto", width: "auto", backgroundColor: "#ffa4a4ff"}}>
                <div className="flex justify-between gap-2">
                    {/* Blackjack Game */}
                    <div className="p-6 rounded w-100 text-white text-center mx-auto align-center" style={{margin: "0 auto"}}>                        
                        <div className="mt-3 mb-3">
                            <button className="btn btn-outline p-3 w-100 text-3xl"
                                style={{backgroundColor: "#e43636ff",
                                    borderRadius: "50px",
                                    border: "6px solid #881b1bff"
                                }}
                                onClick={onBinomialDistribution}
                            >
                                <span className="text-3xl text-red-200">What are the Odds?</span>
                                <br />
                                <span className="font-small">Blackjack with Binomial Distribution</span>
                            </button>
                        </div>

                        <div className="mt-3 mb-3">
                            <button className="btn btn-outline p-3 w-100 text-3xl"
                                style={{backgroundColor: "#e43636ff",
                                    borderRadius: "50px",
                                    border: "6px solid #881b1bff"
                                }}
                            >
                                <span className="text-3xl text-red-200">Rare Event Tracker</span>
                                <br />
                                <span className="font-small">Blackjack with Poisson Distribution</span>
                            </button>
                        </div>

                        <div className="mt-3 mb-3">
                            <button className="btn btn-outline p-3 w-100 text-3xl"
                                style={{backgroundColor: "#e43636ff",
                                    borderRadius: "50px",
                                    border: "6px solid #881b1bff"
                                }}
                            >
                                <span className="text-3xl text-red-200">Skill Estimator</span>
                                <br />
                                <span className="font-small">Blackjack with Bayes' Theorem</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GeneralStatistics;