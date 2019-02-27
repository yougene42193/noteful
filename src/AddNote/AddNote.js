import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import NoteContext from '../NoteContext'
import './AddNote.css'

export default class AddNote extends Component {
    static defaultProps = {
        history: {
            push: () => { }
        }
    }
    static contextType = NoteContext;

    handleSubmit = e => {
        e.preventDefault()
        const newNote = {
            name: e.target['note-name'].value,
            content: e.target['note-content'].value,
            folderId: e.target['note-folder-id'].value,
            modified: new Date(),
        }
        fetch('http://localhost:9090/notes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newNote)
        })
        .then(res => {
            if (!res.ok)
                return res.json().then(e => Promise.reject(e))
            return res.json()
        })
        .then(note => {
            this.context.addNote(note)
            this.props.history.push(`/folder/${note.folderId}`)
        })
        .catch(error => {
            console.error({ error })
        })
    }
    render() {
        const { folders=[] } = this.context
        return (
            <section className='AddNote'>
                <h2>Create A Note</h2>
                <NotefulForm onSubmit={this.handleSubmit}>
                    <div className='field'>
                        <label for='note-name'>
                            Name
                        </label>
                        <input type='text' id='note-name' name='note-name' />
                    </div>
                    <div className='field'>
                        <label for='note-content-input'>
                            Content
                        </label>
                        <textarea id='note-content-input' name='note-content' />
                    </div>
                    <div className='field'>
                        <label for='note-folder'>
                            Folder
                        </label>
                        <select id='note-select' name='note-folder-id'>
                            <option value={null}>...</option>
                            {folders.map(folder =>
                                <option key={folder.id} value={folder.id}>
                                    {folder.name}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className='buttons'>
                        <button type='submit'>
                            Add Note
                        </button>
                    </div>
                </NotefulForm>
            </section>
        )
    }
}