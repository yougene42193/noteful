import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import NoteList from './NoteList/NoteList'
import NotePage from './NotePage/NotePage'
import NoteListMain from './NoteListMain/NoteListMain'
import NotePageMain from './NotePageMain/NotePageMain'
import AddFolder from './AddFolder/AddFolder'
import AddNote from './AddNote/AddNote'
import NoteContext from './NoteContext'
import config from './config'
import './App.css'

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/notes`),
      fetch(`${config.API_ENDPOINT}/api/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e))
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e))

        return Promise.all([
          notesRes.json(),
          foldersRes.json(),
        ])
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders })
      })
      .catch(error => {
        console.error({ error })
      })
  }

  handleAddFolder = folder => {
    this.setState({
      folders: [
        ...this.state.folders,
        folder
      ]
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [
        ...this.state.notes,
        note
      ]
    })
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
  }

  renderNavRoutes() {
    return (
      <>
        {['/', '/api/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteList}
          />
        )}
        <Route
          path='/api/note/:noteId'
          component={NotePage}
        />
        <Route
          path='/api/add-folder'
          component={NotePage}
        />
        <Route
          path='/api/add-note'
          component={NotePage}
        />
      </>
    )
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteListMain}
          />
        )}
        <Route
          path='/note/:noteId'
          component={NotePageMain}
        />
        <Route
          path='/add-folder'
          component={AddFolder}
        />
        <Route
          path='/add-note'
          component={AddNote}
        />
      </>
    )
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      deleteNote: this.handleDeleteNote,
    }
    return (
      <NoteContext.Provider value={value}>
        <div className='App'>
          <nav className='App_nav'>
            {this.renderNavRoutes()}
          </nav>
          <header className='App_header'>
            <h1>
              <Link to='/'>Noteful</Link>
              {' '}
            </h1>
          </header>
          <main className='App_main'>
            {this.renderMainRoutes()}
          </main>
        </div>
      </NoteContext.Provider>
    )
  }
}

export default App