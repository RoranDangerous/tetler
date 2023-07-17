import { css } from "@emotion/css";
import { Piece as PieceType } from "../types";
import { ReactNode } from "react";

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
                opacity: piece.isUsed ? 0.25 : 1
            })}>
                {piece.shape.reduce((i, j, ind) => [...i, ...j.map((k, i) => (
                    <div key={ind + "-" + i} className={css({
                        width: "15px",
                        height: "15px",
                        background: k === 1 ? piece.color : "unset"
                    })}></div>
                ))], [] as ReactNode[])}
            </div>
        </div>
    )
}