import React from 'react';
import './TextInput.css';
 const PhoneInput = (props) => {

     let formControl = "form-control";

     if (props.touched===0 && !props.valid) {
         formControl = 'form-control control-error';
     }

    return (
        <div className="form-group">
            <input type="tel" className={formControl} {...props} placeholder="123-456-7890 or (123) 456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required/>
        </div>
    )
}

export default PhoneInput;