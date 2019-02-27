import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'url';
import NoteContext from '../NoteContext';
import './Note.css'

export default class Note extends React.Component {
    static defaultProps = {
        onDeleteNote: () => {},
    }
    static contextType = NoteContext;

    handleClickDelete = e => {
        e.preventDefault()
        const noteId = this.props.id

        fetch(`http://localhost:9090/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
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
        const { name, id, modified } = this.props

        return (
            <section className='note'>
                <h2 className='note-title'>
                    <Link to={`/note/${id}`}>
                        {name}
                    </Link>
                </h2>
                <button 
                    className='delete-note'
                    type='button'
                    onClick={this.handleClickDelete}
                >
                    Delete Note
                </button>
                <div className='note-date'>
                    <div className='modified-date'>
                        Modified
                        {' '}
                        <span className='date'>
                            {format(modified, 'Do MMM YYYY')}
                        </span>
                    </div>
                </div>
            </section>
        )
    }
}