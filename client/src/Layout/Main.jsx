import { Outlet } from "react-router-dom";
import Header from "../pages/Header";

const Main = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;