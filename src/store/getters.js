export default {
    getMaximumID: state =>
        state.tableData.reduce((accumulator, data) => {
            return accumulator > data.id ? accumulator : data.id
        }, 0)
};