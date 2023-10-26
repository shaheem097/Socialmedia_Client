import React from 'react';
import { PulseLoader } from 'react-spinners';

function Loading() {
  return (
    <div className="loading-container">
      <PulseLoader color={'#36D7B7'} loading={true} size={15} />
    </div>
  );
}

export default Loading;