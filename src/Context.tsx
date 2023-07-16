import { createContext } from "react";
import { Cell, Piece } from "./types";

export const GameContext = createContext<{
    state: Cell[][];
    pieces: Piece[];
    onCellClick: (i: number, j: number) => void;
}>({
    state: [],
    onCellClick: () => { },
    pieces: []
})