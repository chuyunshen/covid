export const convertToDate = ( dateString )  => {
    return new Date(dateString.slice(4, 8), dateString.slice(0, 2) - 1, dateString.slice(2, 4));
}
