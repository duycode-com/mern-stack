import { _SERVER } from "../config/constants"

const {useState, useEffect} = React

const Authentication = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [all, setAll] = useState([])
    const [user, setUser] = useState({ email: '', password: '' })
    const [response, setResponse] = useState({})
    const [account, setAccount] = useState({ email: '', password: '', username: '', phone: '' })

    useEffect(() => {
        fetch(_SERVER + '/api/users/list')
            .then((res) => res.json())
            .then((res) => setAll(res.data))
    }, [response])

    const register = () => {
        fetch(_SERVER + '/auth/register', {
            method: 'POST',
            body: JSON.stringify(account),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => res.json())
            .then((res) => response(res.data))

        // fetch(host + '/insert', {
        //     method: 'POST',
        //     body: JSON.stringify(collection),
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // })
        //     .then((res) => res.json())
        //     .then((res) => setResponse(res.data))
    }

    const login = () => {
        console.log(user);
        fetch(_SERVER + '/auth/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((res) => res.json())
            .then((res) => response(res.data))


        // fetch(host + '/insert', {
        //     method: 'POST',
        //     body: JSON.stringify(collection),
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // })
        //     .then((res) => res.json())
        //     .then((res) => setResponse(res.data))
    }

    const logout = () => {
        fetch(_SERVER + '/auth/logout')
            .then((res) => res.json())
            .then((res) => response(res.data))
    }

    const refreshToken = () => {
        fetch(_SERVER + '/auth/refresh-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        })
            .then((res) => res.json())
            .then((res) => response(res.data))
    }

    return (
        <div id="content">
            <div id="list" style={{ marginBottom: '40px' }}>
                <h2>List Users</h2>
                <table>
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
                                    <td>{index}</td>
                                    <td>{item.email}</td>
                                    <td>{item.username}</td>
                                    <td>{item.password}</td>
                                    <td>{item.phone}</td>
                                    <td><button onClick={()=>setUser({email: item.email, password: item.password})}>Get</button></td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            <div className='action'>
                <div className="control">
                    <div className='formcontrol'>
                        <div className="authen">
                            <h2>Login</h2>
                            <div className="field">
                                <label>Email</label>
                                <input value={user.email} onChange={e => setUser({...user,email: e.target.value})} />
                            </div>
                            <div className="field">
                                <label>Password</label>
                                <input value={user.password} onChange={e => setUser({...user,password: e.target.value})} />
                            </div>
                            <div className='submit'>
                                <button onClick={refreshToken} > Refresh Token </button>
                                <button onClick={login} > Login </button>
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
