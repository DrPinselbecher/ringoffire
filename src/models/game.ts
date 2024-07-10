export class Game {
    public players: { name: string, image: string }[] = [
        {
            name: 'DrPinselbecher',
            image: 'player_profile_5'
        },
        {
            name: 'Zer0',
            image: 'player_profile_6'
        },
        {
            name: 'Schneeflocke',
            image: 'player_profile_4'
        },
        {
            name: 'HookToHell',
            image: 'player_profile_3'
        },
        {
            name: 'BuzzelBiber',
            image: 'player_profile_1'
        },
        {
            name: 'Messefarm',
            image: 'player_profile_9'
        },
        {
            name: 'Joshi',
            image: 'player_profile_7'
        },
        {
            name: 'GinForTheWin',
            image: 'player_profile_2'
        }
    ];
    public playerProfileImages: string[] = [];
    public stack: string[] = [];
    public playedCards: { name: string, rotation: number }[] = [];
    public currentPlayer: number = -1;
    public nextPlayer: number = 0;
    public pickCardAnimation: boolean = false;
    public currentCard: string | undefined = '';
    public currentRotation: number = 0;
    public invLinkCopied: boolean = false;

    public maximalPlayersAllowed: number = 9;
    public language: "en" | "de" = "en";


    constructor() {
        this.setCards();
        this.setPlayerProfileImages();
    }

    public toJson() {
        return {
            players: this.players,
            playerProfileImages: this.playerProfileImages,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            nextPlayer: this.nextPlayer,
            maximalPlayersAllowed: this.maximalPlayersAllowed,
            pickCardAnimation: this.pickCardAnimation,
            currentCard: this.currentCard,
            currentRotation: this.currentRotation,
            invLinkCopied: this.invLinkCopied
        };
    }

    setCards() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('ace_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('hearts_' + i);
        }
        shuffle(this.stack);
    }

    setPlayerProfileImages() {
        for (let i = 1; i < 10; i++) {
            this.playerProfileImages.push('player_profile_' + i);
        }
        shuffle(this.playerProfileImages);
    }
}

function shuffle(array: string[]) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
}