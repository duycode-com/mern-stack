import { advanceSearch, formatDateTime, pagination } from "../config/utils";

const { useState, useEffect } = React;

const MyTable = ({ data, handleAPI }) => {
    const [ids, setIds] = useState([])
    const [filterKeys, setFilterKey] = useState([])
    const [stringSearch, setStringSearch] = useState('')
    const [keySearch, setKeySearch] = useState("")

    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(5)

    let getKeys = data[0] ? Object.keys(data[0]) : [];
    let actKeys = getKeys.filter(item => !['_id', 'createdAt', 'updatedAt', 'removedAt'].includes(item))
    let allKeys = [...actKeys, 'createdAt', 'updatedAt', 'removedAt']
    let keys = allKeys.filter(item => !filterKeys.includes(item))

    useEffect(() => {
        if (filterData().length != 0 && page != 1 && page > Math.ceil(filterData().length / perPage)) {
            setPage(page - 1)
        }
    })

    const handleCheckboxAll = (e) => {
        if (e.target.checked) {
            setIds(pageData().map((item) => item._id))
        } else {
            setIds([])
        }
    }

    const handleCheckboxItem = (e) => {
        let value = e.target.value
        if (e.target.checked) {
            setIds([...ids, value])
        } else {
            setIds(ids.filter((item) => item !== value))
        }
    }

    const handleCheckboxShow = (e) => {
        let value = e.target.value
        if (e.target.checked) {
            setFilterKey(filterKeys.filter((item) => item !== value))
        } else {
            setFilterKey([...filterKeys, value])
        }
    }

    const filterData = () => {
        return data.filter((item) => {
            let root = item[keySearch];
            if (!keySearch) {
                root = item[keys[0]]
            }
            if (['createdAt', 'updatedAt', 'removedAt'].includes(keySearch)) {
                root = formatDateTime(root, 'HH:mm:ss')
            }
            return advanceSearch(root, stringSearch)
        })
    }

    const pageData = () => {
        return filterData().slice((page - 1) * perPage, page * perPage)
    }


    return (
        <div className="my-table">
            <div className="options">
                <div className="options-action">
                    <span>Checked: {ids.length} </span>
                    {handleAPI.remove_list && <button onClick={e => { handleAPI.remove_list(ids); setIds([]) }} > Remove Them</button>}
                    {handleAPI.restore_list && <button onClick={e => { handleAPI.restore_list(ids); setIds([]) }} > Restore Them</button>}
                    {handleAPI.destroy_list && <button onClick={e => { handleAPI.destroy_list(ids); setIds([]) }} > Destroy Them</button>}
                    {handleAPI.clean_trash && <button onClick={e => { handleAPI.clean_trash(); setIds([]) }} > Clean Trash</button>}
                </div>
                <div className="options-choose">
                    <div className="options-search">
                        <input placeholder="Search ..." value={stringSearch} onChange={e => setStringSearch(e.target.value)} />
                        <select value={keySearch} onChange={e => { setKeySearch(e.target.value) }}>
                            {allKeys.map((key, index) => (
                                <option key={index} value={key}>{key}</option>
                            ))}
                        </select>
                    </div>
                    <div className="options-show">
                        <button className="dropbtn">Option Setting Show</button>
                        <div className="dropdown-content">
                            {allKeys.map((key, index) => (
                                <div key={index} className='list-key'>
                                    <label htmlFor={key + index + "_dropdown"}>{key}</label>
                                    <input type="checkbox" id={key + index + "_dropdown"}
                                        value={key}
                                        onChange={handleCheckboxShow}
                                        checked={!filterKeys.includes(key)} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <td><input type='checkbox' onChange={handleCheckboxAll} /> # </td>
                        {keys.map((key, index) => (
                            <th key={index}>{key}</th>
                        ))}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {pageData().map((item, index) => (
                        <tr key={index}>
                            <td>
                                <input type='checkbox' value={item._id}
                                    onChange={handleCheckboxItem}
                                    checked={ids.includes(item._id)}
                                /> {data.indexOf(item) + 1}
                            </td>
                            {keys.map((key, index) => (
                                <td key={index}>{
                                    ['createdAt', 'updatedAt', 'removedAt'].includes(key) ? formatDateTime(item[key], 'HH:mm:ss') :
                                        typeof item[key] == 'object' ? <pre>{JSON.stringify(item[key], null, 2)}</pre> : item[key]
                                }</td>
                            ))}
                            <td>
                                {handleAPI.findID && <button onClick={e => { handleAPI.findID(item._id) }} > Find </button>}
                                {handleAPI.remove && <button onClick={e => { handleAPI.remove(item._id) }} > Remove </button>}
                                {handleAPI.restore && <button onClick={e => { handleAPI.restore(item._id) }} > Restore </button>}
                                {handleAPI.destroy && <button onClick={e => { handleAPI.destroy(item._id) }} > Destroy </button>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <div>
                    <span>Show </span>
                    <select value={perPage} onChange={e => { setPerPage(e.target.value) }}>
                        <option value={2}>2</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                    <span> / Page. Total: {filterData().length}</span>
                </div>
                <ul>
                    {pagination(page, Math.ceil(filterData().length / perPage)).map((item, index) => {
                        return <li key={index}
                            onClick={e => { if (typeof (item) == 'number') setPage(item) }}
                            className={item == page ? "active" : ""}
                        >{item}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default MyTable
