const Provider = ReactRedux.Provider
import App from "./App.js";
import store from "./store.js";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector("#root")
);