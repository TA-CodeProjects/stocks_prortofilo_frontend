import { Route, Routes } from "react-router-dom";
import App from "../../App";
import AddUser from "../AdminArea/AddUser";
import AdminPanel from "../AdminArea/AdminPanel";
import EditUser from "../AdminArea/EditUser";
import UserList from "../AdminArea/UserList";
import Login from "../AuthArea/Login";
import Logout from "../AuthArea/Logout";
import Home from "../PagesArea/Home";
import StockData from "../StockArea/StockData";
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
            <Route path="/admin/user" element={<UserList />} />
            <Route path="/admin/user/add" element={<AddUser />} />
            <Route path="/admin/user/edit/:id" element={<EditUser />} />
            <Route path="/stockData/:stockName" element={<StockData />}/>
        </Routes>
    )
}

export default Routing;