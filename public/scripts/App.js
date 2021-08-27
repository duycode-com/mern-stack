const { useState, useEffect } = React
const { HashRouter, Switch, Route, NavLink, Link } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux;

import { url_getListCollection, _SERVER } from "./config/constants.js"
import Collections from "./components/Collections.js";
import Authentication from "./components/Authentication.js";

import { action_initDatabase } from "./slice/database_slice.js";

const App = () => {
    const dispatch = useDispatch()
    const [listNames, setListNames] = useState([])
    useEffect(() => {
        fetch(url_getListCollection())
            .then(res => res.json())
            .then(res => {
                let list = res.data.map(item => item.name)
                dispatch(action_initDatabase({ data: list }))
                setListNames(list)
            })
    }, [])
    return (
        <HashRouter>
            <div id='header'>
                <div id='logo'>
                    <Link to="/"> Express Server </Link>
                </div>
                <div id='navbar'>
                    {listNames.map((item) => (<Link to={"/api/" + item}> {item} </Link>))}
                </div>
            </div>
            <Switch>
                {listNames.map((item) => (
                    <Route path={"/api/" + item} component={({ match }) => <Collections match={match} name={item} />} />)
                )}
                <Route path="/" exact component={Authentication} />
                <Route path="" component={() => <h2>Not Found</h2>} />
            </Switch>
            <footer>Design by Heroku, NodeJS, ReactJS</footer>
        </HashRouter>
    )
}

export default App;
