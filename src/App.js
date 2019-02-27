import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Header from './Header/Header'
import NoteList from './NoteList/NoteList'
import NoteListMain from './NoteListMain/NoteListMain'
import NotePage from './NotePage/NotePage'
import NotePageMain from './NotePageMain/NotePageMain'
import AddFolder from './AddFolder/AddFolder'
import AddNote from './AddNote/AddNote'
import NoteContext from './NoteContext'
import './App.css'

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    Promise.all([
      fetch(`http://localhost:9090/notes`),
      fetch(`http://localhost:9090/folders`)
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
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteList}
          />
        )}
        <Route
          path='/note/:noteId'
          component={NotePage}
        />
        <Route
          path='/add-folder'
          component={NotePage}
        />
        <Route
          path='/add-note'
          component={NotePage}
        />
      </>
    )
  }

  renderListRoutes() {
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
      deleteNotes: this.handleDeleteNote,
    }
    return (
      <NoteContext.Provider value={value}>
        <div className="App">
          <nav className='App_nav'>
            {this.renderNavRoutes()}
          </nav>
          <Header />
          <main className='App_main'>
            {this.renderListRoutes()}
          </main>
        </div>
      </NoteContext.Provider>
    );
  }
}

export default App;
