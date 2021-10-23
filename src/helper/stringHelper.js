export const requestSearch = (searchText, data) => {
    const filteredRows = data?.filter((row) => {
        return row.name.toLowerCase().includes(searchText.toLowerCase());
    });
    return filteredRows;
};