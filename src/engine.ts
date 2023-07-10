import { colors as availableColors } from "./colors";
import { Piece } from "./types";
import { rotate, shuffle } from "./utils";

export class Game {
    size: number = 5; // board size NxN
    maxSize: number = 5; // max size of each piece
    minSize: number = 2; // min size of each piece
    state: number[][];
    pieces: Piece[];
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
        const cut = (id: number) => {
            let clone = [...this.state.map((r) => [...r])];

            const cutTop = () => {
                while (true) {
                    for (let j = 0; j < clone[0].length; j++) {
                        if (clone[0][j] === id) {
                            return;
                        }
                    }
                    clone = clone.slice(1)
                }

            }

            cutTop();
            clone = rotate(clone);
            cutTop();
            clone = rotate(clone);
            cutTop();
            clone = rotate(clone);
            cutTop();
            clone = rotate(clone);
            return clone
        }

        const clean = (shape: number[][], id: number): (0 | 1)[][] =>
            [...shape.map((row) => row.map((n) => n === id ? 1 : 0))]


        const colors = shuffle(availableColors)
        for (let i = 1; i <= this.numPieces; i++) {
            const piece = cut(i);
            this.pieces.push({
                id: i,
                shape: clean(piece, i),
                color: colors[i - 1] ?? "white"
            })
        }

        this.pieces = shuffle(this.pieces);
    }
}