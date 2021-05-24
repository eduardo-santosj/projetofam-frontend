import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone'
import { CircularProgressbar, } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import {
    Row,
    Container,
    Col,
    Form,
    Button,
    Card
} from 'react-bootstrap'

// Action
import { petActions } from '../actions/petAction'
import { clientActions } from '../actions/clientAction'

//Alert
import ShowAlert from '../helpers/alertHelper'
import MaterialInput from '../helpers/inputs/materialInput'
import { setPetInfos } from '../helpers/firstAccess/setPetInfos'
import CustomInputMask from '../components/customInputMask/customInputMask'
import CustomCheckbox from '../components/customCheckBox/customCheckBox'

import ImageList from '../components/ImageList'


class ViewPet extends Component {
  constructor(props) {
      super(props)
      
      this.state = {
        showAlertMessage: false,
        uploadedFiles: [],
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params

    const { dispatch } = this.props
    dispatch(petActions.getPet(id))



    dispatch(clientActions.getFullId(this.props.PetReducer.createPetReducer.pets.userCreate))
    
    let toDiv = document.getElementById('fixedBehavior');
    toDiv.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    const { PetReducer } = this.props
    const { createPetReducer } = PetReducer
    const { pets } = createPetReducer
    const { name, old, gender, castration, vaccination, infos_pet, type, breed,
      color, images, ong, user } = pets
    const { showAlertMessage = {}, typeMessage, messageAlert, uploadedFiles } = this.state

    return (
      <React.Fragment>
        {showAlertMessage && 
        <ShowAlert ref="child" type={typeMessage} show={showAlertMessage} message={messageAlert}/>}
        <Container className="first-access">
          <Row className="justify-content-md-center mt-6">
            <Col xs={12}>
              <ImageList imageList={images} />
            </Col>
            <Col xs={12}>
              <Card data-aos="fade-up">
                <Card.Header>Pet</Card.Header>
                <Card.Body>
                  <Card.Text>
                  <Form inline onSubmit={(e) => this.handleIncludePet(e)} className="justify-content-center" >
                    <Form.Row>
                      <MaterialInput
                        type="text"
                        containerClass="col-12 col-md-4"
                        inputClass="form-control"
                        label='Nome'
                        placeholder="Nome"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(event) => setPetInfos.handleInput(event, "name")}
                        optionValue="value"
                        optionText="label"
                        minlength="4"
                        // errorMsg='Insira o nome copleto'
                        // error={formUpdateClient && (!name || !validName || !nameHasNotAllowedWord)} 
                        />
                      <MaterialInput
                        type="select"
                        containerClass="col-12 col-md-4"
                        inputClass="custom-select"
                        label="Tipo"
                        name="type"
                        optionValue="id"
                        optionText="name"
                        value={type}
                        onChange={(event) => setPetInfos.handleInput(event, "type")}
                        list={() => {
                          return (
                            <Fragment>
                              <option value="Dog">Cachorro</option>
                              <option value="Cat">Gato</option>
                            </Fragment>
                          )
                        }}
                        // error={formUpdateClient && !gender}
                        // errorMsg="Informe o sexo"
                      />
                      <MaterialInput
                        type="text"
                        containerClass="col-12 col-md-4"
                        inputClass="form-control"
                        label='Idade'
                        placeholder="Idade do Pet"
                        name="old"
                        id="old"
                        value={old}
                        onChange={(event) => setPetInfos.handleInput(event, "old")}
                        // errorMsg='Insira um email valido'
                        // error={formUpdateClient && (!email || !validEmail || !emailHasNotAllowedWord)} 
                      />
                    </Form.Row>
                    <Form.Row className="mt-3">
                      <MaterialInput
                        type="select"
                        containerClass="col-12 col-md-4"
                        inputClass="custom-select"
                        label="Sexo"
                        name="gender"
                        optionValue="id"
                        optionText="name"
                        value={gender}
                        onChange={(event) => setPetInfos.handleInput(event, "gender")}
                        list={() => {
                          return (
                            <Fragment>
                              <option value="Male">Macho</option>
                              <option value="Female">Fêmea</option>
                            </Fragment>
                          )
                        }}
                        // error={formUpdateClient && !gender}
                        // errorMsg="Informe o sexo"
                      />
                      <MaterialInput
                        type="text"
                        containerClass="col-12 col-md-4"
                        inputClass="form-control"
                        label='Qual a Raça?'
                        placeholder="Raça do Pet"
                        name="breed"
                        id="breed"
                        value={breed}
                        onChange={(event) => setPetInfos.handleInput(event, "breed")}
                        // errorMsg='Insira um email valido'
                        // error={formUpdateClient && (!email || !validEmail || !emailHasNotAllowedWord)} 
                      />
                      <MaterialInput
                        type="text"
                        containerClass="col-12 col-md-4"
                        inputClass="form-control"
                        label='Qual a Cor?'
                        placeholder="Cor do Pet"
                        name="color"
                        id="color"
                        value={color}
                        onChange={(event) => setPetInfos.handleInput(event, "color")}
                        // errorMsg='Insira um email valido'
                        // error={formUpdateClient && (!email || !validEmail || !emailHasNotAllowedWord)} 
                      />
                    </Form.Row>
                    <Form.Row className="mt-3">
                      <div className="col-12 col-md-6 checkboxes mt-3 d-flex justify-content-center align-items-center">
                        <CustomCheckbox onClick={() => setPetInfos.handleInput(!castration, "castration")} checked={castration} />
                        <label className="pl-2 text">O Pet é castrado?</label>
                      </div>
                      <div className="col-12 col-md-6 checkboxes mt-3 d-flex  flex-column">
                        <Form.Row className="justify-content-center align-items-center">
                          <CustomCheckbox onClick={() => setPetInfos.handleInput(!vaccination, "vaccination")} checked={vaccination} />
                          <span className="pl-2 text">
                            O Pet é Vacinado?<br/>
                            <small>Se sim descreva quais vacinas ele já tomou</small>
                          </span>
                        </Form.Row>
                      </div>
                      <div className="col-12 mt-3">
                        <MaterialInput
                          type="textarea"
                          containerClass="col-12"
                          inputClass="form-control"
                          label='Informações extras do Pet'
                          placeholder="Informações do pet"
                          name="infos_pet"
                          id="infos_pet"
                          value={infos_pet}
                          onChange={(event) => setPetInfos.handleInput(event, "infos_pet")}
                          // errorMsg='Insira um email valido'
                          // error={formUpdateClient && (!email || !validEmail || !emailHasNotAllowedWord)} 
                        />
                      </div>
                    </Form.Row>
                    <a 
                      href={`https://wa.me/55${this.props.FullReducer.createFullReducer.full.phone.cellPhone}`} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-success mt-4"
                    >
                      <i class="fab fa-whatsapp"></i> Entre em Contato com a ONG!
                    </a>
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
  const { PetReducer, FullReducer } = state;
  return {
    PetReducer,
    FullReducer
  }
};

export default connect(mapStateToProps)(ViewPet);