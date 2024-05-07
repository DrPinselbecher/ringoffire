export class Game {
    public players: { name: string, image: string }[] = [
        {
            name: 'Seelenfuchs',
            image: ''
        },
        {
            name: 'Pinsel',
            image: ''
        },
        {
            name: 'Lexy',
            image: ''
        },
        {
            name: 'GinForTheWin',
            image: ''
        },
        {
            name: 'Krushnak',
            image: ''
        },
        {
            name: 'SoulSlice',
            image: ''
        },
        {
            name: 'Lorelay',
            image: ''
        },
        {
            name: 'Bibedoo',
            image: ''
        },
        {
            name: 'Messefarm',
            image: ''
        }];
    public playerProfileImages: string[] = [];
    public stack: string[] = [];
    public playedCards: { name: string, rotation: number }[] = [];
    public currentPlayer: number = -1;
    public nextPlayer: number = 0;
    public maximalPlayersAllowed: number = 9;
    public language: "en" | "de" = "en";


    constructor() {
        this.setCards();
        this.setPlayerProfileImages();
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