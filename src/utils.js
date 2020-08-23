export const convertToDate = ( dateString )  => {
    if (dateString.length === 8) {
        return new Date(dateString.slice(4, 8), dateString.slice(0, 2) - 1, dateString.slice(2, 4));
    } else {
        return new Date(dateString.slice(3, 7), dateString.slice(0, 1) - 1, dateString.slice(1, 3));
    }
}
