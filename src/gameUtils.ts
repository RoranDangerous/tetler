import { Cell, Piece } from "./types";

export const unselectAll = (arr: Cell[][]): Cell[][] => {
    for (let i = 0; i < arr.length; i += 1) {
        for (let j = 0; j < arr[i].length; j += 1) {
            arr[i][j].isSelected = false;
        }
    }

    return [...arr]
}

export const selectPieceCells = (arr: Cell[][], pieceId: Cell["pieceId"]): Cell[][] => {
    for (let i = 0; i < arr.length; i += 1) {
        for (let j = 0; j < arr[i].length; j += 1) {
            arr[i][j].isSelected = pieceId === arr[i][j].pieceId;
        }
    }

    return [...arr]
}

export const unselectPieceCells = (arr: Cell[][]): Cell[][] => {
    for (let i = 0; i < arr.length; i += 1) {
        for (let j = 0; j < arr[i].length; j += 1) {
            if (arr[i][j].pieceId) {
                arr[i][j].isSelected = false;
            }
        }
    }

    return [...arr]
}

export const isPieceSelected = (arr: Cell[][]): boolean => {
    for (let i = 0; i < arr.length; i += 1) {
        for (let j = 0; j < arr[i].length; j += 1) {
            if (arr[i][j].isSelected && arr[i][j].pieceId) {
                return true;
            }
        }
    }

    return false
}

export const getSelectedPieceId = (arr: Cell[][]): Cell["pieceId"] => {
    for (let i = 0; i < arr.length; i += 1) {
        for (let j = 0; j < arr[i].length; j += 1) {
            if (arr[i][j].isSelected) {
                return arr[i][j].pieceId;
            }
        }
    }
    return null;
}

export const addPiece = (arr: Cell[][], piece: Piece): Cell[][] => {
    for (let i = 0; i < arr.length; i += 1) {
        for (let j = 0; j < arr[i].length; j += 1) {
            if (arr[i][j].isSelected) {
                arr[i][j].pieceId = piece.id;
                arr[i][j].pieceColor = piece.color;
            }
        }
    }

    return [...arr]
}

export const removePiece = (arr: Cell[][], pieceId: Cell["pieceId"]): Cell[][] => {
    for (let i = 0; i < arr.length; i += 1) {
        for (let j = 0; j < arr[i].length; j += 1) {
            if (arr[i][j].pieceId === pieceId) {
                arr[i][j].pieceId = null;
                arr[i][j].pieceColor = null;
            }
        }
    }

    return [...arr]
}

export const isCompleted = (arr: Cell[][]): boolean => {
    for (let i = 0; i < arr.length; i += 1) {
        for (let j = 0; j < arr[i].length; j += 1) {
            if (arr[i][j].pieceId === null) {
                return false;
            }
        }
    }

    return true
}

export const nothingIsSelected = (arr: Cell[][]): boolean => {
    for (let i = 0; i < arr.length; i += 1) {
        for (let j = 0; j < arr[i].length; j += 1) {
            if (arr[i][j].isSelected) {
                return false;
            }
        }
    }

    return true
}