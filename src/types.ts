export type Cell = {
    isSelected: boolean
}

export type Piece = {
    id: number;
    shape: (0 | 1)[][];
    color: string;
}