import { Mutation } from './types';

export default {
    /**
     * @name setData
     * @param {object} state
     * @param {array} data
     */
    [Mutation.SET_DATA] (state, data) {
        state.tableData = data;
    },

    /**
     * @name addNewData
     * @param {object} state
     * @param {object} config
     */
    [Mutation.ADD_NEW_DATA] (state, config) {
        state.tableData.push(config);
    }
}