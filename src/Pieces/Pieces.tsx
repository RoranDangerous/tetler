import { useContext } from "react"
import { GameContext } from "../Context"
import { Piece } from "./Piece";
import { css } from "@emotion/css";

export const Pieces = () => {
    const { pieces } = useContext(GameContext);

    return (
        <div className={css({
            display: "inline-grid",
            gap: "2px",
            gridAutoFlow: "column"

        })}>
            {pieces.map((piece) => (
                <Piece key={piece.id} piece={piece} />
            ))}
        </div>
    )
}