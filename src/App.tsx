import { EditNote } from "./EditNote"
import { Container } from "react-bootstrap"
import { Navigate, Route, Routes } from "react-router-dom"
import { CreateNote } from "./CreateNote"
import { useLocalStorage } from "./useLocalStorage"
import { useMemo } from "react"
import { v4 as uuidV4 } from "uuid"
import { Home } from "./Home"
import { AllNotes } from "./AllNotes"
import { NoteLayout } from "./NoteLayout"
import { Note } from "./Note"

import "bootstrap/dist/css/bootstrap.min.css"

export type Note = {
  id: string
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string,
  markdown: string,
  tagIds: string[]
}

export type NoteData = {
  title: string,
  markdown: string,
  tags: Tag[]
}

export type Tag = {
  id: string,
  label: string
}

function App() {

  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) 
      }
    })
  }, [notes, tags])

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) },
      ]
    })
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return { ...data, id, tagIds: tags.map(tag => tag.id) }
        }
        return note
      })
    })
  }
  
  function onDeleteNote(id: string) {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  function deleteTag(id: string) {
    setTags(prev => prev.filter(tag => tag.id !== id))
  }


  return (
    <>
    <Container className="my-5">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/notes" element={<AllNotes notes={notesWithTags} availableTags={tags} onUpdateTag={updateTag} onDeleteTag={deleteTag} />}/>
        <Route path="/new" element={<CreateNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />} />
        <Route path="*" element={<Navigate to="/" />}/>
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route path="edit" element={<EditNote onSubmit={onUpdateNote} onAddTag={addTag} availableTags={tags} />} />
        </Route>
      </Routes>
    </Container>
    </>
  )
}

//npm run dev to start app

export default App
