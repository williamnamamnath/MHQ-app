import { NoteData, Tag } from "./App";
import { NoteContent } from "./NoteContent";
import { useNote } from "./NoteLayout";

type EditNoteProps = {
    onSubmit: (id: string, data: NoteData) => void,
    onAddTag: (tag: Tag) => void,
    availableTags: Tag[]
} & Partial<NoteData>

export function EditNote({ onSubmit, onAddTag, availableTags }: EditNoteProps) {

    const note = useNote();

    return (
        <>
        <h1 className="mb-5">Edit Note</h1>
        <NoteContent title={note.title} markdown={note.markdown} tags={note.tags} onSubmit={data => onSubmit(note.id, data)} onAddTag={onAddTag} availableTags={availableTags} />
        </>
    )
} 