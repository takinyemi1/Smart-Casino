import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import {
    XAxis,
    YAxis,
    Tooltip,
    LineChart,
    Line
} from "recharts";

const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));
const nCk = (n, k) => factorial(n) / (factorial(k) * factorial(n - k));

const BinomialDistribution = () => {
    const { username } = useParams();

    const [games, setGames] = useState(0);
    const [wins, setWins] = useState(5);

    const [pmf, setPMF] = useState([]);
    // const [cdf, setCDF] = useState([]);

    const [result, setResult] = useState(null);
    const [statistics, setStatistics] = useState(null);
    // const [error, setError] = useState(null);

    // fetch player statistics
    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const token = localStorage.getItem("sctoken");
                const response = await axios.get(`http://localhost:3001/api/game/${username}/stats`, {
                        headers: { 
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setStatistics(response.data);
            } catch (error) {
                console.error("Error fetching stats:", error);
                // setError("Failed to load player statistics");
            }
        };

        fetchStatistics();
    }, [username]);

    if (!statistics) {
        return (
            <div className="p-6 text-center">
                <h2>Loading...</h2>
            </div>
        );
    }

    const totalGames = statistics.totalGames || 0;

    const winRatePercent = totalGames > 0 ? ((statistics.totalWins / totalGames) * 100).toFixed(2) : 0;

    const winRate = winRatePercent / 100;

    // binomial calculation
    const calculateProbability = () => {
        let p = winRate;
        let sum = 0;

        for (let k = wins; k <= games; k++) {
            sum += nCk(games, k) * Math.pow(p, k) * Math.pow(1 - p, games - k);
        }

        setResult((sum * 100).toFixed(2));
    };

    // pmf (probability mass function) of exactly k wins
    const generatePMF = () => {
        let data = [];

        for (let k = 0; k <= games; k++) {
            const prob = 
                nCk(games, k) *
                Math.pow(winRate, k) *
                Math.pow(1 - winRate, games - k);

            data.push({ k, prob: (prob * 100).toFixed(5) });
        }

        setPMF(data);
    }   

    // cdf (cummulatibe distributive function (probability of <= k wins))
    // const generateCDF = () => {
    //     if (pmf.length === 0) return;
    //     let cummulative = 0;
    //     let data = [];

    //     pmf.forEach((row) => {
    //         cummulative += parseFloat(row.prob);
    //         data.push({
    //             k: row.k,
    //             cdf: cummulative.toFixed(3)
    //         });
    //     });

    //     setCDF(data);
    // }

    // expected value and variance
    const expected = (games * winRate).toFixed(2);
    const variance = (games * winRate * (1 - winRate)).toFixed(2);
    const stddev = Math.sqrt(games * winRate * (1 - winRate)).toFixed(2);

    return (
        <div className="p-6 min-h-screen text-black" style={{ backgroundColor: "#ffa4a4ff", fontFamily: "JosefinSans", height: "auto" }}>
            <div className="text-center p-6" style={{ backgroundColor: "#fdf2f2ff", borderRadius: "50px" }}>
                <span className="text-5xl">What Are The Odds?</span>

                {statistics && (
                    <p>
                        Given my win rate of <strong>{winRatePercent}%</strong>, what are the odds that I win at least <strong>{wins}</strong> of <strong>{games}</strong> upcoming blackjack games?
                    </p>
                )}

                <div className="p-6">
                    <label style={{ borderBottom: "5px solid #cc2424ff" }}>Upcoming Games</label>
                    <input type="number" className="w-100 text-center"
                        value={games}
                        onChange={(e) => setGames(+e.target.value)}
                    />
                </div>

                <div className="p-6">
                    <label style={{ borderBottom: "5px solid #cc2424ff" }}>Desired Wins</label>
                    <input type="number" className="w-100 text-center"
                        value={wins}
                        onChange={(e) => setWins(+e.target.value)}
                    />
                </div>

                <button className="p-6 mb-3"
                    style={{ backgroundColor: "#df7575ff", borderRadius: "50px" }}
                    onClick={calculateProbability}>
                    Calculate
                </button>

                {result && <p className="text-2xl">Probability of Winning: {result}%</p>}
            </div>

            <br />

            {/* expected value */}
            <div className="text-center p-6" style={{ backgroundColor: "#fdf2f2ff", borderRadius: "50px" }}>
                <span className="text-5xl">Distribution Statistics</span>

                <div className="mt-3">
                    <label style={{ borderBottom: "5px solid #cc2424ff" }}>Expected Wins</label>
                    <p><strong>{expected}</strong></p>
                    
                    <label style={{ borderBottom: "5px solid #cc2424ff" }}>Variance</label>
                    <p><strong>{variance}</strong></p>
                    
                    <label style={{ borderBottom: "5px solid #cc2424ff" }}>Standard Deviation</label>
                    <p><strong>{stddev}</strong></p>
                </div>
            </div>

            <br />

            {/* pmf generation */}
            <div className="text-center p-6" style={{ backgroundColor: "#fdf2f2ff", borderRadius: "50px" }}>
                <span className="text-5xl">PMF Table (Probability of Exactly k Wins)</span>

                <br />
                <br />

                <div className="mb-3">
                    <p>Input the number of upcoming games and then generate your table.</p>
                    <button className="p-6 border-8 border-red-400"
                        style={{ backgroundColor: "#922e2eff", borderRadius: "50px", textAlign: "center" }}
                        onClick={generatePMF}>
                        Generate PMF Table & Graph
                    </button>
                </div>

                {pmf.length > 0 && (
                    <table className="table-atuo mx-auto border-collapse border-5 border-red-400">
                        <thead>
                            <tr className="bg-red-500">
                                <th className="border-3 border-red-500 px-4 py-2">Wins (k)</th>
                                <th className="border-3 border-red-500 px-4 py-2">P(X = k) %</th>
                            </tr>
                        </thead>

                        <tbody>
                            {pmf.map((row) => (
                                <tr key={row.k}>
                                    <td className="border-3 border-red-500 px-4 py-2">{row.k}</td>
                                    <td className="border-3 border-red-500 px-4 py-2">{row.prob}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <br />

                {/* pmf graph */}
                {pmf.length > 0 && (
                    <div className="text-center">
                        <span className="text-5xl">PMF Table (Probability of Exactly k Wins)</span>

                        <br /><br />

                        <LineChart width={600} height={300} data={pmf} className="mx-auto">
                            <XAxis dataKey="k" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="prob" stroke="#941c1cff" />                     </LineChart>
                    </div>
                )}
            </div>

            <br />

            {/* cdf button */}
            {/* {pmf.length > 0 && (
                <div className="text-center align-center">
                    <button className="p-6 border-8 border-red-400"
                        style={{ backgroundColor: "#922e2eff", borderRadius: "50px", textAlign: "center" }}
                        onClick={generateCDF}>
                        Generate CDF Graph
                    </button>
                </div>
            )} */}

            <br />

            {/* cdf graph */}
            {/* {cdf.length > 0 && (
                <div className="text-center">
                    <span className="text-5xl">Cummulative Distribution</span>

                    <br />

                    <LineChart width={600} height={300} data={cdf} className="mx-auto">
                        <XAxis dataKey="k" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="cdf" stroke="#8b1818ff" />
                    </LineChart>
                </div>
            )} */}
        </div>
    );
};

export default BinomialDistribution;