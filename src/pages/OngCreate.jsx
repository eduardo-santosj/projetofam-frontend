import React, { Component } from 'react'
import { ongActions } from "../actions/ongAction"
import { connect } from "react-redux";
import {
    Row,
    Container,
    Col,
    Form,
    Button,
    Card
} from 'react-bootstrap'

// Action
import { GenderActions } from "../actions/helpers/genderActions"
import { TypesHouseActions } from "../actions/helpers/typesHouseActions"

//Alert
import ShowAlert from '../helpers/alertHelper'
import MaterialInput from '../helpers/inputs/materialInput'
import { helpers } from "../helpers/validate/validateInput";
import { setOngsHelpers } from "../helpers/firstAccess/setOngInfos"
import CustomInputMask from '../components/customInputMask/customInputMask'
import { wordIsAllowed } from "../helpers/configuration";


class OngCreat extends Component {
  constructor(props) {
      super(props)
      
      this.state = {
        showAlertMessage: false
    }
  }

  async componentWillMount() {
    const { dispatch } = this.props
    await dispatch(GenderActions.getGender())
    await dispatch(TypesHouseActions.getTypesHouse())
  }

  componentDidMount() {
    this.setState({howManyAdoptedList: Array.from({length: 199}, (_, i) => i + 1)})
  }

  handleChangeInput = (event, type) => {
    const { dispatch } = this.props
    const valueMapped = event.target.value
    switch (type) {
      case "password":
        event.preventDefault();
        const validPass = helpers.validatePassword(valueMapped);
        this.setState({ [type]: valueMapped, validPass: validPass }, () => {
          dispatch(setOngsHelpers.handleInput(valueMapped, "password"))
        })
        break;

      case "confirmPassword":
        event.preventDefault();
        const validPassword = this.props.OngReducer.createOngReducer.ongs.password === valueMapped ? true : false
        this.setState({ [type]: valueMapped, iqualPassword: validPassword})
        break;
    }
    
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

  handleIncludeClient = async (e) => {
    e.preventDefault()
    const { dispatch, OngReducer } = this.props
    const { createOngReducer } = OngReducer
    const { ongs } = createOngReducer
    const { name, email, identificationNumber,dateOfBirth, phone, Address, isOng, alreadyAdopted, howManyAdopted, password } = ongs
    this.setState({ formCreatOng: true });
    const fieldsTarget = [name, email, identificationNumber, dateOfBirth, phone.cellPhone, Address.zipcode, Address.street, Address.number, Address.state, Address.city, Address.neighbourhood, howManyAdopted, password ];
    const fieldsValid = this.validateRequiredFields(fieldsTarget);
    const validName = helpers.validateFullName(name)

    if (!fieldsValid || !validName || !this.state.iqualPassword) return
    
    let validation = dateOfBirth.split("/");
    let day = validation[0];
    let month = validation[1];
    let year = validation[2];
    validation = year + '-' + month + '-' + day;

    const payload = { name, email, identificationNumber, validation, phone, Address, isOng, alreadyAdopted, howManyAdopted, password}

    dispatch(ongActions.createOng(payload, this.callbackClientUpdateSuccess))
  }

  callbackClientUpdateSuccess = async (response) => {
    let resolveResponse = await Promise.resolve(response)
    if(resolveResponse.success) {
      this.props.history.push('/login')
    } else {
      let toDiv = document.getElementById('fixedBehavior');
      this.setState({ showAlertMessage: true, typeMessage: resolveResponse.success, messageAlert: resolveResponse.message })
      toDiv.scrollIntoView({ behavior: "smooth" });
      setTimeout(
        () => this.setState({ showAlertMessage: false }), 
        10000
      );
    }
  }

  callbackClientUpdate = async (response) => {
    let resolveResponse = await Promise.resolve(response)
    if(resolveResponse.success) {
      this.props.history.push('/')
    } else {
      let toDiv = document.getElementById('fixedBehavior');
      this.setState({ showAlertMessage: true, typeMessage: resolveResponse.success, messageAlert: resolveResponse.message })
      toDiv.scrollIntoView({ behavior: "smooth" });
      setTimeout(
        () => this.setState({ showAlertMessage: false }), 
        10000
      );
    }
  }

  setCallbackaddress = async (res) => {
    const { dispatch } = this.props
    let resolveResponse = await Promise.resolve(res)
    let Address = []
    if(resolveResponse.success) {
      Address = {
        zipcode: res.address.cep,
        street: res.address.logradouro,
        number: '',
        complement: '',
        neighbourhood: res.address.bairro,
        state: res.address.uf,
        city: res.address.localidade,
      }
    } else {
      let toDiv = document.getElementById('fixedBehavior');
      this.setState({ showAlertMessage: true, typeMessage: resolveResponse.success, messageAlert: resolveResponse.message })
      toDiv.scrollIntoView({ behavior: "smooth" });
      Address = {
        zipcode: this.props.ClientReducer.createClientReducer.client.Address.zipcode,
        street: '',
        number: '',
        complement: '',
        neighbourhood: '',
        state: '',
        city: '',
        AddressError: resolveResponse.message
      }
      setTimeout(
        () => this.setState({ showAlertMessage: false }), 
        10000
      );
    }
    dispatch(setOngsHelpers.handleInput(Address, "Address"))
  }

  render() {
    const { OngReducer, InfosReducer } = this.props
    const { createOngReducer } = OngReducer
    const { createInfosReducer = {} } = InfosReducer
    const { ongs } = createOngReducer
    const { name, email, identificationNumber,dateOfBirth, phone, Address, howManyAdopted, password } = ongs
    const { cellPhone, homePhone } = phone
    const { zipcode, street, number, complement, state, city, neighbourhood, AddressError } = Address
    const { showAlertMessage = {}, typeMessage, messageAlert, howManyAdoptedList, formCreatOng, confirmPassword, validPass, iqualPassword } = this.state
  
    if(howManyAdoptedList && howManyAdoptedList.length > 0 && !howManyAdoptedList.includes('200 ou mais')) howManyAdoptedList.push('200 ou mais')
    return (
      <React.Fragment>
        {showAlertMessage && 
        <ShowAlert ref="child" type={typeMessage} show={showAlertMessage} message={messageAlert}/>}
        <Container className="first-access">
          <Row className="justify-content-md-center mt-6">
            <Col xs={12}>
              <h4 className="text-uppercase text-center pt-1 pb-4">Faça seu cadastro como ONG</h4>
            </Col>

            <Col xs={12}>
              <Card>
                <Card.Header>ONG</Card.Header>
                <Card.Body>
                  <Card.Text>
                  <Form inline onSubmit={(e) => this.handleIncludeClient(e)} className="justify-content-center" >
                    <Form.Row>
                      <MaterialInput
                        type="text"
                        containerClass="col-12 col-md-6"
                        inputClass="form-control"
                        label='Nome'
                        placeholder="Nome Completo"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(event) => setOngsHelpers.handleInput(event, "name")}
                        optionValue="value"
                        optionText="label"
                        minlength="4"
                        errorMsg='Insira o nome copleto'
                        error={formCreatOng && (!name || !helpers.validateFullName(name) || !wordIsAllowed(name))} 
                        />
                      <MaterialInput
                        type="text"
                        containerClass="col-12 col-md-6"
                        inputClass="form-control"
                        label='Email'
                        placeholder="Email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(event) => setOngsHelpers.handleInput(event, "email")}
                        errorMsg='Insira um email valido'
                        error={formCreatOng && (!email || !helpers.validateEmail(email) || !wordIsAllowed(email))} 
                      />
                    </Form.Row>
                    <Form.Row className="mt-3">
                      <CustomInputMask
                        containerClass="col-12 col-md-6"
                        inputClass="form-control"
                        mask={"99.999.999/9999-99"}
                        label={"CNPJ*"}
                        onChange={(event) => setOngsHelpers.handleInput(event, "identificationNumber")}
                        name="identificationNumber"
                        value={identificationNumber}
                        // disabled={!client.personalInfoSaved || !isInserting || sendAdditionalDataToGtm || !dontSentToGtm || this.updateGTMData}
                        errorMsg={'Informe um CNPJ válido'}
                        error={formCreatOng && (!identificationNumber || !helpers.validateCNPJ(identificationNumber))}
                      />
                      <CustomInputMask
                        containerClass="col-12 col-md-6"
                        inputClass="form-control"
                        mask="99/99/9999"
                        label="Data de Criação*"
                        name="dateOfBirth"
                        value={dateOfBirth}
                        onChange={(event) => setOngsHelpers.handleInput(event, "dateOfBirth")}
                        error={formCreatOng && (!dateOfBirth || !helpers.dateCompare(dateOfBirth))}
                        errorMsg={!dateOfBirth ? "Informe a data de Criação" : !helpers.dateCompare(dateOfBirth) ? "Informe uma data válida" : "Informe a data de Criação"}
                      />
                    </Form.Row>
                    <Form.Row className="mt-3">
                      <CustomInputMask
                        containerClass="col-12 col-md-6"
                        inputClass="form-control"
                        mask="(99) 9999-9999"
                        label="Telefone Escritório"
                        name="homePhone"
                        value={homePhone}
                        onChange={(event) => setOngsHelpers.handleInput(event, "homePhone")}
                      />
                      <CustomInputMask
                        containerClass="col-12 col-md-6"
                        inputClass="form-control"
                        mask="(99) 99999-9999"
                        label="Telefone Celular* (WhatsApp)"
                        name="cellPhone"
                        value={cellPhone}
                        onChange={(event) => setOngsHelpers.handleInput(event, "cellPhone")}
                        error={formCreatOng && (!cellPhone || !helpers.validatePhone(helpers.phoneMask(cellPhone), true))}
                        errorMsg={"Informe um telefone celular válido"}
                      />
                    </Form.Row>
                    <Form.Row className="mt-3">
                      <CustomInputMask
                        containerClass="col-12 col-md-4"
                        inputClass="form-control"
                        mask="99999-999"
                        label={"CEP*"}
                        onChange={(event) => setOngsHelpers.handleInput(event, "zipcode",'', this.setCallbackaddress)}
                        name="zipcode"
                        value={zipcode}
                        errorMsg={'Informe um cep válido'}
                        error={ (formCreatOng && (!zipcode || zipcode.indexOf("_") >= 0)) || AddressError}
                      />
                              
                      <MaterialInput
                        containerClass="col-12 col-md-8"
                        inputClass="form-control"
                        type="text"
                        label="Endereço*"
                        disabled={true}
                        name="street"
                        value={street}
                        onChange={(event) => setOngsHelpers.handleInput(event, "street")}
                        errorMsg={"Informe o endereço"}
                        error={formCreatOng && (!street)}
                      />
                    </Form.Row>
                    <Form.Row className="mt-3">
                      <MaterialInput
                        containerClass="col-12 col-md-4"
                        inputClass="form-control"
                        type="text"
                        label="Número*"
                        name="number"
                        value={number}
                        onChange={(event) => setOngsHelpers.handleInput(event, "number")}
                        errorMsg={"Informe o número"}
                        error={formCreatOng && !number}
                        maxlength="10"
                      />
                      <MaterialInput
                        containerClass="col-12 col-md-4"
                        inputClass="form-control"
                        type="text"
                        disabled={true}
                        label="Bairro*"
                        name="neighbourhood"
                        value={neighbourhood}
                        onChange={(event) => setOngsHelpers.handleInput(event, "neighbourhood")}
                        errorMsg={"Informe o Bairro"}
                        error={formCreatOng && (!neighbourhood)}
                        // maxlength="60"
                      />
                      <MaterialInput
                        disabled={true}
                        type="text"
                        containerClass="col-12 col-md-4"
                        inputClass="form-control"
                        label="Estado*"
                        name="state"
                        value={state}
                        onChange={(event) => setOngsHelpers.handleInput(event, "state")}
                        errorMsg={"Informe o estado"}
                        error={formCreatOng && !state }
                      />
                    </Form.Row>
                    <Form.Row className="mt-3">
                      <MaterialInput
                        type="text"
                        containerClass="col-12 col-md-6"
                        inputClass="form-control"
                        label="Cidade*"
                        name="city"
                        disabled={true}
                        value={city}
                        onChange={(event) => setOngsHelpers.handleInput(event, "city")}
                        errorMsg={"Informe a cidade"}
                        error={formCreatOng && !city}
                      />
                      <MaterialInput
                        containerClass="col-12 col-md-6"
                        inputClass="form-control"
                        type="text"
                        label="Complemento"
                        name="complement"
                        value={complement}
                        onChange={(event) => setOngsHelpers.handleInput(event, "complement")}
                        maxlength="25"
                      />
                    </Form.Row>
                    <Form.Row className="mt-3">
                      <MaterialInput
                        type="password"
                        containerClass="form-group col-12 col-md-6"
                        inputClass="form-control"
                        label='Senha'
                        placeholder="Senha"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(event) => this.handleChangeInput(event, "password")}
                        optionValue="value"
                        optionText="label"
                        errorMsg={(!iqualPassword && confirmPassword) ? `As senhas não conferem` : !validPass ? 'A senha deve conter ao menos: 1 caracter especial, 1 letra maiuscula, 1 minuscula e 1 numero' : `Insira a sua senha`}
                        error={formCreatOng && (!password || !iqualPassword || !validPass)}
                      />

                      <MaterialInput
                        type="password"
                        containerClass="form-group col-12 col-md-6"
                        inputClass="form-control"
                        label='Confirmar Senha'
                        placeholder="Confirmar Senha"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(event) => this.handleChangeInput(event, "confirmPassword")}
                        optionValue="value"
                        optionText="label"
                        errorMsg={(!iqualPassword && confirmPassword) ? `As senhas não conferem` : `Insira a sua confirmação de senha`}
                        error={formCreatOng && (!confirmPassword || !iqualPassword)}
                      />
                    </Form.Row>
                    <Form.Row className="mt-3 justify-content-center">
                      <div className="col-12 col-md-6 checkboxes mt-3 d-flex flex-column">
                        <Form.Row>
                          <MaterialInput
                            type="select"
                            containerClass="col-12 col-md-12"
                            inputClass="custom-select"
                            label="Quantos animais tem para adoção?*"
                            name="howManyAdopted"
                            value={howManyAdopted}
                            onChange={(event) => setOngsHelpers.handleInput(event, "howManyAdopted", howManyAdoptedList.find(item => item === Number(event.target.value)))}
                            list={howManyAdoptedList}
                            errorMsg={"Informe o tipo"}
                            error={formCreatOng &&  !howManyAdopted}
                          />
                        </Form.Row>
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
  const { OngReducer, InfosReducer } = state;
  return {
    InfosReducer,
    OngReducer
  }
};

export default connect(mapStateToProps)(OngCreat);