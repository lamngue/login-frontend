const validate = (value, rules) => {
    let isValid = true;

    for (let rule in rules) {

        switch (rule) {
            case 'minLength': isValid = isValid && minLengthValidator(value, rules[rule]); break;

            case 'isRequired': isValid = isValid && requiredValidator(value); break;

            case 'isPhone': isValid = isValid && phoneValidator(value); break;

            default: isValid = true;
        }

    }

    return isValid ? 1 : 0;
}

/**
 * Check to confirm that feild is required
 * 
 * @param  value 
 * @return       
 */
const requiredValidator = value => {
    return value.trim() !== '';
}


/**
 * minLength Val
 * @param  value 
 * @param  minLength
 * @return          
 */
const minLengthValidator = (value, minLength) => {
    return value.length >= minLength;
}


const phoneValidator = value => {
    const phoneRegEx = /^(\([0-9]{3}\)\s*|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
    return phoneRegEx.test(value);
}

export default validate;
