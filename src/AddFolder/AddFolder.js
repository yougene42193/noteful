import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import NotesContext from '../NotesContext'
import config from '../config'
import './AddFolder.css'

export default class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folder: ''
    }
  }
  static contextType = NotesContext;

  handleSubmit = e => {
    e.preventDefault()
    
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({folder_name: this.state.folder}),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(folder => {
        this.context.addFolder(folder)
        this.props.history.push(`/`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  setFolderName = (folder) => {
    this.setState({
      folder
    })
  }

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' name='folder-name'
              onChange={(event)=> this.setFolderName(event.target.value)} required
            />
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
