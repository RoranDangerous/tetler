export const rotate = <T>(arr: T[][]): T[][] => {
    const newArr = [];
    for (let j = 0; j < arr[0].length; j++) {
        const row = [];
        for (let i = arr.length - 1; i >= 0; i--) {
            row.push(arr[i][j]);
        }
        newArr.push(row);
    }
    return newArr;
}

export const shuffle = <T>(arr: T[]): T[] => {
    let currentIndex = arr.length, randomIndex;
    const newArray = [...arr];

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [newArray[currentIndex], newArray[randomIndex]] = [
            newArray[randomIndex], newArray[currentIndex]];
    }

    return newArray;
}