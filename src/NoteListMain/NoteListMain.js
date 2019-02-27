import React from 'react'
import { Link } from 'react-router-dom'
import Note from '../Note/Note'
import LinkButton from '../LinkButton/LinkButton'
import NoteContext from '../NoteContext'
import { getNotesForFolder } from '../Helper'
import './NoteListMain.css'

export default class NoteListMain extends React.Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = NoteContext

    render() {
        const { folderId } = this.props.match.params
        const { notes=[] } = this.context
        const notesForFolder = getNotesForFolder(notes, folderId)
    
        return (
            <section className='NoteListMain'>
                <ul>
                    {notesForFolder.map(note =>
                        <li key={note.id}>
                            <Note
                                id={note.id}
                                name={note.name}
                                modified={note.modified}
                            />
                        </li>)}
                </ul>
                <div className='NoteListMain__button-container'>
                    <LinkButton
                        tag={Link}
                        to='/add-note'
                        type='button'
                        className='NoteListMain__add-note-button'
                    >
                        <br />
                        Note
                    </LinkButton>
                </div>
            </section>
        )
    }
}

NoteListMain.defaultProps = {
    notes: [],
}