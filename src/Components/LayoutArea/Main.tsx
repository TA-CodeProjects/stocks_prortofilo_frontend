import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Routing from "../SharedArea/Routing";

function Main(): JSX.Element {
    return (
        <Container className="container-padding">
            <Routing />
            <Outlet />
        </Container>
    )
}

export default Main;