import React from "react";

const Status = ({message, balance, elapsedTime, onStart, onPause, onResetGame, isTiming}) => {

    // format time
    const formatTime = (totalSeconds = 0) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    return (
        <>
            <div className="bg-red-200 border-8 border-red-400 mb-3 p-3" style={{borderRadius: "30px"}}>
                {/* time elapsed */}
                <h2>{formatTime(elapsedTime)}</h2>
                
                {/* start, pause, and reset buttons */}
                <div className="flex justify-center gap-3 mt-3">
                    <button
                        onClick={onStart}
                        disabled={isTiming}
                        className="bg-green-400 border-6 border-green-500 hover:bg-green-600 text-white py-2 px-4 disabled:opacity-50" style={{borderRadius: "30px"}}>
                            Start
                    </button>

                    <button
                        onClick={onPause}
                        disabled={!isTiming}
                        className="bg-yellow-400 border-6 border-yellow-500 hover:bg-yellow-600 text-gray-800 py-2 px-4 disabled:opacity-50" style={{borderRadius: "30px"}}>
                            Pause
                    </button>

                    <button
                        onClick={onResetGame}
                        disabled={isTiming}
                        className="bg-red-400 border-6 border-red-500 hover:bg-red-600 text-white py-2 px-4" style={{borderRadius: "30px"}}>
                            Reset
                    </button>
                </div>

            </div>

            <div className="flex gap-3 justify-between">
                <div className="flex flex-row justify-between items-center align-center w-full p-4 border-5 border-red-900 rounded-lg mb-4"
                    style={{backgroundColor: "#d13131ff", color: "white", fontSize: "1.5rem"}}
                >

                    <h1 className="text-center mx-auto">{message}</h1>
                </div>

                <div className="flex flex-row justify-between items-center align-center w-full p-4 border-5 border-red-900 rounded-lg mb-4"
                    style={{backgroundColor: "#d13131ff", color: "white", fontSize: "1.5rem"}}
                >
                    <h1>Balance: ${balance}</h1>
                </div>
            </div>
        </>
    );
}

export default Status;