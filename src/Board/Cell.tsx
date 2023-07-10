import { useCellStyles } from "./styles";

type CellProps = {
    onClick: () => void;
    isSelected?: boolean
}

export const Cell: React.FC<CellProps> = ({ isSelected = false, onClick }) => {
    const styles = useCellStyles({ isSelected });

    return (
        <div className={styles} onClick={onClick}></div>
    )
}