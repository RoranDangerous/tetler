import { Cell } from "./Cell";
import { useBoardStyles } from "./styles";
import { ReactNode, useContext } from "react";
import { GameContext } from "../Context";

type BoardProps = {
}

export const Board: React.FC<BoardProps> = () => {
    const { state, size } = useContext(GameContext);
    const styles = useBoardStyles({ size });

    return (
        <div className={styles.board}>
            {state.reduce((prev, next, i) => [...prev, ...next.map((cell, j) => (
                <Cell key={i + "-" + j} i={i} j={j} />
            ))], [] as ReactNode[])}
        </div>
    );
}