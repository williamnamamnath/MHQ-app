import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useNote } from "./NoteLayout";

import { Badge, Button, Col, Row, Stack } from "react-bootstrap";

type NoteProps = {
    onDelete: (id: string) => void
}

export function Note({ onDelete }: NoteProps) {

    const note = useNote();
    const navigate = useNavigate();
    

    return (
        <>
        <Row className="align-items-center mb-4">
            <Col>
            <h1>{note.title}</h1>
            {note.tags.length > 0 && (
                <Stack gap={1} direction="horizontal" className="flex-wrap">
                {note.tags.map(tag => (
                    <Badge className="text-truncate" key={tag.id}>{tag.label}</Badge>
                ))}
                </Stack>
            )}
            </Col>
            
            <Col xs="auto">
                <Stack gap={2} direction="horizontal">
                    <Link to={`/${note.id}/edit`}>
                    <Button className="primary">Edit</Button>
                    </Link>
                    <Button onClick={() => {
                        onDelete(note.id)
                        navigate("/notes")
                        window.alert(`"${note.title}" has been deleted. You'll be redirected to the home page.`)
                    }} variant="outline-danger">Delete</Button> 
                    <Link to="/notes">
                    <Button variant="outline-secondary">Back</Button> 
                    </Link>
                </Stack>
            </Col>
        </Row>
        <ReactMarkdown>{note.markdown}</ReactMarkdown>
        </>
    )
}