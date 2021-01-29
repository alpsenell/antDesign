export default {
    getMaximumID(state) {
        state.tableData.reduce((accumulator, data) => accumulator < data.id ? data.id : accumulator, 0)
    }
};