/**
 * 
 * @param {*} data 
 * @returns 
 */

String.prototype.requestSearch = function (data) {
    const filteredRows = data?.filter((row) => {
        return row.name.toLowerCase().includes(this.toLowerCase());
    });
    return filteredRows;
};