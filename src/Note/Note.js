import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'url';
import './Note.css'

export default function Note(props) {
    return (
        <section className='note'>
            <h2 className='note-title'>
                <Link to={`/note/${props.id}`}>
                    {props.name} NOTE TITLE
                </Link>
            </h2>
            <button>
                Delete Note
            </button>
            <div className='modify-date'>
                Modified
                {' '}
                <span className='date'>
                    
                </span>
            </div>
        </section>
    )
}