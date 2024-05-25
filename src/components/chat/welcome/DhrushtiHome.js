import React from 'react'
import { Logo } from '../../../svg'

export default function DhrushtiHome() {
    return (
        <div className='h-full w-full dark:bg-dark_bg_4 select-none border-1 dark:border-1-dark_border_1 border-b-[6px] border-b-green_2'>
            <div className='-mt-1.5 w-full h-full flex flex-col gap-y-8 items-center justify-center'>
                <span>
                    <Logo />
                </span>
                <div className='mt-1 text-center space-y-[12px'>
                    <h1 className='text-[32px] dark:text-dark_text_4 font-extralight'>
                        Dhrushti Messaging Application
                    </h1>
                    <p className='text-sm dark:text-dark_text_3'>
                        Send and Receive Message Without keeping Your Phone Online.
                    </p>
                </div>
            </div>
        </div>
    )
}
