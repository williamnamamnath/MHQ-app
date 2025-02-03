import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


export function Home() {

    return (
        <>
        <div className="text-center">
        <h1 className="mb-5">Welcome to MHQ</h1>
        <Link to="/notes">
            <Button>Access My Notes</Button>
        </Link>
        </div>
        </>
    )
}