import { useContext } from "react";
import { useCellStyles } from "./styles";
import { GameContext } from "../Context";

type CellProps = {
    i: number,
    j: number,
}

export const Cell: React.FC<CellProps> = ({ i, j }) => {
    const { state, onCellClick } = useContext(GameContext);
    const styles = useCellStyles({ isSelected: state[i][j].isSelected, color: state[i][j].pieceColor });

    return (
        <div className={styles} onClick={() => onCellClick(i, j)}></div>
    )
}