import React from "react";
import ('./SelectInput.css');
class SelectInput extends React.Component{

    constructor(props) {
        super(props);
        this.position = (props.position) ? props.position : "";
        this.label = props.label;
        this.name = props.name;
        this.value = props.firstname;
        this.handleChange = props.handleChange
        this.options = props.children;
        this.getOptionsElements()

    }

    getOptionsElements(){
        const elements = [];
        elements.push(<option value="" defaultValue key=""></option>);
        this.options.forEach( option => {
            const value = (option.split('-')[0].includes(' ')) ? option.split('-')[0].replaceAll(' ', '') : option.split('-')[0];
            elements.push(<option value={value} key={value}>{option}</option>)
        } )
        return elements;
    }

    render() {
        const options = this.getOptionsElements();
        const elementClassName = (this.position === "end") ? "Form-label flex-end" : "Form-label";
        return (
            <label htmlFor={this.name} className={elementClassName}>
                <span className="label-text">{this.label}</span>
                <select className="form-input" id="department" name={this.name}>
                    {options.map(option => option)}
                </select>
            </label>
        )}
}

export default SelectInput;