import { css } from "@emotion/css";

export const Button = ({ ...buttonProps }) => (
    <button className={css({
        backgroundColor: "#20b574",
        color: "white",
        padding: "1.2rem",
        width: "350px",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        margin: "1.5rem auto 0 auto",
        fontSize: "1rem",
        maxWidth: "90vw",
        "&:hover": css({
            opacity: "0.8",
        }),

        "&:disabled": css({
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            cursor: "not-allowed",
            color: "white",
        })
    })} {...buttonProps}>

    </button>
)