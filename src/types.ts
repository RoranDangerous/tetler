export type Cell = {
    isSelected: boolean,
    pieceId: number | null,
    pieceColor: string | null,
}

export type Piece = {
    id: number;
    shape: (0 | 1)[][];
    color: string;
    isUsed: boolean;
}