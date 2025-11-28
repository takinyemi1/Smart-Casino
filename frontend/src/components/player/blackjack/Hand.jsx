import React from "react";
import Card from "./Card";

const Hand = ({title, cards}) => {
    const getTitle = () => {
        if (cards.length > 0) {
            return (
                <h1>{title}</h1>
            );
        }
    }

    return (
        <div>
            {getTitle()}

            <div className="flex justify-center items-center align-center mt-2">
                {cards.map((card, index) => {
                    return (
                        <Card key={index} value={card.value} suit={card.suit} hidden={card.hidden} />
                    );
                })}
            </div>
        </div>
    );
}

export default Hand;