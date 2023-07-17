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

export const cut = <T>(arr: T[][], key: (p: T) => boolean): T[][] => {
    let clone = [...arr.map((r) => [...r])];

    const cutTop = () => {
        while (clone.length) {
            for (let j = 0; j < clone[0].length; j++) {
                if (key(clone[0][j])) {
                    return;
                }
            }
            clone = clone.slice(1)
        }

    }

    let count = 0;
    while (count < 4 && clone.length) {
        clone = rotate(clone);
        cutTop();
        count += 1

    }
    return clone
}

export const flip = <T>(arr: T[][]): T[][] => {
    const clone = [...arr.map((row) => [...row])]
    for (let i = 0; i < clone.length; i += 1) {
        for (let j = 0; j < clone[i].length / 2; j += 1) {
            const temp = clone[i][j]
            clone[i][j] = clone[i][clone[i].length - 1 - j];
            clone[i][clone[i].length - 1 - j] = temp
        }
    }

    return [...clone]
}

export const matches = <T>(arr1: T[][], arr2: T[][]): boolean => {
    const isEqual = (a1: T[][], a2: T[][]): boolean => {
        for (let i = 0; i < a1.length; i += 1) {
            for (let j = 0; j < a1[0].length; j += 1) {
                if (a1[i][j] !== a2[i][j]) {
                    return false
                }
            }
        }
        return true
    }

    let count = 0;
    while (count < 4) {
        if (arr1.length !== arr2.length || arr1[0].length !== arr2[0].length) {
            arr1 = rotate(arr1)
            count += 1;
            continue
        }

        if (isEqual(arr1, arr2)) {
            return true;
        }

        if (isEqual(flip(arr1), arr2)) {
            return true;
        }

        arr1 = rotate(arr1);
        count += 1
    }

    return false;
}