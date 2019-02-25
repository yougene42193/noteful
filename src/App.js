import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Header from './Header/Header'
import NoteList from './NoteList/NoteList'
import NoteListMain from './NoteListMain/NoteListMain'
import NotePage from './NotePage/NotePage'
import NotePageMain from './NotePageMain/NotePageMain'
import AddFolder from './AddFolder/AddFolder'
import AddNote from './AddNote/AddNote'
import dummyStore from './dummy-store'
import { getNotesForFolder, findNote, findFolder } from './note-helpers'
import './App.css'

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    setTimeout(() => this.setState(dummyStore), 600)
  }

  renderNavRoutes() {
    const { notes, folders } = this.state
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            render={routeProps =>
              <NoteList
                folders={folders}
                notes={notes}
                {...routeProps}
              />
            }
          />
        )}
        <Route
          path='/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params
            const note = findNote(notes, noteId) || {}
            const folder = findFolder(folders, note.folderId)
            return (
              <NotePage
                {...routeProps}
                folder={folder}
              />
            )
          }}
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
    const { notes, folders } = this.state
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              const { folderId } = routeProps.match.params
              const notesForFolder = getNotesForFolder(notes, folderId)
              return (
                <NoteListMain
                  {...routeProps}
                  notes={notesForFolder} 
                />
              )
            }}
          />
        )}
        <Route
          path='/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params
            const note = findNote(notes, noteId)
            return (
              <NotePageMain
                {...routeProps}
                note={note}
              />
            )
          }} 
        />
        <Route
          path='/add-folder'
          component={AddFolder}
        />
        <Route
          path='/add-note'
          render={routeProps => {
            return (
              <AddNote
                {...routeProps}
                folders={folders}
              />
            )
          }}
        />
      </>
    )
  }

  render() {
    return (
      <div className="App">
        <nav className='App_nav'>
          {this.renderNavRoutes()}
        </nav>
        <Header />
        <main className='App_main'>
          {this.renderListRoutes()}
        </main>
      </div>
    );
  }
}

export default App;
