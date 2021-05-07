// React
import React, { Component } from "react";

export default class CustomCheckbox extends Component {
  render() {
    const { checked, customClass, onClick } = this.props;
    return (
      <div className={"custom-checkbox".concat(checked ? " checked " : "").concat(customClass ? " ".concat(customClass).concat(" ") : "")} onClick={onClick} disabled>
        {checked && <i className="fa fa-check"/>}
      </div>
    )
  }
}