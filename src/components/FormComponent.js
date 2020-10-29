import React, { Component } from 'react';
import PhoneInput from './PhoneInput';
import CodeInput from './CodeInput';
import validate from './validate';
import * as Api from './Api';

export default class FormComponent extends Component {
    
    changeHandler = event => {

        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = {
            ...this.props.formControls
        };
        const updatedFormElement = {
            ...updatedControls[name]
        };
        updatedFormElement.value = value;
        updatedFormElement.touched = 1;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

        updatedControls[name] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }
        this.props.setFormControlAndValid(updatedControls, formIsValid);
    }

    formSubmitHandler = () => {
        const formData = {};
        const updatedControls = {
            ...this.props.formControls
        };
        const updatedFormElementCode = {
            ...updatedControls['code']
        };
        const updatedFormElementPhone = {
            ...updatedControls['phone']
        };
        for (let formElementId in this.props.formControls) {
            formData[formElementId] = this.props.formControls[formElementId].value;
        }
        if (!this.props.validatingCode) {
            Api.postURL("/create-access-code", formData).then(res => {
                let message = "";
                let validatingCode = false;
                if (res.data.invalidNumber) {
                    message = res.data.message;
                } else {
                    message = res.data.message;
                    updatedFormElementCode.disabled = false;
                    updatedFormElementCode.placeholder = "Please enter a 6 digits code."
                    updatedFormElementPhone.disabled = true;
                    validatingCode = true;
                }
                updatedControls['code'] = updatedFormElementCode;
                updatedControls['phone'] = updatedFormElementPhone;
                this.props.setFormAfterSubmitPhone(updatedControls, validatingCode, message);
            });
        } else {
            Api.postURL("/validate-code", formData).then(res => {
                const message = res.data.message;
                let validated = res.data.validated;
                let validatingCode = this.props.validatingCode;
                if (validated) {
                    updatedFormElementCode.disabled = true;
                    updatedFormElementPhone.disabled = false;
                    updatedFormElementCode.placeholder = "";
                    updatedFormElementCode.value = '';
                    updatedFormElementPhone.value = '';
                    validatingCode = false;
                } else {
                    updatedFormElementCode.disabled = false;
                    updatedFormElementPhone.disabled = true;
                    validatingCode = true;
                }
                updatedControls['code'] = updatedFormElementCode;
                updatedControls['phone'] = updatedFormElementPhone;
                this.props.setFormAfterSubmitCode(message, updatedControls, validatingCode);
            });
        }
    }

    render() {
        return (
            <div>
                <label><b>Enter phone number</b></label>
                <PhoneInput name="phone"
                    placeholder={this.props.formControls.phone.placeholder}
                    value={this.props.formControls.phone.value}
                    onChange={this.changeHandler}
                    touched={this.props.formControls.phone.touched}
                    valid={this.props.formControls.phone.valid}
                    disabled={this.props.formControls.phone.disabled}
                />
                <label><b>Enter Access Code</b></label>
                <CodeInput name="code"
                    placeholder={this.props.formControls.code.placeholder}
                    value={this.props.formControls.code.value}
                    onChange={this.changeHandler}
                    touched={this.props.formControls.code.touched}
                    valid={this.props.formControls.code.valid}
                    disabled={this.props.formControls.code.disabled}
                />
                <br/>
                <button 
                    onClick={this.formSubmitHandler}
                    disabled={!this.props.formIsValid}
                > Submit </button>
                <br />
                <p>{this.props.message}</p>
            </div>
        );
    }
}