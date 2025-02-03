import { useMemo, useState } from "react";
import { Badge, Button, Card, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "./App";
import styles from "./AllNotes.module.css";

type NoteListProps = {
    availableTags: Tag[]
    notes: NotePreview[]
}

type NotePreview = {
    tags: Tag[],
    title: string, 
    id: string
}

export function AllNotes({ availableTags, notes }: NoteListProps) {

    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState("");

    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) && (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
        })
    }, [title, selectedTags, notes])

    return (
        <>
        <Row className="mb-5">
            <Col><h1>My Notes</h1></Col>
            <Col xs="auto">
                <Stack gap={2} direction="horizontal">
                    <Link to="/new">
                    <Button>New Note</Button>
                    </Link>
                    <Button variant="secondary">My Tags</Button> 
                </Stack>
            </Col>
        </Row>
        <Form className="mb-5">
            <Col>
                <Form.Group controlId="title">
                    <Form.Label className="fw-bold">Title of Note</Form.Label>
                    <Form.Control className="mb-3" type="text" value={title} onChange={event => setTitle(event.target.value)} />
                </Form.Group>
            </Col>

            <Col>
            <Form.Group controlId="tags">
                <Form.Label className="fw-bold">Tags</Form.Label>
                    <ReactSelect isMulti value={selectedTags.map(tag => {
                                return { label: tag.label, value: tag.id }
                            })}
                            options={availableTags.map(tag => {
                                return { label: tag.label, value: tag.id }
                            })}
                            onChange={tags => {
                                setSelectedTags(tags.map(tag => {
                                return { label: tag.label, id: tag.value }
                            }))
                    }} />
                            </Form.Group>
            </Col>
        </Form>
        <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
            {filteredNotes.map(note => (
                <Col key={note.id}>
                    <NoteCard id={note.id} title={note.title} tags={note.tags}/>
                </Col>
            ))}
        </Row>
        </>
    )
}

function NoteCard({ id, title, tags }: NotePreview) {
    return <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
        <Card.Body>
            <Stack gap={2} className="align-items-center justify-content-center h-100">
                <span className="fs-5">{title}</span>
                {tags.length > 0 && (
                    <Stack gap={1} direction="horizontal" className="justify-content-center flex-wrap">
                        {tags.map(tag => (
                            <Badge className="text-truncate" key={tag.id}>{tag.label}</Badge>
                        ))}
                        </Stack>
                )}
            </Stack>
        </Card.Body>
    </Card>
}