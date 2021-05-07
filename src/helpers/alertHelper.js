import React, { Component } from 'react'
import { Alert } from 'react-bootstrap'

class ShowAlert extends Component {
  ShowAlerts() {
    let Title, Text, variant = ''

    if(this.props.type) {
      variant = 'success'
      Title = 'Sucesso'
      Text = this.props.message
    } else {
      variant = 'danger'
      Title = 'Erro'
      Text = this.props.message
    }
    if (this.props.show) {
      return (
        <Alert variant={variant} className="fade-alert">
          <Alert.Heading>{Title}</Alert.Heading>
          <p className="mb-0">
            {Text}
          </p>
        </Alert>
      );
    }
  }
  render() {
    return (
      this.ShowAlerts()
    )
  }
}

export default ShowAlert