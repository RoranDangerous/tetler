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

const game = new Game();

export const App = () => {
  const [state, setState] = useState<Cell[][]>([...Array(game.size)].map(() => [...Array(game.size)].map(() => ({
    isSelected: false,
    pieceId: null,
    pieceColor: null,
  }))));
  const [pieces, setPieces] = useState<Piece[]>([...game.pieces]);

  const handleCellClick = (i: number, j: number) => {
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
      console.error("Select a piece")
      return

    }

    const currentPiece = cut(state, (p) => p.isSelected).map((row) => row.map(({ isSelected }) => isSelected ? 1 : 0))

    const newPieces = [...pieces];
    for (let i = 0; i < newPieces.length; i += 1) {
      if (!newPieces[i].isUsed && matches(currentPiece, newPieces[i].shape)) {
        newPieces[i].isUsed = true;
        setPieces(newPieces);

        const newState = unselectAll(addPiece(state, newPieces[i]));
        setState(newState)
        break;
      }
    }

    if (isCompleted(state)) {
      console.log("Completed!!!")
    }
  }

  const handleRemove = () => {
    const pieceId = getSelectedPieceId(state);
    const newState = unselectAll(removePiece(state, pieceId));
    setPieces(pieces.map((piece) => piece.id === pieceId ? ({ ...piece, isUsed: false }) : piece))
    setState(newState);

  }

  return (
    <GameContext.Provider value={{ state, onCellClick: handleCellClick, pieces }}>
      <div className={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#121213",
        padding: "1rem 0"
      })}>
        <div>Header here</div>
        <div className={css({
          display: "flex",
          flexDirection: "column"
        })}>
          <Pieces />
          <Board />
        </div>

        {isPieceSelected(state) ? (
          <Button onClick={handleRemove}>Remove</Button>
        ) : (
          <Button onClick={placePiece} disabled={nothingIsSelected(state)}>Add</Button>
        )}
      </div>
    </GameContext.Provider>
  )
}