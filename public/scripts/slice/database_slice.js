const database_slice = RTK.createSlice({
    name: 'database',
    initialState: {
        data: {},
        loading: false,
        response: {}
    },
    reducers: {
        action_initDatabase(state, action) {
            action.payload.data.forEach(element => {
                state.data[element] = { list: [], trash: [] }
            });
            state.loading = false;
        },
        action_setCollection_list(state, action) {
            let { name, data } = action.payload;
            state.data[name].list = data;
        },
        action_setCollection_trash(state, action) {
            let { name, data } = action.payload;
            state.data[name].trash = data;
        },
        action_setResponse(state, action) {
            state.response = action.payload.response;
        },
        action_changeCollection(state, action) {
            let { name, type, response } = action.payload;
            let { data } = response
            switch (type) {
                case "ADD":
                    state.data[name].list.push(data);
                    state.response = response;
                    break;
                case "UPDATE":
                case "REPLACE":
                    let index = state.data[name].list.findIndex(item => item._id == data._id);
                    state.data[name].list[index] = data;
                    state.response = response;
                    break;
                case "REMOVE":
                    state.data[name].list = state.data[name].list.filter(item => item._id != data._id);
                    state.data[name].trash.push(response.data);
                    state.response = response;
                    break;
                case "RESTORE":
                    state.data[name].list.push(response.data);
                    state.data[name].trash = state.data[name].trash.filter(item => item._id != data._id);
                    state.response = response;
                    break;
                case "DESTROY":
                    state.data[name].trash = state.data[name].trash.filter(item => item._id != data._id);
                    state.response = response;
                    break;
                default:
                    break;
            }
        }
    }
})

export default database_slice.reducer
export const {
    action_initDatabase,
    action_setCollection_list,
    action_setCollection_trash,
    action_changeCollection,
    action_setResponse,
} = database_slice.actions
