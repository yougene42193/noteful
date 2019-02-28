import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import LinkButton from '../LinkButton/LinkButton'
import NoteContext from '../NoteContext'
import { countNotesForFolder } from '../Helper'
import './NoteList.css'

export default class NoteList extends React.Component {
    static contextType = NoteContext;

    render() {
        const { folders=[], notes=[] } = this.context
        return (
            <div className='NoteListNav'>
                <ul className='NoteListNav_list'>
                    {folders.map(folder =>
                        <li key={folder.id}>
                            <NavLink
                                className='NoteListNav_folder-link'
                                to={`/folder/${folder.id}`}
                            >
                                <span className='NoteListNav_num-notes'>
                                    {countNotesForFolder(notes, folder.id)}
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
                        Add Folder
                    </LinkButton>
                </div>
            </div>
        )
    }
}