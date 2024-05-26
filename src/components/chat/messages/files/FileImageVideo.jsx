import React, { useState } from 'react';

export default function FileImageVideo({ file, url, type, me }) {
    const [downloaded, setDownloaded] = useState(false);

    const handleOpenFile = () => {
        window.open(url, '_blank');
    };

    return (
        <div className="z-20">
            {type === 'IMAGE' ? (
                <div className='relative'>
                    <img src={url} alt="" className={`relative cursor-pointer`} onClick={handleOpenFile} />
                </div>
            ) : (
                <div className="relative cursor-pointer">
                    <video src={url} controls className="cursor-pointer" onClick={handleOpenFile}></video>
                </div>
            )}
        </div>
    );
}
