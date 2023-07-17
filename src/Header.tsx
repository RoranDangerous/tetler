import { css } from "@emotion/css"

export const Header = () => {
    return (
        <div className={css({
            width: "100vw",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            boxShadow: "0px 2px 10px #000",
        })}>
            <p className={css({
                textAlign: "center",
                fontSize: "2rem",
                margin: "0.2rem 0",
                fontWeight: "bold"
            })}>Tetler</p>
        </div>
    )
}