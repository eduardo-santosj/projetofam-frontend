import React, { Component } from 'react'
import { clientActions } from "../actions/clientAction"
import { connect } from "react-redux";

import {
    Row,
    Container,
    Col,
    Form,
    Button,
    Card
} from 'react-bootstrap'

//Alert
import ShowAlert from '../helpers/alertHelper'
import MaterialInput from '../helpers/inputs/materialInput'
import { helpers } from "../helpers/validate/validateInput";
import { setFirtAcessHelpers } from "../helpers/firstAccess/setFirstAccess"
import CustomInputMask from '../components/customInputMask/customInputMask'
import CustomCheckbox from '../components/customCheckBox/customCheckBox'
import { wordIsAllowed } from "../helpers/configuration";
import { history } from "../helpers/history";


class FirstAccess extends Component {
  constructor(props) {
      super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    const userStorage = JSON.parse(localStorage.getItem("user"));
    dispatch(clientActions.getClient(userStorage.data.email))
  }

  validateRequiredFields(fields) {
    if (fields === undefined || fields === null) return true;
    let fieldsValid = true;
    fields.forEach(actualField => {
      if (actualField === undefined || actualField === null || actualField === "" ||
        actualField === "0" || actualField === 0) fieldsValid = false;
    });
    return fieldsValid;
  };

  loginClient = (e) => {
    e.preventDefault();
    // const { dispatch } = this.props
    // const { emailLogin, passwordLogin } = this.state
    // this.setState({ formSendLogin: true });
    // const fieldsTarget = [emailLogin, passwordLogin];
    // const fieldsValid = this.validateRequiredFields(fieldsTarget);

    // if ( fieldsValid === false || helpers.validateEmail(emailLogin) === false ) return

    // const payload = { emailLogin, passwordLogin }
    // dispatch(loginActions.loginClient(payload, this.callbackLoginClient))
  }

  setCallbackaddress = async (res) => {
    const { dispatch } = this.props
    let Address = []
    Address = {
      CEP: res.address.cep,
      street: res.address.logradouro,
      number: '',
      complement: '',
      neighbourhood: res.address.bairro,
      state: res.address.uf,
      type: '',
      city: res.address.localidade,
    }
    dispatch(setFirtAcessHelpers.handleInput(Address, "Address"))
  }

  render() {
    const { ClientReducer } = this.props
    const { createClientReducer } = ClientReducer
    const { client } = createClientReducer
    const { name, email, identificationNumber,dateOfBirth, phone, Address, isOng, alreadyAdopted, howManyAdopted, gender } = client
    const { CellPhone, homePhone } = phone
    const { CEP, street, number, complement, state, type, city, neighbourhood } = Address
    return (
      <React.Fragment>
        {/* {showAlertMessage && 
        <ShowAlert ref="child" type={typeMessage} show={showAlertMessage} message={messageAlert}/>} */}
        <Container className="first-access">
          <Row className="justify-content-md-center mt-6">
            <Col xs={12}>
              <h4 className="text-uppercase text-center pt-1 pb-4">Finalize o seu cadastro para a gente te conhecer melhor</h4>
            </Col>

            <Col xs={12}>
              <Card>
                <Card.Header>Cliente</Card.Header>
                <Card.Body>
                  <Card.Text>
                  <Form inline onSubmit={(e) => this.handleIncludeClient(e)} className="justify-content-center" >
                    <Form.Row>
                      <MaterialInput
                        type="text"
                        containerClass="col-12 col-md-4"
                        inputClass="form-control"
                        label='Nome'
                        placeholder="Nome Completo"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(event) => setFirtAcessHelpers.handleInput(event, "name")}
                        optionValue="value"
                        optionText="label"
                        minlength="4"
                        disabled={name}
                        // errorMsg='Insira o nome copleto'
                        // error={formCreatedClient && (!name || !validName || !nameHasNotAllowedWord)} 
                        />
                      <MaterialInput
                        type="text"
                        containerClass="col-12 col-md-4"
                        inputClass="form-control"
                        label='Email'
                        placeholder="Email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(event) => setFirtAcessHelpers.handleInput(event, "email")}
                        optionValue="value"
                        optionText="label"
                        disabled={email}
                        // errorMsg='Insira um email valido'
                        // error={formCreatedClient && (!email || !validEmail || !emailHasNotAllowedWord)} 
                      />
                      <CustomInputMask
                        containerClass="col-12 col-md-4"
                        inputClass="form-control"
                        mask={"999.999.999-99"}
                        label={"CPF*"}
                        onChange={(event) => setFirtAcessHelpers.handleInput(event, "identificationNumber")}
                        name="identificationNumber"
                        value={identificationNumber}
                        // disabled={!client.personalInfoSaved || !isInserting || sendAdditionalDataToGtm || !dontSentToGtm || this.updateGTMData}
                        // errorMsg={personType === "PF" ? this.state.client.sameCPF ? 'CPF do Cliente Não é permitido usar mesmo número de CPF para: Cônjuge; Avalista; Procurador e Vendedor' : 'Informe um CPF válido' : 'Informe um CNPJ Válido'}
                        // error={(clientPfSubmitted || clientPjSubmitted) && (!identificationNumber || !helpers.validateCPF(identificationNumber))}
                        error={(!identificationNumber || !helpers.validateCPF(identificationNumber))}
                      />
                    </Form.Row>
                    <Form.Row>
                      <CustomInputMask
                        containerClass="col-12 col-md-6"
                        inputClass="form-control"
                        mask="99/99/9999"
                        label="Data de nascimento*"
                        name="dateOfBirth"
                        value={dateOfBirth}
                        onChange={(event) => setFirtAcessHelpers.handleInput(event, "dateOfBirth")}
                        // error={clientPfSubmitted && (!dateOfBirth || !this.birthDateValidationPfInsured(dateOfBirth).isValid || !this.dateCompare(dateOfBirth))}
                        // errorMsg={!dateOfBirth ? "Informe a data de nascimento" : !this.birthDateValidationPfInsured(dateOfBirth).isValid ? this.birthDateValidationPfInsured(dateOfBirth).message : "Informe uma data válida"}
                      />
                      <MaterialInput
                        type="select"
                        containerClass="col-12 col-md-6"
                        inputClass="custom-select"
                        label="Sexo*"
                        name="gender"
                        optionValue="id"
                        optionText="name"
                        value={gender}
                        onChange={(event) => setFirtAcessHelpers.handleInput(event, "gender")}
                        // list={genders.gendersList}
                        // error={clientPfSubmitted && !gender}
                        // errorMsg="Informe o sexo"
                      />
                    </Form.Row>
                    <Form.Row>
                      <MaterialInput
                        type="text"
                        containerClass="col-12 col-md-6"
                        inputClass="form-control"
                        label="Telefone Casa*"
                        name="homePhone"
                        value={homePhone}
                        onChange={(event) => setFirtAcessHelpers.handleInput(event, "homePhone")}
                        // errorMsg="Informe um telefone válido"
                        // error={clientPfSubmitted && (!phoneNumber || !helpers.validatePhone(phoneNumber))}
                      />
                      <MaterialInput
                        type="text"
                        containerClass="col-12 col-md-6"
                        inputClass="form-control"
                        label="Telefone Celular*"
                        name="CellPhone"
                        value={CellPhone}
                        onChange={(event) => setFirtAcessHelpers.handleInput(event, "CellPhone")}
                        // errorMsg="Informe um telefone válido"
                        // disclaimerMsg={this.state.personType === 'PF' ? "Este número de celular receberá a senha por SMS para assinatura eletrônica. Caso alterado posteriormente, deverá passar por reanálise de crédito." : ''}
                        // disclaimer={this.state.personType === 'PF' ? this.birthDateValidationMsgDisclaimer(dateOfBirth) && helpers.getModule(modulesReducer, 'esign') : ''}
                        // //teste
                        // error={(clientPfSubmitted || clientPjSubmitted) && (!cellPhone || !helpers.validatePhone(cellPhone,true))}
                      />
                    </Form.Row>
                    <Form.Row>
                      <CustomInputMask
                        containerClass="col-12 col-md-4"
                        inputClass="form-control"
                        mask="99999-999"
                        label={"CEP*"}
                        onChange={(event) => setFirtAcessHelpers.handleInput(event, "CEP",'', this.setCallbackaddress)}
                        name="CEP"
                        value={CEP}
                        // errorMsg={client.errorCepMessage ? client.errorCepMessage : 'Informe um cep válido'}
                        // error={(clientPfSubmitted || clientPjSubmitted) && ((!postcode || postcode.indexOf("_") >= 0)) || client.addressError}
                      />
                              
                      <MaterialInput
                        containerClass="col-12 col-md-4"
                        inputClass="form-control"
                        type="text"
                        label="Endereço*"
                        // disabled={!client.loadingAddress && client.addressError ? true : client.cepGeneric ? false : storedAddress && storedAddress.street && storedAddress.street.length > 40 ? false : client.apiNotFound ? false : true}
                        // disabled={!client.loadingAddress ? false : true}
                        name="street"
                        value={street}
                        onChange={(event) => setFirtAcessHelpers.handleInput(event, "street")}
                        // errorMsg={address && address.length > 40 ? "Campo deve conter até 40 caracteres" : "Informe o endereço"}
                        // error={(clientPfSubmitted || clientPjSubmitted) && ((!address || address) && address.length > 40)}
                        // maxlength="40"
                      />
                      <MaterialInput
                        type="select"
                        containerClass="col-12 col-md-4"
                        inputClass="custom-select"
                        label="Tipo*"
                        name="type"
                        value={type}
                        onChange={(event) => setFirtAcessHelpers.handleInput(event, "type")}
                        // list={addressTypes}
                        // optionValue="name"
                        // optionText="name"
                        // errorMsg={"Informe o tipo"}
                        // error={clientPfSubmitted && !addressType}
                      />
                    </Form.Row>
                    <Form.Row>
                      <MaterialInput
                        containerClass="col-12 col-md-4"
                        inputClass="form-control"
                        type="text"
                        label="Número*"
                        name="number"
                        value={number}
                        onChange={(event) => setFirtAcessHelpers.handleInput(event, "number")}
                        // errorMsg={"Informe o número"}
                        // error={(clientPfSubmitted || clientPjSubmitted) && !houseNumber}
                        maxlength="10"
                      />
                      <MaterialInput
                        containerClass="col-12 col-md-4"
                        inputClass="form-control"
                        type="text"
                        // disabled={!client.loadingAddress && client.errorAddress ? false : client.cepGeneric ? false : storedAddress && storedAddress.neighborhood && storedAddress.neighborhood.length > 60 ? false : client.apiNotFound ? false : true}
                        // disabled={!client.loadingAddress && client.errorAddress ? false /*: client.cepGeneric ? false*/ : storedAddress && storedAddress.neighborhood && storedAddress.neighborhood.length > 60}
                        label="Bairro*"
                        name="neighbourhood"
                        value={neighbourhood}
                        onChange={(event) => setFirtAcessHelpers.handleInput(event, "neighbourhood")}
                        // errorMsg={neighbourhood && neighbourhood.length > 60 ? "Campo deve conter até 60 caracteres" : "Informe o logradouro"}
                        // error={(clientPfSubmitted || clientPjSubmitted) && ((!neighbourhood || neighbourhood )&& neighbourhood.length > 60)}
                        // maxlength="60"
                      />
                      <MaterialInput
                        // disabled={!client.loadingAddress && client.errorAddress ? false : client.cepGeneric ? false : client.apiNotFound ? false : true}
                        // disabled={!client.loadingAddress /*&& client.errorAddress ? false : client.cepGeneric*/ }
                        type="select"
                        containerClass="col-12 col-md-4"
                        inputClass="form-control"
                        label="Estado*"
                        name="state"
                        value={state}
                        onChange={(event) => setFirtAcessHelpers.handleInput(event, "state")}
                        // list={states}
                        // optionValue="stateAbbreviation"
                        // optionText="state"
                        // errorMsg={"Informe o estado"}
                        // error={(clientPfSubmitted || clientPjSubmitted) && !stateProvince }
                      />
                    </Form.Row>
                    <Form.Row>
                      <MaterialInput
                        type="select"
                        containerClass="col-12 col-md-3"
                        inputClass="custom-select"
                        label="Cidade*"
                        name="city"
                        // disabled={!client.loadingAddress && client.errorAddress ? false : client.cepGeneric ? false : client.apiNotFound ? false : true}
                        // disabled={!client.loadingAddress ? false : true}
                        value={city}
                        onChange={(event) => setFirtAcessHelpers.handleInput(event, "city")}
                        // list={cityList}
                        // optionValue="id"
                        // optionText="city"
                        // errorMsg={"Informe a cidade"}
                        // error={(clientPfSubmitted || clientPjSubmitted) && !city}
                      />
                      <MaterialInput
                        containerClass="col-12 col-md-6"
                        inputClass="form-control"
                        type="text"
                        label="Complemento"
                        name="complement"
                        value={complement}
                        // errorMsg={"Informe o complemento"}
                        // error={clientPfSubmitted && addressTypeIsApartment && !complement}
                        onChange={(event) => setFirtAcessHelpers.handleInput(event, "complement")}
                        maxlength="25"
                      />
                    </Form.Row>
                    <Form.Row>
                      <div className="col-12 col-md-6 checkboxes mt-3">
                        <CustomCheckbox onClick={(event) => setFirtAcessHelpers.handleInput(event, "isOng")} checked={isOng} />
                        <label className="pl-2 text">Você faz parte de alguma ong de adoção?</label>
                      </div>
                      <div className="col-12 col-md-6 checkboxes mt-3">
                        <CustomCheckbox onClick={(event) => setFirtAcessHelpers.handleInput(event, "alreadyAdopted")} checked={alreadyAdopted} />
                        <label className="pl-2 text">Você possui pets adotados?</label>
                      </div>
                    </Form.Row>
                    <div className="col-12 text-center">
                      <Button variant="primary" type="submit" className="mt-3">
                        Cadastrar
                      </Button>
                    </div>
                  </Form>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { ClientReducer} = state;
  return {
    ClientReducer
  }
};

export default connect(mapStateToProps)(FirstAccess);