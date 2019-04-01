import React from 'react'
import LinkButton from '../LinkButton/LinkButton'
import NoteContext from '../NoteContext'
import { findNote, findFolder } from '../note-helpers'
import './NotePage.css'

export default class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }
  static contextType = NoteContext;

  render() {
    const { notes, folders, } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folderId)
    return (
      <div className='NotePageNav'>
        <LinkButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePageNav_back-button'
        >
          <br />
          Back
        </LinkButton>
        {folder && (
          <h3 className='NotePageNav_folder-name'>
            {folder.folder_name}
          </h3>
        )}
      </div>
    )
  }
}