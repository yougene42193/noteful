import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import LinkButton from '../LinkButton/LinkButton'
import { countNotesForFolder } from '../note-helpers'
import './NoteList.css'

export default function NoteList(props) {
    return (
        <div className='NoteListNav'>
            <ul className='NoteListNav_list'>
                {props.folders.map(folder =>
                    <li key={folder.id}>
                        <NavLink
                            className='NoteListNav_folder-link'
                            to={`/folder/${folder.id}`}
                        >
                            <span className='NoteListNav_num-notes'>
                                {countNotesForFolder(props.notes, folder.id)}
                            </span>
                            {folder.name}
                        </NavLink>
                    </li>
                )}
            </ul>
            <div className='NoteListNav_button-wrapper'>
                <LinkButton
                    tag={Link}
                    to='/add-folder'
                    type='button'
                    className='NoteListNav_add-folder-button'
                >
                    <br />
                    Folder
                </LinkButton>
            </div>
        </div>
    )
}

NoteList.defaultProps = {
    folders: [],
}