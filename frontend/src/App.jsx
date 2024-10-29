import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, CreateBook, DeleteBook, EditBook, ShowBook } from './pages'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/books/create' element={<CreateBook />} />
        <Route path='/books/details/:id' element={<ShowBook />} />
        <Route path='/books/edit/:id' element={<EditBook />} />
        <Route path='/books/delete/:id' element={<DeleteBook />} />
      </Routes>
    </>
  )
}

export default App
