import React from 'react'
import CircleButton from '../CircleButton/CircleButton'
import NotesContext from '../NotesContext'
import { findNote, findFolder } from '../notes-helpers'
import './NotePageNav.css'

export default class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }
  static contextType = NotesContext;

  render() {
    const { notes, folders, } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folderId)
    return (
      <div className='NotePageNav'>
        <CircleButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePageNav_back-button'
        >
          <br />
          Back
        </CircleButton>
        {folder && (
          <h3 className='NotePageNav_folder-name'>
            {folder.name}
          </h3>
        )}
      </div>
    )
  }
}