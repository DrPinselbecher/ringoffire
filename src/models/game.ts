export class Game {
    public players: string[] = [];
    public playerProfileImages: string[] = [];
    public stack: string[] = [];
    public playedCards: { name: string, rotation: number }[] = [];
    public currentPlayer: number = 0;

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
        for (let i = 1; i < 9; i++) {
            this.playerProfileImages.push('player_profile_image_' + i);
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