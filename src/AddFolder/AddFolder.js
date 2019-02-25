import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'

export default class AddFolder extends Component {
    render() {
        return (
            <section className='AddFolder'>
                <h2>Create A Folder</h2>
                <NotefulForm>
                    <div className='note-form'>
                        <label for='folder-name'>
                            Name
                        </label>
                        <input type='text' id='folder-name' />
                    </div>
                    <div className='add-folder-button'>
                        Add Folder
                    </div>
                </NotefulForm>
            </section>
        )
    }
}