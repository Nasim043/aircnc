import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegistrationPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleRegister(e) {
        e.preventDefault();
        const userInfo = {
            name,
            email,
            password
        }
        axios.post('/register', userInfo)
            .then(res => {
                console.log(res.data);
                alert(res.data.message);
            })
    }
    return (
        <div className="mt-4 grow flex items-center justify-center">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={handleRegister}>
                    <input type="text" placeholder="John Doe"
                        value={name}
                        onChange={e => setName(e.target.value)} required />
                    <input type="email" placeholder='your@email.com'
                        value={email}
                        onChange={e => setEmail(e.target.value)} required />
                    <input type="password" placeholder='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)} required />
                    <button className="primary">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member?
                        <Link to='/login' className="ml-1 underline text-black">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;