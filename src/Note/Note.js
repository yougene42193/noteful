import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'url';
import './Note.css'

export default function Note(props) {
    return (
        <section className='note'>
            <h2 className='note-title'>
                <Link to={`/note/${props.id}`}>
                    {props.name}
                </Link>
            </h2>
            <button className='delete-note'>
                Delete Note
            </button>
            <div className='note-date'>
                <div className='modified-date'>
                    Modified
                    {' '}
                    <span className='date'>
                        {format(props.modified, 'DD MM YYYY')}
                    </span>
                </div>
            </div>
        </section>
    )
}