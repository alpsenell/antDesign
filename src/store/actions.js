import { Action, Mutation } from './types';

export default {
    /**
     * @name fetchData
     * @param {function} [commit]
     */
    async [Action.FETCH_DATA] ({ commit }) {
        const { data } = await window.axios.get('https://api.mocki.io/v1/0e64bed1');

        commit(Mutation.SET_DATA, data);
    }
}