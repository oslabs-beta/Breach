import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import './spinner.css';

export default function Spinner(props) {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress && (
      <div className='spinner'>
        <Loader
          type='TailSpin'
          color='#808080'
          height='100'
          width='100'
          visible={props.visible}
        />
      </div>
    )
  );
}
