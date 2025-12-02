# Smart Casino

Author: Temidayo Akinyemi

Smart Casino is a web application that demonstrates the connection between mathematics and casino games. The playable casino games are Blackjack, Roulette, and Bingo.
This website utilizes MERN (MongoDB, Express.js, React.js, and Node.js).

## Features
- [x] **The site has a dashboard displaying each of the available games to play**
  - Each game (Blackjack, Roulette, and Bingo) are displayed in a carousel, equipped with brief descriptions and an action button inviting the player to the individual game page.
- [x] **Blackjack**
  - The player can play Blackjack (first-time players have a beginning balance of $1000)
    - Players can bet any amount up to their balance
    - Players can view a how-to-play Blackjack video tutorial through YouTube embedding
    - Players can view sections for Blackjack Rules and Blackjack Actions
- [x] **Statistics Page**
  - This page holds buttons where the player can choose to view their statistics through Binomial Distribution, Poisson Distribution, or Baye's Theorem.
    - [x] **Blackjack**
      - [x] **What are the Odds?**
        - Page displays the player's odds of winning X out of Y games based on their win rate.
        - Page displays distribution statistics
          - Player can view their expected wins
          - Player can view their variance (measure of how much their number of wins can fluctuate from game to game)
          - Player can view their standard deviation (indicates how much the number of expected wins deviates from the number of actual wins)
        - Page displays PMF (Probability Mass Function Graph) which provides the probability of a discrete random variable's possible values and their associated probabilities
        - Page displays PMF chart that displays the likelihood of exactly _k_ wins up to how many upcoming games the player set
- [x] **Profile Page**
  - Player can view profile page that displays general information including their name, profession, and age. 
- [x] **Player Statistics Page**
  - Page displays player's individual statistics including individual game balance, game wins, game losses, game ties, and total time elapsed
  - Page displays player's individual history including the bet amount, the round outcome, payout, and timestamp

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXJnajJibzl6N3Z3eXdwODFldzV0aXJnNzZkbjIxb2s3Z3U0cmVwMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8NBF4jgp6zyDk5uB5W/giphy.gif' title='Smart Casino Blackjack Video Walkthrough' width='' alt='Smart Casino Blackjack Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with <a href='https://www.bing.com/search?q=licecap&cvid=90c75dac1b13474cb222b3d1f03d6cc7&gs_lcrp=EgRlZGdlKgYIABBFGDsyBggAEEUYOzIGCAEQABhAMgYIAhAAGEAyBggDEAAYQDIGCAQQABhAMggIBRDpBxj8VdIBCDI2ODhqMGo5qAIIsAIB&FORM=ANAB01&PC=U531'>LICEcap</a>  
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->
