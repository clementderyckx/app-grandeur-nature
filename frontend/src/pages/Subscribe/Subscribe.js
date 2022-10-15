import React from "react";
import './form.css'
import SubscriptionForm from "../../components/SubscriptionForm/SubscriptionForm";
import Footer from "../../components/Footer/Footer";
import SubmitValidationMessage from "../../components/SubscriptionForm/SubmitValidationMessage/SubmitValidationMessage";
import {Fragment} from "react";

export default class Subscribe extends React.Component {

    constructor(props) {
        super(props);

        this.state= {
            submitted: false,
            error: 0,
            response: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(value, response){
        this.setState({submitted: value})
        if(value === true && response.status === 200) {
            this.setState({response: 200, contact: response.result})
        } else if(response.status === 400){
            this.setState({response: 400, error: 1, contact: response.result})
        }
        else {
            this.setState({error: 2})
        }
    }

    subtitle(){
        if(this.state.error === 2) {
            return <p>Une erreur est survenue lors de votre inscription au salon. Merci de bien vouloir resoumettre le formulaire</p>;
        } else if(this.state.submitted === true && this.state.error === 0){
            return <p>Merci de vous êtes inscrit. Nous vous attendons avec impatience le 23 septembre</p>
        } else{
            return null
        }
    }

    render() {
        const containerClassName = (this.state.submitted === false && this.state.error != 1) ? "content-container form-container" : "content-container";
        return (
            <Fragment>
                <header className="title">
                    <h1>Inscrivez vous à notre salon</h1>
                    <div className="subtitle">
                        <p className="date">Jeudi 15 Septembre 2022 à Gauchy (02)</p>
                        <p className="hours">à partir de 8h30</p>
                    </div>
                </header>

                <div className={containerClassName}>

                    {(this.state.submitted === false && this.state.error != 1) ? <SubscriptionForm submit={this.handleSubmit} isSubmit={this.state.submitted}/> : null}
                    <SubmitValidationMessage submitted={this.state.submitted} error={this.state.error} response={this.state.response} />

                </div>

                <Footer />

            </Fragment>
        )

    }


}