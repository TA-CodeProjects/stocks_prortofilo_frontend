import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../Redux/AuthAppState ";
import store from "../../Redux/store";
import notify, { SccMsg } from "../../Services/Notification";

function Logout(): JSX.Element {
    const navigate = useNavigate();

    useEffect(() => {
        notify.success(SccMsg.LOGOUT_SUCCESS);
        store.dispatch(logoutAction());
        navigate("/home");
    });
    return (
        <>
        </>
    )
}

export default Logout;