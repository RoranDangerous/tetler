import { css } from "@emotion/css"
import { Board } from "./Board"
import { useState } from "react"
import { Cell } from "./types";
import { GameContext } from "./Context";
import { Button } from "./Button";
import { Game } from "./engine";
import { Pieces } from "./Pieces";

const game = new Game();

export const App = () => {
  const [state, setState] = useState<Cell[]>([...Array(game.size * game.size)].map(() => ({
    isSelected: false
  })));

  const handleCellClick = (index: number) => {
    const newState = state;
    newState[index].isSelected = !newState[index].isSelected;
    setState([...newState])
  }

  return (
    <GameContext.Provider value={{ state, onCellClick: handleCellClick, pieces: game.pieces }}>
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
        <Button>Hello</Button>
      </div>
    </GameContext.Provider>
  )
}