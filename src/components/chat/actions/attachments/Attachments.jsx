import React, { useState } from 'react'
import { AttachmentIcon } from '../../../../svg'
import Menu from './menu/Menu'

export default function Attachments({ showAttachments, setShowAttchments, setShowPicker }) {
  return (
    <li className='relative'>
      <button onClick={() => {
        setShowPicker(false)
        setShowAttchments((prev) => !prev)
      }}
        type='button'
        className='btn'
      >
        <AttachmentIcon className="dark:fill-dark_svg_1" />
      </button>
      {showAttachments ? <Menu /> : null}
    </li>
  )
}
