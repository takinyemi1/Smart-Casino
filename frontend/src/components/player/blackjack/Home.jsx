import React, { useEffect, useState } from "react";
import Status from "./Status";
import Controls from "./Controls";
import Hand from "./Hand";
import jsonData from '../blackjack/deck.json';
import axios from "axios";
import { useAuth } from "../../../context/authContext";
import { useParams } from "react-router";

const Home = () => {
    const {user} = useAuth();

    const [elapsedTime, setElapsedTime] = useState(0);
    const [isTiming, setIsTiming] = useState(false);
    const [canBet, setCanBet] = useState(false);

    const GameState = {
        BET: 'bet',
        INIT: 'init',
        USER_TURN: 'user_turn',
        DEALER_TURN: 'dealer_turn',
    };

    const Deal = {
        USER: 'user',
        DEALER: 'dealer',
        HIDDEN: 'hidden',
    };

    const Message = {
        BET: 'Place your Bet!',
        HIT_STAND: 'Hit or Stand?',
        BUST: 'Bust!',
        USER_WIN: 'You Win!', // eventually add the player's username
        DEALER_WIN: 'Dealer Wins!',
        TIE: 'Tie!',
    };

    const data = JSON.parse(JSON.stringify(jsonData.cards));
    const [deck, setDeck] = useState(data);

    const [userCards, setUserCards] = useState([]);
    const [userScore, setUserScore] = useState(0);
    const [userCount, setUserCount] = useState(0);

    const [dealerCards, setDealerCards] = useState([]);
    const [dealerScore, setDealerScore] = useState(0);
    const [dealerCount, setDealerCount] = useState(0);

    // set balance based on logged in user's balance
    const [balance, setBalance] = useState(() => {
        const savedBalance = localStorage.getItem("balance");
        return savedBalance ? parseFloat(savedBalance) : 1000;
    });

    const [bet, setBet] = useState(0);

    const [gameState, setGameState] = useState(GameState.BET);
    const [message, setMessage] = useState(Message.BET);
    const [buttonState, setButtonState] = useState({
        HIT_DISABLED: false,
        STAND_DISABLED: false,
        RESET_DISABLED: true,
    });

    // iinitialize the game
    useEffect(() => {
        if (gameState === GameState.INIT) {
            drawCard(Deal.USER);
            drawCard(Deal.HIDDEN);
            drawCard(Deal.USER);
            drawCard(Deal.DEALER);
            setGameState(GameState.USER_TURN);
            setMessage(Message.HIT_STAND);
        }
    }, [gameState]);

    // calculate the user's score
    useEffect(() => {
        calculate(userCards, setUserScore);
        setUserCount(userCount + 1);
    }, [userCards]);

    // calculate the dealer's score
    useEffect(() => {
        calculate(dealerCards, setDealerScore);
        setDealerCount(dealerCount + 1);
    }, [dealerCards]);

    // user turn logic
    useEffect(() => {
        if (gameState === GameState.USER_TURN) {
            if (userScore === 21) {
                buttonState.HIT_DISABLED = true;
                setButtonState({ ...buttonState });
            } else if (userScore > 21) {
                bust();
            }
        }
    }, [userCount]);

    // dealer turn logic
    useEffect(() => {
        if (gameState === GameState.DEALER_TURN) {
            if (dealerScore >= 17) {
                checkWin();
            }
            else {
                drawCard(Deal.DEALER);
            }
        }
    }, [dealerCount]);

    // save all game-related state to local storage when the user leaves the page
    useEffect(() => {
        const gameStateData = {
            balance,
            bet,
            userCards,
            dealerCards,
            gameState,
            message,
        }

        localStorage.setItem("blackjackGameState", JSON.stringify(gameStateData));
    }, [balance, bet, userCards, dealerCards, gameState, message]);

    // sync the balance every time it changes
    useEffect(() => {
        localStorage.setItem("balance", balance.toFixed(2));
    }, [balance]);

    // restore the information on reload
    useEffect(() => {
        const savedGameState = localStorage.getItem("blackjackGameState");

        if (savedGameState) {
            const {
                balance,
                bet,
                userCards,
                dealerCards,
                gameState,
                message,
            } = JSON.parse(savedGameState);

            setBalance(balance);
            setBet(bet);
            setUserCards(userCards);
            setDealerCards(dealerCards);
            setGameState(gameState);
            setMessage(message);
        }
    }, []);

    const resetGame = () => {
        console.clear();
        // setDeck(data);

        setUserCards([]);
        setUserScore(0);

        setDealerCards([]);
        setDealerScore(0);

        setBet(0);

        setGameState(GameState.BET);
        setMessage(Message.BET);
        setButtonState({
            HIT_DISABLED: false,
            STAND_DISABLED: false,
            RESET_DISABLED: true
        });
    }

    const placeBet = (amount) => {
        setBet(amount);
        setBalance(Math.round((balance - amount) * 100) / 100);
        setGameState(GameState.INIT);
    }

    const drawCard = (dealType) => {
        if (deck.length > 0) {
            const randomIndex = Math.floor(Math.random() * deck.length);
            const card = deck[randomIndex];
            const newDeck = [...deck];
            newDeck.splice(randomIndex, 1);
            setDeck(newDeck);

            console.log('Remaining Cards:', newDeck.length);

            const suits = {
                spades: '♠',
                diamonds: '♦',
                clubs: '♣',
                hearts: '♥'
            };

            dealCard(dealType, card.value, suits[card.suit]);
        } else {
            alert('All cards have been drawn');
        }
    };

    const dealCard = (dealType, value, suit) => {
        if (dealType === Deal.USER) {
            setUserCards(prev => [...prev, { value, suit, hidden: false }]);
        } else if (dealType === Deal.DEALER) {
            setDealerCards(prev => [...prev, { value, suit, hidden: false }]);
        } else if (dealType === Deal.HIDDEN) {
            setDealerCards(prev => [...prev, { value, suit, hidden: true }]);
        }
    }

    const revealCard = () => {
        const revealed = dealerCards.map(card => ({
            ...card,
            hidden: false
        }));
        setDealerCards(revealed);
    };

    const calculate = (cards, setScore) => {
        let total = 0;
        cards.forEach(card => {
            if (!card.hidden && card.value !== 'A') {
                switch (card.value) {
                    case 'K':
                    case 'Q':
                    case 'J':
                        total += 10;
                        break;
                    default:
                        total += Number(card.value);
                        break;
                }
            }
        });

        const aces = cards.filter(card => card.value === 'A');
        aces.forEach(card => {
            if (!card.hidden) {
                if (total + 11 > 21) total += 1;
                else if (total + 11 === 21 && aces.length === 1) total += 11;
                else total += 11;
            }
        });

        setScore(total);
    };

    const hit = () => {
        drawCard(Deal.USER);
    }

    const stand = () => {
        buttonState.HIT_DISABLED = true;
        buttonState.STAND_DISABLED = true;
        buttonState.RESET_DISABLED = false;

        setGameState(GameState.DEALER_TURN);
        revealCard();
    }

    const bust = () => {
        buttonState.HIT_DISABLED = true;
        buttonState.STAND_DISABLED = true;
        buttonState.RESET_DISABLED = false;

        setMessage(Message.BUST);
    }

    const checkWin = async () => {
        // modifications that record game results to the backend
        let outcome;
        let payout = 0;

        if (userScore > dealerScore || dealerScore > 21) {
            payout = bet * 2;
            setBalance(balance + payout);
            setMessage(Message.USER_WIN);
            outcome = "win";
        }
        else if (dealerScore > userScore) {
            setMessage(Message.DEALER_WIN);
            outcome = "loss";
        }
        else {
            setBalance(Math.round((balance + (bet * 1)) * 100) / 100);
            setMessage(Message.TIE);
            outcome = "tie";
        }

        // record the result in MongoDB
        try {
            const token = localStorage.getItem("sctoken");

            const response = await axios.post(`http://localhost:3001/api/game/${user.username}/stats`, {
                amount: bet, 
                    outcome, 
                    payout,
                    timePlayed: elapsedTime
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log("Game result recorded: ", response.data);
            setBalance(response.data.player.balance);

            // reset the timer after syncing
            setElapsedTime(0);
            localStorage.removeItem("elapsedTime");
        } catch (error) {
            console.error("Error recording game result: ", error);
        }
    }

    // start timing when the player begins round 1
    useEffect(() => {
        let timer;
        if (isTiming) {
            timer = setInterval(() => {
                setElapsedTime(prev => prev + 1);
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isTiming]);

    // start handler
    const onHandleStart = () => {
        setIsTiming(true);
        setCanBet(true); // bet button is enabled only after start button is clicked
    };

    // pause handler
    const onHandlePause = () => setIsTiming(false);

    // reset handler
    const onHandleResetGame = () => {
        setIsTiming(false);
        setElapsedTime(0);
        setCanBet(false);
        resetGame();
    }

    return (
        <>
            <div className="p-6 rounded" style={{backgroundColor: "#ffa4a4ff", height: "170vh"}}>
                <div className="rounded text-center">
                    <Status message={message} balance={balance} elapsedTime={elapsedTime} onStart={onHandleStart} onPause={onHandlePause} onResetGame={onHandleResetGame} isTiming={isTiming} />
                </div>

                <Controls
                    balance={balance}
                    gameState={gameState}
                    buttonState={buttonState}
                    betEvent={placeBet}
                    hitEvent={hit}
                    standEvent={stand}
                    resetEvent={resetGame}
                    canBet={canBet}
                />

                <div className="mt-5">
                    <Hand title={`Dealer's Hand (${dealerScore})`} cards={dealerCards} />
                    <br />
                    <Hand title={`Your Hand (${userScore})`} cards={userCards} />
                </div>
            </div>
        </>
    )
}

export default Home;