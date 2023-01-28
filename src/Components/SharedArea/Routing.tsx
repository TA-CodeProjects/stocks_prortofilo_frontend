import { Route, Routes } from "react-router-dom";
import App from "../../App";
import AdminPanel from "../AdminArea/AdminPanel";
import Login from "../AuthArea/Login";
import Logout from "../AuthArea/Logout";
import Home from "../PagesArea/Home";
import UserPanel from "../UserArea/UserPanel";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<App/>} />
            <Route path="/home" element={<Home />} />
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/user" element={<UserPanel />} />
            <Route path="/admin" element={<AdminPanel />} />
        </Routes>
    )
}

export default Routing;