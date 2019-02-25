import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddNote.css'

export default class AddNote extends Component {
    static defaultProps = {
        folders: [],
    }
    render() {
        const { folders } = this.props
        return (
            <section className='AddNote'>
                <h2>Create A Note</h2>
                <NotefulForm>
                    <div className='field'>
                        <label for='note-name'>
                            Name
                        </label>
                        <input type='text' id='note-name'/>
                    </div>
                    <div className='field'>
                        <label for='note-folder'>
                            Folder
                        </label>
                        <select id='note-select'>
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