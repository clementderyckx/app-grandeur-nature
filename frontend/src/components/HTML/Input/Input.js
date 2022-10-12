import React from "react";
import './Input.css'
class Input extends React.Component{

    constructor(props) {
        super(props);
        this.position = (props.position) ? props.position : "";
        this.type = (props.type) ? props.type : 'text';
        this.label = props.label;
        this.name = props.name;
        this.value = props.firstname;
        this.handleChange = props.handleChange;
        this.activate = this.activate.bind(this);
    }

    activate(){
        document.querySelector(`span#label-${this.name}`).classList.add('active-label');
    }

    render() {
        const elementClassName = (this.position === "end") ? "form-label flex-end" : "form-label";
        return (
            <label onClick={this.activate} htmlFor={this.name} className={elementClassName}>
                <span className="label-text" id={`label-${this.name}`}>{this.label}</span>
                    <input onInput={this.activate} className="form-input" type={this.type} name={this.name} id={this.name} value={this.value} onChange={this.handleChange}/>
            </label>
        )}
}

export default Input;