// React
import React, { Component } from "react"

// Libraries
import InputMask from "react-input-mask";

export default class CustomInputMask extends Component {
  constructor(props) {
    super(props);
    this.state = { focus: false };
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  onBlur() {
    this.setState({ focus: false });
  };

  onFocus() {
    this.setState({ focus: true });
  };

  render() {
    const { blackLabel, containerClass, error, errorMsg, label, mask, maskChar, name, inputClass, onChange, value,
      placeholder, disabled, autocomplete } = this.props;
    const { focus } = this.state;
    return (
      <div
        className={containerClass.concat(" input").concat(value ? " has-value " : "").concat(focus ? blackLabel ? " has-focus-black " : " has-focus " : "").concat(error ? " has-error " : "").concat(disabled ? " disabled" : "")}>
        <label htmlFor={name} className="label-title">{label}</label>
        <InputMask
          disabled={disabled}
          className={inputClass.concat(error ? " is-invalid" : "")}
          mask={mask}
          name={name}
          onBlur={this.onBlur}
          maskChar={maskChar ? maskChar : "_"}
          value={(value !== undefined && value !== null && value.length >= 0) ? value : null}
          onChange={onChange}
          onFocus={this.onFocus}
          placeholder={placeholder}
          autocomplete={autocomplete ? autocomplete : "on"} />
        {error && <div className="invalid-feedback">{errorMsg}</div>}
      </div>
    )
  }
}