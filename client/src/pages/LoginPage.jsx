import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const { data } = await axios.post('/login', { email, password })

            const { success, message, userDoc } = data;

            if (success) {
                setUser(userDoc);
                console.log(userDoc);
                alert(message);
            } else {
                alert(message);
            }
        } catch (e) {
            alert('login failed');
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-center">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handleLogin}>
                    <input type="email" placeholder='your@email.com'
                        value={email}
                        onChange={e => setEmail(e.target.value)} required
                    />
                    <input type="password" placeholder='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)} required
                    />
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Dont have an account yet?
                        <Link to='/register' className="ml-1 underline text-black">Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;