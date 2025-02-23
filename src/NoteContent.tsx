import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "./App";
import { v4 as uuidV4 } from "uuid"


type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void,
    availableTags: Tag[]
} & Partial<NoteData>

export function NoteContent({ onSubmit, onAddTag, availableTags, title="", markdown="", tags=[] }: NoteFormProps) {

    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
    const nav = useNavigate();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value, 
            tags: selectedTags
        });

        nav("..")
    }

    return (
        <>
        <Form onSubmit={handleSubmit}>
            <Stack gap={5}>
                <div>
                    <Row className="mb-4">
                        <Col>
                            <Form.Group controlId="title">
                                <Form.Label className="fw-bold">Title</Form.Label>
                                <Form.Control ref={titleRef} required defaultValue={title} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="tags">
                                <Form.Label className="fw-bold">Tags</Form.Label>
                                <CreatableReactSelect onCreateOption={label => {
                                    const newTag = { id: uuidV4(), label }
                                    onAddTag(newTag)
                                    setSelectedTags(prev => [...prev, newTag])
                                }} isMulti value={selectedTags.map(tag => {
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
                    </Row>

                    <Form.Group controlId="markdown" className="mb-3">
                        <Form.Label> </Form.Label>
                        <Form.Control ref={markdownRef} required as="textarea" rows={10} defaultValue={markdown} />
                    </Form.Group>

                    <Stack direction="horizontal" gap={2}>
                        <Button type="submit" variant="primary">Save</Button>
                        <Link to="/notes">
                        <Button type="button" variant="outline-danger">Cancel</Button>
                        </Link>
                    </Stack>
                </div>
            </Stack>
        </Form>
        </>
    )
}