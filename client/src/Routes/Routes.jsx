import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import AccountPage from "../pages/AccountPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "login",
                element: <LoginPage></LoginPage>,
            },
            {
                path: "register",
                element: <RegistrationPage></RegistrationPage>,
            },
            {
                path: "account/:subpage?",
                element: <AccountPage></AccountPage>,
            }
        ]
    },
]);

export default router;