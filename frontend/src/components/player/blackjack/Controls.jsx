import React, { useEffect, useState } from "react";

const Controls = ({ balance, gameState, buttonState, betEvent, hitEvent, standEvent, resetEvent, canBet }) => {
    const [amount, setAmount] = useState(10);
    const [inputStyle, setInputStyle] = useState({});

    useEffect(() => {
        validation();
    }, [amount, balance]);

    // whether or not the bet input is valid
    const validation = () => {
        if (amount > balance) {
            setInputStyle({color: '#b80f0fff'});
            return false;
        } if (amount < 0.01) {
            setInputStyle({color: '#b80f0fff'});
            return false;
        }

        setInputStyle({color: "#fff"});
        return true;
    }

    const amountChange = (e) => {
        setAmount(parseFloat(e.target.value));
    }

    const onBetClick = () => {
        if (validation()) {
            betEvent(Math.round(amount * 100) / 100);
        }
    }

    const getControls = () => {
        if (gameState === 'bet') {
            return (
                <div className="flex flex-col gap-2 items-center justify-center mt-4">
                    <div className="justify-center items-center align-center p-2 rounded border-5 border-red-900"
                        style={{
                            backgroundColor: "rgba(226, 121, 121, 1)",
                        }}    
                    >
                        <h4 className="text-black">Amount</h4>
                        <input
                            type="text"
                            className="w-100 outline rounded text-center border-red-900 mx-auto items-center justify-center"
                            value={amount}
                            onChange={amountChange}
                            style={{
                                ...inputStyle,
                            }}
                        />
                    </div>

                    <button onClick={onBetClick} className="btn btn-outline mt-2 border-5 w-15" disabled={!canBet}
                        style={{
                            backgroundColor: "#d44949ff",
                            borderRadius: "30px",
                            border: "5px solid #7c1818ff",
                        }}
                    >
                        Bet
                    </button>
                </div>
            );
        } else {
            return (
                <div className="flex gap-4 justify-center justify-between align-center text-white">
                    <button onClick={() => hitEvent()} disabled={buttonState.hitDisabled} className="btn btn-outline text-white w-50" style={{backgroundColor: "#db4141ff", border: "5px solid #7c1818ff", borderRadius: "30px"}}>Hit</button>
                    <button onClick={() => standEvent()} disabled={buttonState.standDisabled} className="btn btn-outline text-white w-50" style={{backgroundColor: "#db4141ff", border: "5px solid #7c1818ff", borderRadius: "30px"}}>Stand</button>
                    <button onClick={() => resetEvent()} disabled={buttonState.resetDisabled} className="btn btn-outline text-white w-50" style={{backgroundColor: "#db4141ff", border: "5px solid #7c1818ff", borderRadius: "30px"}}>Reset</button>
                </div>
            );
        }
    }
    
    return (
        <>
            {/* Control buttons and balance display will go here */}
            {getControls()}
        </>
    )
}

export default Controls;