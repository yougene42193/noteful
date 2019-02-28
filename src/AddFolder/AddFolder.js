import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import NoteContext from '../NoteContext'
import ValidationError from '../ValidationError/ValidationError'
import PropTypes from 'prop-types';
import './AddFolder.css'

export default class AddFolder extends Component {
    static defaultProps = {
        history: {
          push: () => { }
        },
      }
      static contextType = NoteContext;

      constructor(props) {
          super(props);
          this.state = {
              name: '',
              nameValid: false,
              formValid: false,
              validationMessage: '',
              formValidationMessage: '',
              successMessage: '',
          };
      }
    
      handleSubmit = e => {
        e.preventDefault()
        const folder = {
          name: e.target['folder-name'].value
        }
        fetch(`http://localhost:9090/folders`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(folder),
        })
          .then(res => {
            if (!res.ok)
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

      validateFolderName(name) {
        let validationMessage = this.state.validationMessage;
        let hasError = false;
        if (name.length === 0) {
            validationMessage = 'Folder name is required';
            hasError = true;
        } else {
            validationMessage = '';
            hasError = false;
        }
        this.setState({
            validationMessage,
            nameValid: !hasError,
            formValid: !hasError,
            formValidationMessage: ''
        });
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
                        <ValidationError
                            hasError={!this.nameValid}
                            message={this.validationMessage} />
                    </div>
                    <div className='add-folder-button'>
                        <button type='submit'>
                            Add Folder
                        </button>
                        <ValidationError
                            hasError={!this.formValid}
                            message={this.formValidationMessage} 
                        />
                    </div>
                </NotefulForm>
            </section>
        )
    }
}

AddFolder.propTypes = {
    name: PropTypes.string.isRequired
}