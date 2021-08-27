import database_reducer from "./slice/database_slice";

const store = RTK.configureStore({
    reducer: {
        database: database_reducer,
    }
})

export default store