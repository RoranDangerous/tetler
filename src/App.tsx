import { css } from "@emotion/css"
import { Board } from "./Board"
import { useState } from "react"
import { Cell, Piece } from "./types";
import { GameContext } from "./Context";
import { Button } from "./Button";
import { Game } from "./engine";
import { Pieces } from "./Pieces";
import { cut, matches } from "./arrayUtils";
import { addPiece, getSelectedPieceId, isCompleted, isPieceSelected, nothingIsSelected, removePiece, selectPieceCells, unselectAll, unselectPieceCells } from "./gameUtils";
import { Header } from "./Header";
import toast, { Toaster } from 'react-hot-toast';

const game = new Game();

export const App = () => {
  const [state, setState] = useState<Cell[][]>([...Array(game.size)].map(() => [...Array(game.size)].map(() => ({
    isSelected: false,
    pieceId: null,
    pieceColor: null,
  }))));
  const [pieces, setPieces] = useState<Piece[]>([...game.pieces]);

  const handleCellClick = (i: number, j: number) => {
    if (isCompleted(state)) {
      return;
    }

    if (state[i][j].pieceId) {
      const newState = selectPieceCells(state, state[i][j].pieceId);
      setState(newState);
      return
    }

    const newState = unselectPieceCells(state);
    newState[i][j].isSelected = !newState[i][j].isSelected;
    setState(newState)
  }

  const placePiece = () => {
    if (nothingIsSelected(state)) {
      return
    }

    const currentPiece = cut(state, (p) => p.isSelected).map((row) => row.map(({ isSelected }) => isSelected ? 1 : 0))

    const newPieces = [...pieces];
    let added = false;
    for (let i = 0; i < newPieces.length; i += 1) {
      if (!newPieces[i].isUsed && matches(currentPiece, newPieces[i].shape)) {
        added = true;
        newPieces[i].isUsed = true;
        setPieces(newPieces);

        const newState = unselectAll(addPiece(state, newPieces[i]));
        setState(newState)
        break;
      }
    }

    if (!added) {
      toast.error("Element of this shape is not available")
    }

    if (isCompleted(state)) {
      toast.success("Excellent!");
    }
  }

  const handleRemove = () => {
    const pieceId = getSelectedPieceId(state);
    const newState = unselectAll(removePiece(state, pieceId));
    setPieces(pieces.map((piece) => piece.id === pieceId ? ({ ...piece, isUsed: false }) : piece))
    setState(newState);
  }

  const shareResults = () => {
    const firstPuzzleDate = new Date();
    firstPuzzleDate.setDate(16)
    firstPuzzleDate.setMonth(6)
    firstPuzzleDate.setFullYear(2023)
    const today = new Date();
    const number = Math.round((today.getTime() - firstPuzzleDate.getTime()) / (1000 * 3600 * 24))
    navigator.clipboard.writeText(`Tetler #${number + 1} ✅\n\n${window.location.href}`);
    toast("Copied to clipboard")
  }

  return (
    <GameContext.Provider value={{ state, onCellClick: handleCellClick, pieces, size: game.size }}>
      <div className={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#121213",
      })}>
        <Header />
        <div className={css({
          display: "flex",
          flexDirection: "column"
        })}>
          <Pieces />
          <Board />
        </div>

        {isCompleted(state) ? (
          <Button onClick={shareResults} className={css({ backgroundColor: "#468C98" })}>Share</Button>
        ) : isPieceSelected(state) ? (
          <Button onClick={handleRemove} className={css({ backgroundColor: "#ff3939" })}>Remove</Button>
        ) : (
          <Button onClick={placePiece} disabled={nothingIsSelected(state)}>Add</Button>
        )}
      </div>
      <Toaster />
    </GameContext.Provider>
  )
}