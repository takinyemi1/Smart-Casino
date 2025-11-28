import React from "react";

// Removed TypeScript type annotation and type definition

const Card = ({ suit, value, hidden }) => {
    const getColor = () => {
        if (suit === '♠' || suit === '♣') {
            return 'black';
        } else {
            return '#b80f0fff';
        }
    }

    const getCard = () => {
        if (hidden) {
            return (
                <div
                    className="w-20 h-28 bg-red-600 border-2 border-black rounded-lg p-2 m-2"
                >{}</div>
            )
        } else {
            return (
                <div className="flex flex-row justify-center items-center align-center w-20 h-28 bg-white border-2 border-black rounded-lg p-2 m-2">
                    <div className="m-auto text-3xl">
                        <div className={getColor()}>
                            <span>{value}</span>
                            <span>{suit}</span>
                        </div>
                    </div>
                </div>
            );
        }
    }

    return (
        <>
            <div>
                {getCard()}
            </div>
        </>
    );
}

export default Card;