import React from 'react'
import { CloseIcon } from '../../../../svg'
import { clearFiles } from '../../../../features/chatSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Header({activeIndex}) {
    const dispatch = useDispatch()
    const { files } = useSelector((state) => state.chat)
    const clearFilesHandler = async () => {
        dispatch(clearFiles())
    }

    return (
        <div className='w-full pl-4'>
            <div className='w-full flex items-center justify-between'>
                <div className='translate-x-4 cursor-pointer' onClick={() => clearFilesHandler()}>
                    <CloseIcon className="dark:fill-dark_svg_1" />
                </div>
                <h1 className='dark:text-dark_text_1 text-[15px]'>
                    {files[activeIndex]?.file?.name}
                </h1>
                <span></span>
            </div>
        </div>
    )
}
