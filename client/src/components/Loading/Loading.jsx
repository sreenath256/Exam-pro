import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
          <AiOutlineLoading3Quarters className="animate-spin text-center text-4xl text-blue-500 dark:text-blue-400" />
        </div>
      );
}

export default Loading
