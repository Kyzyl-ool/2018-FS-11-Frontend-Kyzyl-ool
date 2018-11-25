import React, {Component} from 'react';
import './Input.css';

const Input = (props) => {
  let element;

  switch (props.type) {
    case 'input':
      element = <input
        type='text'
        className='Input'
        placeholder={props.placeholder}
      />;
      break;

    case 'password':
      element = <input
        type='password'
        className='Input'
        placeholder={props.placeholder}
      />;

      break;

    default:
      element = <input/>;
      break;
  };

  return (
      <div>
        {element}
      </div>
    );
};


export default Input;
