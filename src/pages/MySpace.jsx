import React, { Component } from 'react'
import { clientActions } from "../actions/clientAction"
import { petActions } from "../actions/petAction"
import { connect } from "react-redux";
import moment from "moment-timezone";
import {
    Row,
    Container,
    Col,
    Form,
    Button,
    Card,
    Table
} from 'react-bootstrap'

// Action
import { GenderActions } from "../actions/helpers/genderActions"
import { TypesHouseActions } from "../actions/helpers/typesHouseActions"

//Alert
import ShowAlert from '../helpers/alertHelper'
import MaterialInput from '../helpers/inputs/materialInput'
import { helpers } from "../helpers/validate/validateInput";
import { setFirtAcessHelpers } from "../helpers/firstAccess/setFirstAccess"
import CustomInputMask from '../components/customInputMask/customInputMask'
import CustomCheckbox from '../components/customCheckBox/customCheckBox'
import { wordIsAllowed } from "../helpers/configuration";
import { history } from "../helpers/history";


class MySpace extends Component {
  constructor(props) {
    super(props)
      
    this.state = {
      showAlertMessage: false,
      editform: false
    }
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(GenderActions.getGender())
    dispatch(TypesHouseActions.getTypesHouse())
  }
  

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(GenderActions.getGender())
    dispatch(TypesHouseActions.getTypesHouse())
    const userStorage = JSON.parse(localStorage.getItem("user"));
    dispatch(clientActions.getFull(userStorage.data.email))
    this.setState({howManyAdoptedList: Array.from({length: 199}, (_, i) => i + 1)}) 
    dispatch(petActions.getPetUserId(userStorage.data.id))

    let toDiv = document.getElementById('fixedBehavior');
    toDiv.scrollIntoView({ behavior: "smooth" });
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
    const { dispatch, ClientReducer } = this.props
    const { createClientReducer } = ClientReducer
    const { client } = createClientReducer
    const { name, email, identificationNumber,dateOfBirth, phone, Address, isOng, alreadyAdopted, howManyAdopted, gender, id } = client
    this.setState({ formUpdateClient: true });
    const fieldsTarget = [name, email, identificationNumber, dateOfBirth, phone.cellPhone, Address.zipcode, Address.street, Address.number, Address.state, Address.type, Address.city, Address.neighbourhood, gender];
    if(Address.type === 2) fieldsTarget.push(Address.complement)
    if(alreadyAdopted) fieldsTarget.push(howManyAdopted)
    const fieldsValid = this.validateRequiredFields(fieldsTarget);

    if (fieldsValid === false) return
    
    let validation = dateOfBirth.split("/");
    let day = validation[0];
    let month = validation[1];
    let year = validation[2];
    validation = year + '-' + month + '-' + day;

    const payload = { name, email, identificationNumber, validation, phone, Address, isOng, alreadyAdopted, howManyAdopted, gender}

    dispatch(clientActions.updateClient(id, payload, this.callbackClientUpdateSuccess))
  }

  callbackClientUpdateSuccess = async (response) => {
    const { dispatch, LoginReducer } = this.props
    const { LogginReducerParams } = LoginReducer
    const { client } = LogginReducerParams
    let resolveResponse = await Promise.resolve(response)
    if(resolveResponse.success) {
      let finalizeRegistration = false
      const payload = { finalizeRegistration }
      dispatch(clientActions.updatePreClient(client.id, payload, this.callbackClientUpdate))
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
      history.push('/')
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
        type: '',
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
        type: '',
        city: '',
        AddressError: resolveResponse.message
      }
      setTimeout(
        () => this.setState({ showAlertMessage: false }), 
        10000
      );
    }
    dispatch(setFirtAcessHelpers.handleInput(Address, "Address"))
  }

  render() {
    const { FullReducer, InfosReducer, PetReducer } = this.props
    const { createFullReducer } = FullReducer
    const { createInfosReducer } = InfosReducer
    const { genders , typesHouses } = createInfosReducer
    const { full } = createFullReducer
    const { createPetReducer } = PetReducer
    const { petsResponse } = createPetReducer
    const { name, email, identificationNumber,dateOfBirth, phone, Address, isOng, alreadyAdopted, howManyAdopted, gender, typeAccess } = full
    const { cellPhone, homePhone } = phone
    const { zipcode, street, number, complement, state, type, city, neighbourhood, AddressError } = Address
    const { showAlertMessage = {}, typeMessage, messageAlert, howManyAdoptedList, formUpdateClient, editform } = this.state
    let countPet = 0
  
    if(howManyAdoptedList && howManyAdoptedList.length > 0 && !howManyAdoptedList.includes('200 ou mais')) howManyAdoptedList.push('200 ou mais')
    return (
      <React.Fragment>
        {showAlertMessage && 
        <ShowAlert ref="child" type={typeMessage} show={showAlertMessage} message={messageAlert}/>}
        <Container className={`first-access ${createFullReducer.isLoading ? `text-center` : ''}`}>
          {(createFullReducer.isLoading && PetReducer.isLoading) ? <i className="fa fa-spinner fa-pulse fa-3x fa-fw text-center" /> :
            <Row className="justify-content-md-center mt-6">
              <Col xs={12}>
                <h4 className="text-uppercase text-center pt-1 pb-4">Seu Perfil</h4>
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
                          disabled={!editform}
                          // errorMsg='Insira o nome copleto'
                          // error={formUpdateClient && (!name || !validName || !nameHasNotAllowedWord)} 
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
                          disabled={!editform}
                          // errorMsg='Insira um email valido'
                          // error={formUpdateClient && (!email || !validEmail || !emailHasNotAllowedWord)} 
                        />
                        {typeAccess === "CLIENT" &&
                          <CustomInputMask
                            containerClass="col-12 col-md-4"
                            inputClass="form-control"
                            mask={"999.999.999-99"}
                            label={"CPF*"}
                            onChange={(event) => setFirtAcessHelpers.handleInput(event, "identificationNumber")}
                            name="identificationNumber"
                            value={identificationNumber}
                            disabled={!editform}
                            // disabled={!client.personalInfoSaved || !isInserting || sendAdditionalDataToGtm || !dontSentToGtm || this.updateGTMData}
                            errorMsg={'Informe um CPF v??lido'}
                            error={formUpdateClient && (!identificationNumber || !helpers.validateCPF(identificationNumber))}
                          />
                        }
                        
                      </Form.Row>
                      <Form.Row>
                        {typeAccess === "ONG" &&
                          <CustomInputMask
                            containerClass="col-12 col-md-6"
                            inputClass="form-control"
                            mask={"99.999.999/9999-99"}
                            label={"CNPJ*"}
                            onChange={(event) => setFirtAcessHelpers.handleInput(event, "identificationNumber")}
                            name="identificationNumber"
                            value={identificationNumber}
                            disabled={!editform}
                            // disabled={!client.personalInfoSaved || !isInserting || sendAdditionalDataToGtm || !dontSentToGtm || this.updateGTMData}
                            errorMsg={'Informe um CNPJ v??lido'}
                            error={formUpdateClient && (!identificationNumber || !helpers.validateCNPJ(identificationNumber))}
                          />
                        }
                        <CustomInputMask
                          containerClass="col-12 col-md-6"
                          inputClass="form-control"
                          mask="99/99/9999"
                          label="Data de nascimento*"
                          name="dateOfBirth"
                          value={dateOfBirth}
                          onChange={(event) => setFirtAcessHelpers.handleInput(event, "dateOfBirth")}
                          disabled={!editform}
                          error={formUpdateClient && (!dateOfBirth || !helpers.dateCompare(dateOfBirth))}
                          errorMsg={!dateOfBirth ? "Informe a data de nascimento" : !helpers.dateCompare(dateOfBirth) ? "Informe uma data v??lida" : "Informe a data de nascimento"}
                        />
                        {typeAccess === "CLIENT" &&
                          <MaterialInput
                            type="select"
                            containerClass="col-12 col-md-6"
                            inputClass="custom-select"
                            label="Sexo*"
                            name="gender"
                            optionValue="id"
                            optionText="name"
                            value={gender}
                            disabled={genders && genders.loading || !editform}
                            onChange={(event) => setFirtAcessHelpers.handleInput(event, "gender", genders.genderList.find(item => item.id === Number(event.target.value)))}
                            list={genders && genders.genderList}
                            error={formUpdateClient && !gender}
                            errorMsg="Informe o sexo"
                          />
                        }
                      </Form.Row>
                      <Form.Row>
                        <CustomInputMask
                          containerClass="col-12 col-md-6"
                          inputClass="form-control"
                          mask="(99) 9999-9999"
                          label="Telefone Casa"
                          name="homePhone"
                          value={homePhone}
                          disabled={!editform}
                          onChange={(event) => setFirtAcessHelpers.handleInput(event, "homePhone")}
                        />
                        <CustomInputMask
                          containerClass="col-12 col-md-6"
                          inputClass="form-control"
                          mask="(99) 99999-9999"
                          label="Telefone Celular*"
                          name="cellPhone"
                          value={cellPhone}
                          disabled={!editform}
                          onChange={(event) => setFirtAcessHelpers.handleInput(event, "cellPhone")}
                          error={formUpdateClient && (!cellPhone || !helpers.validatePhone(helpers.phoneMask(cellPhone), true))}
                          errorMsg={"Informe um telefone celular v??lido"}
                        />
                      </Form.Row>
                      <Form.Row>
                        <CustomInputMask
                          containerClass="col-12 col-md-4"
                          inputClass="form-control"
                          mask="99999-999"
                          label={"CEP*"}
                          onChange={(event) => setFirtAcessHelpers.handleInput(event, "zipcode",'', this.setCallbackaddress)}
                          name="zipcode"
                          disabled={!editform}
                          value={zipcode}
                          errorMsg={'Informe um cep v??lido'}
                          error={ (formUpdateClient && (!zipcode || zipcode.indexOf("_") >= 0)) || AddressError}
                        />
                                
                        <MaterialInput
                          containerClass="col-12 col-md-4"
                          inputClass="form-control"
                          type="text"
                          label="Endere??o*"
                          value={street}
                          name="street"
                          disabled={!editform}
                          onChange={(event) => setFirtAcessHelpers.handleInput(event, "street")}
                          errorMsg={"Informe o endere??o"}
                          error={formUpdateClient && (!street)}
                        />
                        {typeAccess === "CLIENT" &&
                          <MaterialInput
                            type="select"
                            containerClass="col-12 col-md-4"
                            inputClass="custom-select"
                            label="Tipo*"
                            name="type"
                            disabled={typesHouses && typesHouses.loading || !editform}
                            value={type}
                            onChange={(event) => setFirtAcessHelpers.handleInput(event, "type", createInfosReducer.typesHouseList.find(item => item.id === Number(event.target.value)))}
                            list={typesHouses && typesHouses.typesHouseList}
                            optionValue="id"
                            optionText="name"
                            errorMsg={"Informe o tipo"}
                            error={formUpdateClient && !type}
                          />
                        }
                      </Form.Row>
                      <Form.Row>
                        <MaterialInput
                          containerClass="col-12 col-md-4"
                          inputClass="form-control"
                          type="text"
                          label="N??mero*"
                          name="number"
                          value={number}
                          disabled={!editform}
                          onChange={(event) => setFirtAcessHelpers.handleInput(event, "number")}
                          errorMsg={"Informe o n??mero"}
                          error={formUpdateClient && !number}
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
                          onChange={(event) => setFirtAcessHelpers.handleInput(event, "neighbourhood")}
                          errorMsg={"Informe o Bairro"}
                          error={formUpdateClient && (!neighbourhood)}
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
                          onChange={(event) => setFirtAcessHelpers.handleInput(event, "state")}
                          errorMsg={"Informe o estado"}
                          error={formUpdateClient && !state }
                        />
                      </Form.Row>
                      <Form.Row>
                        <MaterialInput
                          type="text"
                          containerClass="col-12 col-md-3"
                          inputClass="form-control"
                          label="Cidade*"
                          name="city"
                          disabled={true}
                          value={city}
                          onChange={(event) => setFirtAcessHelpers.handleInput(event, "city")}
                          errorMsg={"Informe a cidade"}
                          error={formUpdateClient && !city}
                        />
                        <MaterialInput
                          containerClass="col-12 col-md-6"
                          inputClass="form-control"
                          type="text"
                          label={type === 2 ? "Complemento*" : "Complemento"}
                          name="complement"
                          value={complement}
                          disabled={!editform}
                          errorMsg={"Informe o complemento"}
                          error={formUpdateClient && type === 2 && !complement}
                          onChange={(event) => setFirtAcessHelpers.handleInput(event, "complement")}
                          maxlength="25"
                        />
                      </Form.Row>
                      {typeAccess ==="CLIENT" ?
                        <Form.Row>
                          <div className="col-12 col-md-6 checkboxes mt-3 d-flex justify-content-center align-items-center">
                            <CustomCheckbox onClick={() => setFirtAcessHelpers.handleInput(!isOng, "isOng")} disabled={!editform} checked={isOng} />
                            <label className="pl-2 text">Voc?? faz parte de alguma ong de ado????o?</label>
                          </div>
                          <div className="col-12 col-md-6 checkboxes mt-3 d-flex  flex-column">
                            <Form.Row className="justify-content-center align-items-center">
                              <CustomCheckbox onClick={() => setFirtAcessHelpers.handleInput(!alreadyAdopted, "alreadyAdopted")} disabled={!editform} checked={alreadyAdopted} />
                              <label className="pl-2 text">Voc?? possui pets adotados?</label>
                            </Form.Row>
                            <Form.Row className="mt-3">
                              <MaterialInput
                                type="select"
                                containerClass="col-12 col-md-12"
                                inputClass="custom-select"
                                label="Quantos animais tem adotado?*"
                                name="howManyAdopted"
                                value={howManyAdopted}
                                disabled={!editform}
                                onChange={(event) => setFirtAcessHelpers.handleInput(event, "howManyAdopted", howManyAdoptedList.find(item => item === Number(event.target.value)))}
                                list={howManyAdoptedList}
                                errorMsg={"Informe o tipo"}
                                error={formUpdateClient &&  !howManyAdopted}
                              />
                            </Form.Row>
                          </div>
                        </Form.Row>
                      :
                        <Form.Row className="mt-3 justify-content-center">
                          <div className="col-12 col-md-6 checkboxes mt-3 d-flex flex-column">
                            <Form.Row>
                              <MaterialInput
                                type="select"
                                containerClass="col-12 col-md-12"
                                inputClass="custom-select"
                                label="Quantos animais tem para ado????o?*"
                                name="howManyAdopted"
                                value={howManyAdopted}
                                disabled={!editform}
                                onChange={(event) => setFirtAcessHelpers.handleInput(event, "howManyAdopted", howManyAdoptedList.find(item => item === Number(event.target.value)))}
                                list={howManyAdoptedList}
                                errorMsg={"Informe o tipo"}
                                error={formUpdateClient &&  !howManyAdopted}
                              />
                            </Form.Row>
                          </div>
                        </Form.Row>
                      }
                      <div className="col-12 text-center">
                        <Button variant="primary" type="submit" className="mt-3">
                          Editar
                        </Button>
                      </div>
                    </Form>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} className="pt-3 mt-3">
                <Card>
                  <Card.Header>Pets Cadastrados</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Tipo</th>
                            <th>Ra??a</th>
                            <th>Idade</th>
                            <th>Sexo</th>
                          </tr>
                        </thead>
                        <tbody>

                          {petsResponse.data && petsResponse.data.map(pet =>
                            <tr>
                              <td>{countPet=+1}</td>
                              <td>{pet.name}</td>
                              <td>{pet.type==='Dog' ? 'Cachorro' : 'Gato'}</td>
                              <td>{pet.breed}</td>
                              <td>{pet.old}</td>
                              <td>{pet.gender==='Male' ? 'Macho' : 'F??mea'}</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          }
        </Container>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { FullReducer, InfosReducer, LoginReducer, PetReducer } = state;
  return {
    FullReducer,
    InfosReducer,
    LoginReducer,
    PetReducer
  }
};

export default connect(mapStateToProps)(MySpace);