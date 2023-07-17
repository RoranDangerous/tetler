import { colors as availableColors } from "./colors";
import { Piece } from "./types";
import { cut, shuffle } from "./arrayUtils";

export class Game {
    size: number = 5; // board size NxN
    maxSize: number = 6; // max size of each piece
    minSize: number = 3; // min size of each piece
    state: number[][]; // winning state
    pieces: Piece[]; // list of game pieces
    numPieces: number = 0;

    constructor() {
        // Set seed to reset puzzle once a day
        const today = new Date();
        const seed = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
        (Math as any).seedrandom(seed);

        this.state = [...Array(5)].map(() => [...Array(this.size).fill(0)]);
        this.pieces = [];

        this.generate()

        this.getPieces();
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

            const nextPositions = shuffle([[i + 1, j], [i - 1, j], [i, j + 1], [i, j - 1]]);

            nextPositions.forEach(([ii, jj]) => {
                if (this.state[ii]?.[jj] === 0 && pick(currentElement!)) {
                    next(ii, jj, currentElement)
                }
            })
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