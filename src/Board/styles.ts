import { css } from "@emotion/css";

export const useBoardStyles = () => ({
    board: css({
        display: "inline-grid",
        gap: "2px",
        gridTemplateColumns: "repeat(5, 1fr)",
        width: "350px",
        height: "350px"
    }),
})

export const useCellStyles = ({ isSelected }: { isSelected: boolean }) => css({
    border: "2px solid #3a3a3c",
    borderColor: isSelected ? "#6868ea" : "#3a3a3c"
})
