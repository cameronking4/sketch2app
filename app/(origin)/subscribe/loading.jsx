import React from 'react';
import Spinner from '../components/Spinner';

const Loading = () => {
  return (
    <div className='flex items-center justify-center h-[70vh]'>
      <Spinner />
    </div>
  );
}

export default Loading;
