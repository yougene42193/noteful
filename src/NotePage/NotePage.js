import React from 'react'
import LinkButton from '../LinkButton/LinkButton'
import '../LinkButton/LinkButton.css'

export default function NotePage(props) {
    return (
      <div className='NotePageNav'>
        <LinkButton
          tag='button'
          role='link'
          onClick={() => props.history.goBack()}
          className='NotePageNav__back-button'
        >
          <br />
          Back
        </LinkButton>
        {props.folder && (
          <h3 className='NotePageNav__folder-name'>
            {props.folder.name}
          </h3>
        )}
      </div>
    )
  }
  
  NotePage.defaultProps = {
    history: {
      goBack: () => {}
    }
  }