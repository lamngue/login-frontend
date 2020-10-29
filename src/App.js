import './App.css';
import FormComponent from './components/FormComponent';
import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: "",
      formIsValid: false,
      validatingCode: false,
      formControls: {
        phone: {
          value: '',
          placeholder: '',
          valid: 0,
          touched: 0,
          disabled: false,
          validationRules: {
            minLength: 3,
            isRequired: true,
            isPhone: true
          }
        },
        code: {
          value: '',
          placeholder: '',
          valid: 1,
          touched: 0,
          disabled: true,
          validationRules: {
            minLength: 6,
            isRequired: false
          }
        }
      }
    }
    this.setFormControlAndValid = this.setFormControlAndValid.bind(this);
    this.setFormAfterSubmitPhone = this.setFormAfterSubmitPhone.bind(this);
    this.setFormAfterSubmitCode = this.setFormAfterSubmitCode.bind(this);
  }

  setFormControlAndValid(updatedControls, formIsValid) {
    this.setState({
      formControls: updatedControls,
      formIsValid: formIsValid
    });
  }

  setFormAfterSubmitPhone(updatedControls, validatingCode, message) {
    this.setState({
      formControls: updatedControls,
      validatingCode: validatingCode,
      message: message
    });
  }

  setFormAfterSubmitCode(message, validate, updatedControls) {
    this.setState({
      message: message,
      validatingCode: !validate,
      formControls: updatedControls,
      formIsValid: false
    })
  }

  render() {
    return (
      <div className="App">
        <FormComponent 
          formIsValid={this.state.formIsValid}
          message={this.state.message}
          validatingCode={this.state.validatingCode}
          formControls={this.state.formControls} 
          setFormControlAndValid={this.setFormControlAndValid} 
          setFormAfterSubmitPhone={this.setFormAfterSubmitPhone}
          setFormAfterSubmitCode={this.setFormAfterSubmitCode}
        />
      </div>
    );
  }
}

export default App;
