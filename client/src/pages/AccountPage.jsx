import { useContext } from "react";
import { UserContext } from "../Provider/UserContextProvider";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AccountPage = () => {
    const { ready, user, setUser } = useContext(UserContext);
    let { subpage } = useParams();
    const navigate = useNavigate();

    if (subpage === undefined) {
        subpage = 'profile'
    }

    function handleLogout() {
        axios.post('/logout')
            .then((res) => {
                setUser(null);
                alert(res.data.message);
                navigate('/');
            })
    }
    if (!ready) {
        return 'Loading...';
    }

    if (ready && !user) {
        return <Navigate to={'/login'} />
    }

    function linkClasses(type = null) {
        let classes = 'px-4 py-2';
        if (subpage === type) {
            classes += ' bg-primary text-white rounded-full';
        }
        return classes;
    }

    return (
        <>
            <div className="flex justify-center mt-8 gap-2">
                <Link className={linkClasses('profile')} to={'/account'}>My profile</Link>
                <Link className={linkClasses('booking')} to={'/account/booking'}>My bookings</Link>
                <Link className={linkClasses('accommodation')} to={'/account/accommodation'}>My accommodation</Link>
            </div>
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto mt-6">
                    Logged in as {user.name} ({user.email}) <br />
                    <button onClick={handleLogout} className="bg-primary text-white rounded-full w-full md:max-w-sm py-2 mt-2">Logout</button>
                </div>
            )}
        </>
    );
};

export default AccountPage;