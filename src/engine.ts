import { colors as availableColors } from "./colors";
import { Piece } from "./types";
import { cut, shuffle } from "./arrayUtils";

export class Game {
    size: number = 5; // board size NxN
    maxSize: number = 5; // max size of each piece
    minSize: number = 2; // min size of each piece
    state: number[][]; // winning state
    pieces: Piece[]; // list of game pieces
    numPieces: number = 0;

    constructor() {
        (Math as any).seedrandom("12345");

        this.state = [...Array(5)].map(() => [...Array(this.size).fill(0)]);
        this.pieces = [];

        this.generate()

        this.getPieces();

        console.log(this.state, this.numPieces)
        console.log(this.pieces)
    }

    generate() {
        let element = 1;
        const sizes: number[] = [];

        const pick = (currentElement: number) => {
            if (sizes[currentElement] === this.maxSize) {
                return;
            }

            const probability = sizes[currentElement] < this.minSize ? 1 : 0.6;

            return Math.random() < probability;
        }

        const next = (i: number, j: number, currentElement?: number) => {
            if (this.state[i][j]) {
                return;
            }

            if (!currentElement) {
                this.numPieces = element;
                currentElement = element;
                element += 1;
            }

            this.state[i][j] = currentElement;

            if (!sizes[currentElement]) {
                sizes[currentElement] = 0
            }
            sizes[currentElement] += 1

            // rotate next pick to avoid straight lines
            if (this.state[i + 1]?.[j] === 0 && pick(currentElement)) {
                next(i + 1, j, currentElement);
            }

            if (this.state[i][j + 1] === 0 && pick(currentElement)) {
                next(i, j + 1, currentElement);
            }

            if (this.state[i][j - 1] === 0 && pick(currentElement)) {
                next(i, j - 1, currentElement);
            }

            if (this.state[i - 1]?.[j] === 0 && pick(currentElement)) {
                next(i - 1, j, currentElement);
            }
        }

        this.state.forEach((row, i) => {
            row.forEach((_, j) => {
                next(i, j);
            })
        })
    }

    getPieces() {
        const clean = (shape: number[][], id: number): (0 | 1)[][] =>
            [...shape.map((row) => row.map((n) => n === id ? 1 : 0))]


        const colors = shuffle(availableColors)
        for (let i = 1; i <= this.numPieces; i++) {
            const piece = cut(this.state, (v) => v === i);
            this.pieces.push({
                id: i,
                shape: clean(piece, i),
                color: colors[i - 1] ?? "white",
                isUsed: false
            })
        }

        this.pieces = shuffle(this.pieces);
    }
}