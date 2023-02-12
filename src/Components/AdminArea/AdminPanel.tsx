import { Button } from "react-bootstrap";
import CustomLink from "../SharedArea/CustomLink";

function AdminPanel(): JSX.Element {
    return (
        <div className="adminPanel">
            <h1>Welcome Admin</h1>
            <div className="d-grid gap-2">
                <p className="text-mute my-2">Please choose:</p>
                <div className="my-4">
                    <CustomLink to="/admin/user">
                        <Button variant="primary" size="lg">
                            Users List
                        </Button>
                    </CustomLink>
                </div>
            </div>
        </div>
    )
}

export default AdminPanel;