import Vue from 'vue';
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
     * @name addNewDataToState
     * @param {object} state
     * @param {object} config
     */
    [Mutation.ADD_NEW_DATA_TO_STATE] (state, config) {
        state.tableData.push(config);
    },

    /**
     * @name removeDataFromState
     * @param {object} state
     * @param {number} removeIndex
     */
    [Mutation.REMOVE_DATA_FROM_STATE] (state, removeIndex) {
        state.tableData.splice(removeIndex, 1);
    },

    /**
     * @name setActiveData
     * @param {object} state
     * @param {number} index
     */
    [Mutation.SET_ACTIVE_DATA] (state, index) {
        const clone = JSON.parse(JSON.stringify(state.tableData));

        state.activeTableData = clone[index];
    },

    /**
     * @name resetActiveData
     * @param {object} state
     */
    [Mutation.RESET_ACTIVE_DATA] (state) {
        state.activeTableData = {};
    },

    /**
     * @name editActiveDataFromState
     * @param {object} state
     * @param {object} config
     */
    [Mutation.EDIT_ACTIVE_DATA_FROM_STATE] (state, config) {
        const selectedData = state.tableData.find(data => data.id === state.activeTableData.id);
        const indexToChange = state.tableData.indexOf(selectedData);

        Vue.set(state.tableData[indexToChange], 'title', config.title);
        Vue.set(state.tableData[indexToChange], 'status', config.status);
    }
}