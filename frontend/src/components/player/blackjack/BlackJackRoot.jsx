import React from "react";
import Home from "./Home";
import blackjackProb from '../../../assets/blackjack-probability.png';
import exceed21 from '../../../assets/exceed-21.png';

const BlackJackRoot = () => {    
    return (
        <>
            <div className="p-6 min-h-screen justify-center w-auto" style={{fontFamily: "JosefinSans", height: "auto", width: "auto", backgroundColor: "#ffa4a4ff"}}>
                <div className="flex justify-between gap-2">
                    {/* Blackjack Game */}
                    <div className="p-6 rounded w-100 text-white text-center" style={{backgroundColor: "#8d0a0aff", height: "auto"}}>
                        <h1>Play Blackjack.</h1>
                        <div className="text-black">
                            <Home />
                        </div>
                    </div>

                    <div>
                        {/* How to Play Blackjack */}
                        <div className="p-6 rounded w-100 text-white" style={{backgroundColor: "#8d0a0aff", height: "auto"}}>
                            <h2 className="text-center">How-to-Play Blackjack</h2>

                            <div className="mt-3">
                                <iframe
                                    width="600"
                                    height="360"
                                    src="https://www.bing.com/videos/riverview/relatedvideo?q=how+to+play+blackjack&&mid=B36F79C9BE2BF371B5C4B36F79C9BE2BF371B5C4&FORM=VCGVRP"
                                    title="How to Play (and Win) at Blackjack: The Expert's Guide"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
                                    gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="rounded-2"
                                >
                                </iframe>   
                            </div>

                            {/* Button Scroll Controls */}
                            <div className="mt-10">
                                <ul className="nav-pills flex flex-row gap-2 justify-between">
                                    <li className="nav-item">
                                        <a className="nav-link" href="#blackjack-rules">
                                            <span style={{backgroundColor: "#3b0909ff", borderRadius: "50px"}} className="p-3 border-5 border-red-300">Blackjack Rules</span>
                                        </a>
                                    </li>

                                    <li className="nav-item">
                                        <a className="nav-link" href="#blackjack-actions">
                                            <span style={{backgroundColor: "#3b0909ff", borderRadius: "50px"}} className="p-3 border-5 border-red-300">Blackjack Actions</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Blackjack */}
                        <div className="p-6 mt-3 rounded w-100 text-white text-center scroll-box h-90 overflow-y-auto items-center justify-center align-center mx-0 w-100 border-1 border-red-700 scrollbar" 
                            style={{backgroundColor: "#500808ff", height: "100vh"}} 
                            data-bs-spy="scroll" 
                            data-bs-offset="0" 
                            data-bs-smooth-scroll="true" 
                            tabIndex="0" 
                        >
                            {/* Blackjack Rules */}
                            <div>
                                <h2 id="blackjack-rules">Blackjack Rules</h2>

                                {/* Rules */}
                                <div>
                                    <div className="p-6">
                                        <div 
                                            data-bs-spy="scroll" 
                                            data-bs-offset="0" 
                                            data-bs-smooth-scroll="true" 
                                            tabIndex="0" 
                                            className="scroll-box h-90 overflow-y-auto items-center justify-center align-center mx-0 w-100 border-1 border-white rounded p-6 scrollbar"
                                        >
                                            <div className="text-left mt-2">
                                                <li>The goal of Blackjack is to get 21 with our cards or a higher value than the dealer, without exceeding the number.</li>
                                                <li>If we exceed 21 or add a lower value than the dealer, we lose the round.</li>
                                                <li>Once bets are placed, 2 visible cards are dealt to each player and only one for the dealer.</li>
                                                <li>In this version, players must only decide whether to "Hit" or "Stand".</li>
                                                <li>All cards are worth the numerical value they have (i.e., 2-10), except for figures that are worth 10, and the ACE that can be worth 1 or 11 to our interest.</li>
                                                <li>Payments are made at the same time, and we can get 21 with more than two cards, but it will only be considered Blackjack when the game is done with 2 cards.</li>
                                                <li>The house can only hit or stand, and only hits when its hand is below 17. That's so if it reaches or exceeds that value, it must stand.</li>
                                                <li>In the case of the dealer going over 21, the players who are still at the table will win their bets.</li>
                                                <li>In the case of a tie, the player will regain their bet.</li>
                                                {/* <li></li> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr />

                            {/* Blackjack Actions */}
                            <div>
                                <h2 id="blackjack-actions">Blackjack Actions</h2>

                                {/* Rules */}
                                <div>
                                    <div className="p-6">
                                        <div 
                                            data-bs-spy="scroll" 
                                            data-bs-offset="0" 
                                            data-bs-smooth-scroll="true" 
                                            tabIndex="0" 
                                            className="scroll-box h-90 overflow-y-auto items-center justify-center align-center mx-0 w-100 border-1 border-white rounded p-6 scrollbar"
                                        >
                                            <div className="text-left mt-2">
                                                <div>
                                                    <p className="text-2xl">Hit/Stand</p>
                                                    <p className="text-red-200">You can hit while the sum does not exceed 21. Depending on the card given, you may be closer to 21, or instead you will lose the bet if you go over 21.</p>
                                                </div>

                                                <div>
                                                    <p className="text-2xl">Double Down</p>
                                                    <p className="text-red-200">To double down, you need a hand which obgligatorily sums 9, 10, or 11 {">>"} which can only be done at the beginning of the round.</p>
                                                    <p className="text-red-200">If you double your bet, you can only receive one more card.</p>
                                                </div>

                                                <div>
                                                    <p className="text-2xl">Split</p>
                                                    <p className="text-red-200">If your cards have the smae value, you can split each card into different hands to play them at the same time, but for that, it's obligatory to add a bet as the initial.</p>
                                                    <p className="text-red-200">**With a split hand, even if we sum 21 with the next card, it's not considered blackjack.</p>
                                                    <p className="text-red-200">**After splitting, most casinos allow players to double the resulting new hands, and this gives the player some advantage.</p>
                                                </div>

                                                <div>
                                                    <p className="text-2xl">Insurance Betting</p>
                                                    <p className="text-red-200">If the card uncovered by the dealer is an <b>Ace</b>, you can bet to insurance if you feel that the house (dealer) will get blackjack.</p>
                                                    <p className="text-red-200">If you bet and finally get it, the player will be rewarded.</p>
                                                </div>

                                                <div>
                                                    <p className="text-2xl">Leave</p>
                                                    <p className="text-red-200">If the player leaves, they will only lose half the bet.</p>
                                                    {/* <p className="text-red-200"></p> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
                {/* Mathematics of Blackjack */}
                <div className="p-6 mt-3 rounded w-100 text-white text-center" style={{backgroundColor: "#8d0a0aff", height: "auto"}}>
                    <h2 id="blackjack-mathematics">The Mathematics of Blackjack</h2>

                    <div>
                        <p className="text-left">
                            To analyze Blackjack at a mathematical level, understand that a French Deck has 52 cards:
                            <li className="font-bold">4 of them are Ace</li>
                            <li className="font-bold">16 of them are 10 or Face card</li>
                            <li className="font-bold">The remaining 32 cards are numbers from 2 to 9</li>
                        </p>

                        <p className="text-left">
                            Conclusions can be drawn:
                            <li>Just about <b>1/3 of the cards have the value 10</b> (which takes a fundamental weight).</li>
                            <li>After that, there are only <b>4 cards that are Ace</b>, so if you want to get a blackjack, you will need an Ace. But the question is... <b>what is the probability of obtaining one?</b></li>
                        </p>

                        <p className="text-left">
                            The <b>probability of getting Blackjack</b> are the ways we have to get 21 with 2 cards of all possible combinations to pull 2 cards out of the deck.
                            In other words, <b>favorable cases between possible cases</b>, which is not the same as <b>odds</b>; <b>even</b> are related.
                        </p>

                        <p className="text-left">
                            To get 21 with 2 cards, you need an Ace and a 10. In the deck, there are <b>4 Aces and 16 tens</b> (between face cards and 10 value cards).
                            On the other hand, all combinations of 2 cards {"=>"} <b>combinations of 52 elements taken 2 at a time</b> (where the order doesn't matter and they can't be repeated).
                        </p>

                        <p className="text-left">So, the final probability is:</p>

                        <p className="text-left">
                            (4 ({"=>"} number of Aces) x 16 ({"=>"} number of 10s)) / (C(52 ({"=>"} number of elements),2 ({"=>"} number of cards taken at a time))) = 64/1326 OR a <b>4.8% chance</b> of getting Blackjack.
                        </p>

                        <p className="text-left text-2xl">
                            <b>C(52,2) = (52! / 2!(52 - 2)!)</b> AND ! = factorial (52 x 51 x 50...)
                        </p>

                        <div className="justify-center mx-auto align-center">
                            <img src={blackjackProb} className="rounded border-5 border-red-400" />
                        </div>

                        <p className="text-left mt-3">
                            In the case of playing with <b>several decks</b>, each figure/number maintains the same proportion due to its same 4 Aces in 52 cards, than 8 Aces in 104 cards.
                            But, the probability of getting a particular result varies slightly as it influences less to remove a card from a deck of 104, rather than a deck of 52. So, <b>each game with different decks has its own probabilistic study</b>.
                        </p>
                    </div>

                    <hr />

                    <div className="mt-2">
                        <h2 className="text-left" id="blackjack-exceed-21">Chances of Exceeding 21</h2>

                        <div>
                            <p className="text-left">
                                To calculate the probability of going over 21, you need to calculate the probability of going over for any hand.
                                <b>For that, you need to analyze the hand in hand.</b>
                            </p>

                            <p className="text-left">
                                <h4 className="underline">Scenario</h4>
                                Assume your hand value sums up to 12. When you hit, you are faced with the cases listed below:
                            </p>

                            <p className="text-left">
                                Conclusions can be drawn:
                            </p>

                            <div className="justify-center mx-auto align-center">
                                <img src={exceed21} className="rounded border-5 border-red-400" />
                            </div>

                            <p className="text-left mt-3">
                                Initially, there are 4 cases of 13 where you exceed 21. This is approximately a 30% chance ={">"} which means that if you have a hand value of 12, you have a 30% chance of going over 21 when you hit.
                            </p>

                            <p className="text-left">
                                By calculating the same for all possible hands, you can accurately obtain the following table:
                            </p>

                            <p className="text-left mt-3">
                                In the case of playing with <b>several decks</b>, each figure/number maintains the same proportion due to its same 4 Aces in 52 cards, than 8 Aces in 104 cards.
                                But, the probability of getting a particular result varies slightly as it influences less to remove a card from a deck of 104, rather than a deck of 52. So, <b>each game with different decks has its own probabilistic study</b>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlackJackRoot;