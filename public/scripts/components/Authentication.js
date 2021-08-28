import { url_list, url_login, url_logout, url_refresh_token, url_register } from "../config/constants"

const { useState, useEffect } = React

const Authentication = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [all, setAll] = useState([])
    const [user, setUser] = useState({ email: '', password: '' })
    const [response, setResponse] = useState({})
    const [account, setAccount] = useState({ email: '', password: '', username: '', phone: '' })

    useEffect(() => {
        fetch(url_list('users'))
            .then((res) => res.json())
            .then((res) => setAll(res.data))
    }, [response])

    const register = () => {
        fetch(url_register(), {
            method: 'POST',
            body: JSON.stringify(account),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => res.json())
            .then((res) => setResponse(res))
    }

    const login = () => {
        fetch(url_login(), {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((res) => res.json())
            .then((res) => setResponse(res))
    }

    const logout = () => {
        fetch(url_logout())
            .then((res) => res.json())
            .then((res) => setResponse(res))
    }

    const refreshToken = () => {
        fetch(url_refresh_token(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        })
            .then((res) => res.json())
            .then((res) => setResponse(res))
    }

    return (
        <div id="content">
            <div id="list" style={{ marginBottom: '40px' }}>
                <h2>List Users</h2>
                <table style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <td># </td>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(all) && all[0] &&
                            all.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.email}</td>
                                    <td>{item.username}</td>
                                    <td>{item.password}</td>
                                    <td>{item.phone}</td>
                                    <td><button onClick={() => setUser({ email: item.email, password: item.password })}>Get</button></td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            <div id='action'>
                <div className="control">
                    <div className='formcontrol'>
                        <div className="authen">
                            <h2>Login</h2>
                            <div className="field">
                                <label>Email</label>
                                <input value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} />
                            </div>
                            <div className="field">
                                <label>Password</label>
                                <input value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} />
                            </div>
                            <div className='submit'>
                                <button onClick={refreshToken}> Refresh Token </button>
                                <button onClick={login}> Login </button>
                            </div>
                        </div>

                        <div className="authen" style={{ marginTop: '30px' }}>
                            <h2>Register</h2>
                            {Object.keys(account).map((property, index) => (
                                <div key={index} className='field'>
                                    <label>{property}</label>
                                    <input name={property}
                                        value={account[property] || ''}
                                        onChange={(e) => { setAccount({ ...account, [property]: e.target.value }) }}
                                    />
                                </div>
                            ))}
                            <div className='submit'>
                                <div></div>
                                <button onClick={register} > Register </button>
                            </div>

                        </div>
                    </div>
                    <pre className='response'>{JSON.stringify(response, null, 2)}</pre>
                </div>
            </div>
        </div>
    )
}

export default Authentication
