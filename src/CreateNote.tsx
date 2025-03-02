import { NoteData, Tag } from "./App";
import { NoteContent } from "./NoteContent";

type NewNoteProps = {
    onSubmit: (data: NoteData) => void,
    onAddTag: (tag: Tag) => void,
    availableTags: Tag[]
}

export function CreateNote({ onSubmit, onAddTag, availableTags }: NewNoteProps) {

    return (
        <>
        <h1 className="mb-5">Create a New Note</h1>
        
        <NoteContent 
        onSubmit={onSubmit} 
        onAddTag={onAddTag} 
        availableTags={availableTags} />
        </>
    )
} 