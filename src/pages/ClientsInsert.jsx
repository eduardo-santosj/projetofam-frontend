import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class ClientsInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            classification: '',
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name: name })
    }

    handleChangeInputEmail = async event => {
        const email = event.target.value

        this.setState({ email: email })
    }

    handleChangeInputClassification = async event => {
        const classification = event.target.value
        this.setState({ classification: classification })
    }

    handleIncludeClient = async () => {
        const { name, email, classification } = this.state
        const payload = { name, email, classification }

        await api.insertClient(payload).then(res => {
            window.alert(`Cliente inserido com sucesso`)
            this.setState({
                name: '',
                email: '',
                classification: '',
            })
        })
    }

    render() {
        const { name, email, classification } = this.state
        return (
            <Wrapper>
                <Title>Create Movie</Title>

                <Label>Name: </Label>
                <InputText
                    type="text"
                    value={name}
                    onChange={this.handleChangeInputName}
                />

                <Label>email: </Label>
                <InputText
                    type="text"
                    value={email}
                    onChange={this.handleChangeInputEmail}
                />

                <Label>classification: </Label>
                <InputText
                    type="text"
                    value={classification}
                    onChange={this.handleChangeInputClassification}
                />

                <Button onClick={this.handleIncludeClient}>Adicionar Cliente</Button>
                <CancelButton href={'/clients/list'}>Cancelar</CancelButton>
            </Wrapper>
        )
    }
}

export default ClientsInsert