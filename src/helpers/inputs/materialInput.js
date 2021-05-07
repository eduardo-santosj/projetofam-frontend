// React
import React, { Component } from "react";
import { Dropdown } from 'primereact/components/dropdown/Dropdown';

class MaterialInput extends Component {

	constructor(props) {
		super(props);
		this.state = { focus: false }

		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	onFocus() {
		this.setState({ focus: true });
	}

	onBlur() {
		this.setState({ focus: false });
	}

	changeDropdownType(){
		const {type} = this.props
		if (type === "dropdown") {
			document.getElementsByClassName("ui-helper-hidden-accessible")[1].getElementsByTagName("input")[0].setAttribute("type", "hidden")
		}
	}

	handleType() {
		const { type, inputClass, name, list, value, onChange, optionValue, optionText, error, disabled, template, placeholder, hiddenPlaceholder = false, optionLabel, maxlength, minlength } = this.props;
        if (type === "select") {
            return (
                <select className={inputClass + (error ? " is-invalid" : "")} name={name} value={value ? value : ""} onChange={onChange} onFocus={this.onFocus} onBlur={this.onBlur} disabled={disabled}>
                    {(!value || (list && list.loading)) &&
                        <option selected hidden={hiddenPlaceholder} value={placeholder}>{placeholder}</option>
                    }
                    {typeof list === "function" &&
                        list()
                    }
                    {typeof list === "object" && list.map((item, index) =>
                        <option key={index} value={optionValue ? item[optionValue] : item}>{optionText ? item[optionText] : item}</option>
                    )}
                </select>
            )
        }

		if (type === "text" || type === 'password') {
			return (
				<input className={inputClass + (error ? " is-invalid" : "")} type={type} name={name} value={value ? value : ""} onChange={onChange} onFocus={this.onFocus} onBlur={this.onBlur} disabled={disabled} placeholder={placeholder} maxlength={maxlength} minlength={minlength}/>

			)
		}

		if (type === "dropdown") {
			return (
				<Dropdown
					optionLabel={optionLabel ? optionLabel: "label"}
					disabled={disabled}
					value={value}
					options={list}
					itemTemplate={template}
					onChange={onChange}
				/>
			)
		}
	}

	render() {
		const { blackLabel, containerClass, label, value, name, list, error, errorMsg, type } = this.props;
		const { focus } = this.state;
		return (
			<div className={containerClass}>
				<label htmlFor={name} className="label-title">{label}</label>
				<div className={"col-12 p-0 input" + ((value && list && !list.loading) || (type === "text" && value) ? " has-value" : "") + (focus ? blackLabel ? " has-focus-black " : " has-focus " : "") + (error ? " has-error" : "")}>
					{this.handleType()}
					{error &&
						<div className="invalid-feedback">{errorMsg}</div>
					}
				</div>
			</div>
		);
	}
	componentDidMount() {
		{ this.changeDropdownType() }
	}
}

export default MaterialInput;