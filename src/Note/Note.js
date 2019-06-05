import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import NotesContext from '../NotesContext'
import config from '../config'
import './Note.css'

export default class Note extends Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }
  static contextType = NotesContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
          window.location.reload();
      })
      .then(() => {
        this.context.deleteNote(noteId)
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { name, id, modified, content } = this.props
    return (
      <div className='Note'>
        <h2 className='Note_title'>
          <Link to={`/notes/${id}`}>
            {name}
          </Link>
        </h2>
		<p>{content}</p>
        <button
          className='Note_delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          {' '}
          remove
        </button>
        <div className='Note_dates'>
          <div className='Note_dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {format(modified, 'DD/MM/YYYY')}
            </span>
          </div>
        </div>
      </div>
    )
  }
}