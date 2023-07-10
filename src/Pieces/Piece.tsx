import { css } from "@emotion/css";
import { Piece as PieceType } from "../types";

export const Piece: React.FC<{ piece: PieceType }> = ({ piece }) => {

    return (
        <div className={css({
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        })}>
            <div className={css({
                display: "inline-grid",
                height: "fit-content",
                gap: "1px",
                gridTemplateColumns: `repeat(${piece.shape[0].length}, 1fr)`,
            })}>
                {piece.shape.reduce((i, j) => [...i, ...j.map((k) => (
                    <div className={css({
                        width: "8px",
                        height: "8px",
                        background: k === 1 ? piece.color : "unset"
                    })}></div>
                ))] as any, [])}
            </div>
        </div>
    )
}