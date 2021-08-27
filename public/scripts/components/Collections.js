import { url_findID, url_list } from "../config/constants"
import { formatDateTime } from "../config/utils";
import {
    api_getCollection_list, api_getCollection_trash,
    api_insert, api_update, api_replace, api_remove, api_restore, api_destroy,
    api_restore_list, api_remove_list, api_destroy_list, api_destroy_trash,
} from "../slice/database_api";
import { action_setResponse } from "../slice/database_slice";
import MyTable from "./MyTable";

const { useState, useEffect } = React;
const { useSelector, useDispatch } = ReactRedux;

const Collections = ({ match, name }) => {
    const dispatch = useDispatch()
    const collections = useSelector(state => state.database.data[name])
    const response = useSelector(state => state.database.response)

    const [item, setItem] = useState({})

    let getItem = collections.list[0] || collections.trash[0] || {}
    let getKeys = Object.keys(getItem);
    let actKeys = getKeys.filter(item => !['_id', 'createdAt', 'updatedAt', 'removedAt'].includes(item))

    useEffect(() => {
        dispatch(api_getCollection_list(name))
        dispatch(api_getCollection_trash(name))
    }, [])


    const api_findID = (_id) => {
        fetch(url_findID(name, _id))
            .then((res) => res.json())
            .then((res) => {
                setItem(res.data)
                dispatch(action_setResponse({ response: res }))
            })
            .catch(err => dispatch(action_setResponse({ response: err })))
    }

    return (
        <div id="content">
            <h4 style={{ textAlign: 'center' }}>{url_list(name)}</h4>
            <div id="list">
                <h2>Data List</h2>
                <MyTable data={collections.list} handleAPI={{
                    findID: (_id) => { api_findID(_id); document.getElementById("action").scrollIntoView() },
                    remove: (_id) => { dispatch(api_remove(name, _id)) },
                    remove_list: (ids) => { dispatch(api_remove_list(name, ids)) },
                }} />
            </div>
            <div id="trash">
                <h2>Trash</h2>
                <MyTable data={collections.trash} handleAPI={{
                    restore: (_id) => { dispatch(api_restore(name, _id)) },
                    destroy: (_id) => { dispatch(api_destroy(name, _id)) },
                    restore_list: (ids) => { dispatch(api_restore_list(name, ids)) },
                    destroy_list: (ids) => { dispatch(api_destroy_list(name, ids)) },
                    clean_trash: () => { dispatch(api_destroy_trash(name)) },
                }} />
            </div>

            <div id='action'>
                <h2>Form action</h2>
                <div className="control">
                    <div className='formcontrol'>
                        {actKeys.map((property, index) => (
                            <div key={index} className='field'>
                                <label>{property}</label>

                                {typeof item[property] == 'object' ?
                                    <pre
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => {
                                            let val;
                                            let string = "val=" + e.target.innerText;
                                            eval(string);
                                            setItem({ ...item, [property]: val })
                                        }}
                                    >
                                        {JSON.stringify(item[property], null, 2)}
                                    </pre> :
                                    <input name={property}
                                        value={item[property] || ''}
                                        onChange={(e) => { setItem({ ...item, [property]: e.target.value }) }}
                                    />
                                }
                            </div>
                        ))}
                        <div className='button_submit'>
                            <button onClick={() => { setItem({}) }} > Refresh New </button>
                            {item._id ? (
                                <div>
                                    <button onClick={() => { dispatch(api_update(name, item._id, item)); setItem({}) }}> Update </button>
                                    <button onClick={() => { dispatch(api_replace(name, item._id, item)); setItem({}) }} > Replace </button>
                                </div>
                            ) : (
                                <button onClick={() => { dispatch(api_insert(name, item)); setItem({}) }} > Insert </button>
                            )}
                        </div>
                    </div>
                    <pre className='response'>{JSON.stringify(response, null, 2)}</pre>
                </div>
            </div>
        </div>
    )
}

export default Collections