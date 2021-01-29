import { Action, Mutation } from './types';

export default {
    /**
     * @name fetchData
     * @param {function} [commit]
     */
    async [Action.FETCH_DATA] ({ commit }) {
        const { data } = await window.axios.get('https://api.mocki.io/v1/ab790cdd');

        commit(Mutation.SET_DATA, data);
    }
}