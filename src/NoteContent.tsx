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
}

export function NoteContent({ onSubmit, onAddTag, availableTags }: NoteFormProps) {

    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
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
                                <Form.Label>Title</Form.Label>
                                <Form.Control ref={titleRef} required />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="tags">
                                <Form.Label>Tags</Form.Label>
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
                        <Form.Label>Body</Form.Label>
                        <Form.Control ref={markdownRef} required as="textarea" rows={10} />
                    </Form.Group>

                    <Stack direction="horizontal" gap={2}>
                        <Button type="submit" variant="primary">Save</Button>
                        <Link to="..">
                        <Button type="button" variant="danger">Cancel</Button>
                        </Link>
                    </Stack>
                </div>
            </Stack>
        </Form>
        </>
    )
}