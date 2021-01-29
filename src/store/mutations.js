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
     * @param {number} idToFind
     */
    [Mutation.SET_ACTIVE_DATA] (state, idToFind) {
        state.activeTableData = state.tableData[state.tableData.find(data => data.id = idToFind)];
    },

    /**
     * @name editActiveData
     * @param {object} state
     * @param {object} config
     */
    [Mutation.EDIT_ACTIVE_DATA] (state, config) {
        Vue.set(state.tableData[state.activeTableData], 'title', config.title);
        Vue.set(state.tableData[state.activeTableData], 'status', config.status);
    }
}