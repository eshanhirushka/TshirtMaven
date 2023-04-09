import React from 'react';

import CustomButton from './CustomButton';

const Downloader = () => {
  return (
    <div className="filepicker-container">
        <div className="flex-1 flex flex-col">
            <input type="text" />
            <label htmlFor="file-upload" className="filepicker-label">Add Name</label>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
            <CustomButton type="outline" title="Download"/>
        </div>
    </div>
  )
}

export default Downloader