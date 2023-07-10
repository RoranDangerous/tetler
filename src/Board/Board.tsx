import { css } from "@emotion/css";
import { Cell } from "./Cell";
import { useBoardStyles } from "./styles";
import { useContext } from "react";
import { GameContext } from "../Context";

type BoardProps = {
}

export const Board: React.FC<BoardProps> = () => {
    const styles = useBoardStyles();
    const { state, onCellClick } = useContext(GameContext);

    return (
        <div className={styles.board}>
            {state.map((cell, i) => <Cell key={i} onClick={() => onCellClick(i)} isSelected={cell.isSelected} />)}
        </div>
    );
}