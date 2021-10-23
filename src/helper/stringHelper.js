

export function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export const requestSearch = (searchText, data) => {
    const searchRegex = new RegExp(escapeRegExp(searchText), 'i');
    const filteredRows = data?.filter((row) => {
        return Object.keys(row).some((field) => {
            return searchRegex.test(row[field].toString());
        });
    });
    return filteredRows;
};