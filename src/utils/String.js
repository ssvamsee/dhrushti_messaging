export const capitalize = (word) => {
    if (!word || word.length === 0) {
        return '';
    }
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
}
