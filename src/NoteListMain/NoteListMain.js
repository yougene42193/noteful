import React from 'react'
import { Link } from 'react-router-dom'
import Note from '../Note/Note'
import LinkButton from '../LinkButton/LinkButton'
import './NoteListMain.css'

export default function NoteListMain(props) {
    return (
        <section className='NoteListMain'>
            <ul>
                {props.notes.map(note =>
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

NoteListMain.defaultProps = {
    notes: [],
}