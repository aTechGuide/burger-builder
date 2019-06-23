import React from 'react';
import classes from './Input.module.css';
import { tsPropertySignature } from '@babel/types';

const Input = (props) => {

  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  let validationError = null;
  if (props.invalid && props.touched) {
    validationError = <p className={classes.ValidationError}>Please enter a valid {props.elementName}!</p>;
  }

  switch (props.elementType) {
    case 'input':
      inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
      break;
    case 'textarea':
      inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
      break; 
    case 'select':
      inputElement = (
        <select className={inputClasses.join(' ')} value={props.value}onChange={props.changed}>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}> {option.displayValue} </option>
          ))}
         </select>);
      break; 
    default:
      inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} />
      break;
  }


  return (
    <div className={classes.Input}>
      <label className={classes.Label}> {tsPropertySignature.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
}

export default Input;