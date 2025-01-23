import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import { Navigate, Route, Routes } from "react-router-dom"

function App() {

  return (
    <>
    <Container className="my-3">
      <Routes>
        <Route path="/" element={<h1>Hello World!</h1>}/>
        <Route path="*" element={<Navigate to="/" />}/>
        <Route path="/:id">
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
      </Routes>
    </Container>
    </>
  )
}

//npm run dev to start app

export default App
