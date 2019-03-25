import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import NoteContext from '../NoteContext'
import ValidationError from '../ValidationError/ValidationError'
import PropTypes from 'prop-types';
import './AddNote.css'

export default class AddNote extends Component {
    static defaultProps = {
        history: {
            push: () => { }
        }
    }
    static contextType = NoteContext;

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            content: '',
            folderId: '',
            titleValid: false,
            bodyValid: false,
            folderValid: false,
            formValid: false,
            successMessage: '',
            validationMessages: {
                name: '',
                content: '',
                folderId: '',
                form: '',
            }
        };
    }

    updateTitle(name) {
        this.setState({name}, () => {this.validateTitle(name)});
    }

    updateContent(content) {
        this.setState({content}, () => {this.validateContent(content)});
    }

    handleSubmit = e => {
        e.preventDefault()
        const newNote = {
            name: e.target['note-name'].value,
            content: e.target['note-content'].value,
            folderId: e.target['note-folder-id'].value,
            modified: new Date(),
        }
        fetch('http://localhost:8000/api/notes', {
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

    validateTitle(name) {
        const validationMessages = this.state.validationMessages;
        validationMessages.form = '';
        let hasError = false;
        if (name.length === 0) {
            validationMessages.name = 'Title is required';
            hasError = true
        } else {
            if (name.length < 3) {
                validationMessages.name = 'Title must be at least 3 characters long.';
                hasError = true
            } else {
                validationMessages.name = '';
                hasError = false
            }
            this.setState(
                {validationMessages, titleValid: !hasError},
                this.formValid
            );
        }
    }

    validateContent(content) {
        const validationMessages = this.state.validationMessages;
        validationMessages.form = '';
        let hasError = false;
        if (content.length === 0) {
            validationMessages.content = 'Body cannot be empty.'
            hasError = true;
        } else {
            validationMessages.content = '';
            hasError = false;
        }
        this.setState(
            {validationMessages, bodyValid: !hasError},
            this.formValid
        )
    }

    formValid() {
        const { titleValid, bodyValid, folderValid} = this.state;
        this.setState({ formValid: titleValid && bodyValid && folderValid })
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
                        <ValidationError
                            hasError={!this.state.titleValid}
                            message={this.state.validationMessages.name} 
                        />
                    </div>
                    <div className='field'>
                        <label for='note-content-input'>
                            Content
                        </label>
                        <textarea id='note-content-input' name='note-content' />
                        <ValidationError
                            hasError={!this.state.bodyValid}
                            message={this.state.validationMessages.content} />
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
                        <ValidationError
                            hasError={!this.state.folderValid}
                            message={this.state.validationMessages.folderId} />
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

AddNote.propTypes = {
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
}