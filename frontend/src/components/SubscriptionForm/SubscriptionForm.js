import React from "react";
import './subscriptionForm.css';
import Input from "../HTML/Input/Input";
// import SelectInput from "../Form/SelectInput";
import Contact from "../../classes/Contact";
import ValidationForm from "../../classes/ValidationForm";

class SubscriptionForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            inSubmit: false,
            firstname: '',
            lastname: '',
            company: '',
            email: '',
            phone: '',
            city: '',
            postCode: 0,
            isPresent: 'false',
        }

        this.handleChange = this.handleChange.bind(this);
        this.postContact = this.postContact.bind(this);
        this.returnSubmit = this.returnSubmit.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(event){
        event.preventDefault();
        const name = event.target.name;
        this.setState({
            [name]: event.target.value,
        });
    }

    /**
     * Return a classified object with each inputs
     * @returns {{firstname: Element, phone: Element, company: Element, department: Element, email: Element, lastname: Element}}
     */
    getSubscriptionInputs(){
        return {
            firstname: document.querySelector('form[name="subscription-form"] input[name="firstname"]'),
            lastname: document.querySelector('form[name="subscription-form"] input[name="lastname"]'),
            company: document.querySelector('form[name="subscription-form"] input[name="company"]'),
            email: document.querySelector('form[name="subscription-form"] input[name="email"]'),
            phone: document.querySelector('form[name="subscription-form"] input[name="phone"]'),
            // department: document.querySelector('Form[name="subscription-form"] select[name="department"]'),
            postCode: document.querySelector('form[name="subscription-form"] input[name="postCode"]'),
        }
    }

    /**
     * Returns an array containing errors of the subscription Form
     * @returns {[{error}]}
     */
    getFormErrors(){
        let errors = [];
        // All inputs in a single array
        const allInputs = document.querySelectorAll('form[name="subscription-form"] .form-input');
        // All inputs in a classified object
        const inputs = this.getSubscriptionInputs();

        // Checks if all inputs are filled
        allInputs.forEach(input => ValidationForm.noEmptyInput(input, errors));

        // Check if inputs required does have minimum characters
        ValidationForm.minCharactersInput(2, inputs.firstname, errors);
        ValidationForm.minCharactersInput(2, inputs.lastname, errors);
        ValidationForm.minCharactersInput(2, inputs.company, errors);

        // Check if the email value is right
        ValidationForm.validEmailInput(inputs.email, errors);

        // Check if numeric inputs respect numeric only characters value
        ValidationForm.postCodeOnly(inputs.postCode, errors)
        ValidationForm.validPhoneInput(inputs.phone, errors);

        return errors;
    }


    /**
     * Insert the right error message to the right input. If input is valid, generates a success message and attaches it to the input.
     * @param errors
     * @param allInputs
     */
    showValidationMessages(errors, allInputs){
        errors.forEach(error => {
            const element = (error.input === 'department') ? document.querySelector(`form[name="subscription-form"] select[name="${error.input}"]`) : document.querySelector(`form[name="subscription-form"] input[name="${error.input}"]`);
            const parentElement = element.parentElement;
            if(!parentElement.querySelector('.error-form')){
                const errorElement = ValidationForm.createValidationMessage({ type: 'error', message: error.message });
                parentElement.appendChild(errorElement);
            }
        })

        allInputs.forEach(input => {
            const parentElement = input.parentElement;
            if (!parentElement.querySelector('span[class^="validation-message"]')){
                const successElement = ValidationForm.createValidationMessage({ type: 'success', message: 'La valeur spécifiée est valide' });
                parentElement.appendChild(successElement);
            }
        })
    }

    validateForm(){
        const inputsArr = document.querySelectorAll('form[name="subscription-form"] .form-input');
        ValidationForm.cleanInputsMessages(inputsArr);
        const errors = this.getFormErrors();
        this.showValidationMessages(errors, inputsArr);

        return (errors.length === 0)
    }
    async postContact(contact){
        // const apiUrl = 'https://app-salon-socodip.herokuapp.com';
        const apiUrl = 'http://localhost:4009';
        return fetch(apiUrl + '/salon/contacts/create/', {method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-type': 'application/json' },
            body: JSON.stringify(contact)})
            .then((res) => res.json() )
            .then(response => {
                return response
            })
            .catch(err => {
                console.log(err)
                alert(err.message);
            });
    }

    returnSubmit(value, response){
        this.props.submit(value, response);
    }

    submit(event){
        event.preventDefault();
        const isValid = this.validateForm();
        if (isValid){
            this.setState({ inSubmit: true })
            const contact = new Contact(this.state);
            // GETTING RESULTS
            this.postContact(contact)
                .then(postResult => {
                    (postResult.status === 200) ? this.returnSubmit(true, postResult) : this.returnSubmit(false, postResult)   
                })
                .catch(e => console.log(e));
        }

    }

    render() {
        return (

            <form onSubmit={this.submit} name="subscription-form">

                <div className="form-group">
                    <Input type="text" label="Prénom :" name="firstname" value={this.state.firstname} handleChange={this.handleChange} />

                    <Input type="text" position="end" label="Nom :" name="lastname" value={this.state.lastname} handleChange={this.handleChange}/>
                </div>

                <div className="form-group">
                    <Input type="text" label="Entreprise :" name="company" value={this.state.company} handleChange={this.handleChange} />

                    <Input type="email" position="end" label="Adresse mail :" name="email" value={this.state.email} handleChange={this.handleChange}/>
                </div>

                <div className="form-group">
                    <Input type="phone" label="N° de téléphone :" name="phone" value={this.state.phone} handleChange={this.handleChange}/>

                    <Input type="number" label="Code Postal" name="postCode" value={this.state.postCode} handleChange={this.handleChange}/>
                </div>


                <div className="form-submit">
                    <input type="submit" value='Envoyer'/>
                </div>

                {(this.state.inSubmit === true) ? <p className="on-submit-message" align="center">L'inscription est en cours d'enregistrement ...</p> : null}

            </form>

        )
    }

}

export default SubscriptionForm;