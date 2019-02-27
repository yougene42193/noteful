import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import NoteContext from '../NoteContext'
import './AddFolder.css'

export default class AddFolder extends Component {
    static defaultProps = {
        history: {
            push: () => { }
        },
    }
    static contextType = NoteContext;

    handleSubmit = e => {
        e.preventDefault()
        const folder ={
            name: e.target['folder-name'].value
        }
        fetch('http://localhost:9090/folders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(folder)
        })
            .then(res => {
                if(!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then(folder => {
                this.context.addFolder(folder)
                this.props.history.push(`/folder/${folder.id}`)
            })
            .catch(error => {
                console.error({ error })
            })
    }

    render() {
        return (
            <section className='AddFolder'>
                <h2>Create A Folder</h2>
                <NotefulForm onSubmit={this.handleSubmit}>
                    <div className='note-form'>
                        <label for='folder-name'>
                            Name
                        </label>
                        <input type='text' id='folder-name' name='folder-name' />
                    </div>
                    <div className='add-folder-button'>
                        <button type='submit'>
                            Add Folder
                        </button>
                    </div>
                </NotefulForm>
            </section>
        )
    }
}