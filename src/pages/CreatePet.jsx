import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { uniqueId } from 'lodash'
import filesize from 'filesize'
import api from '../api/index'
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
import { TypesHouseActions } from '../actions/helpers/typesHouseActions'

//Alert
import ShowAlert from '../helpers/alertHelper'
import MaterialInput from '../helpers/inputs/materialInput'
import { helpers } from '../helpers/validate/validateInput';
import { setPetInfos } from '../helpers/firstAccess/setPetInfos'
import CustomInputMask from '../components/customInputMask/customInputMask'
import CustomCheckbox from '../components/customCheckBox/customCheckBox'
import { history } from '../helpers/history';


class CreatePet extends Component {
  constructor(props) {
      super(props)
      
      this.state = {
        showAlertMessage: false,
        uploadedFiles: [],

    }
  }

  componentDidMount() {
    let toDiv = document.getElementById('fixedBehavior');
    toDiv.scrollIntoView({ behavior: "smooth" });
  }

  handleUpload = files => {
    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }))

    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
    });

    uploadedFiles.forEach(this.processUpload)
  }

  updateFile = (id, data) => {
    this.setState({ uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
      return id === uploadedFile.id ? { ...uploadedFile, ...data } : uploadedFile
    }) })
  }

  processUpload = (uploadedFile) => {
    const data = new FormData();

    data.append('file', uploadedFile.file, uploadedFile.name)

    api.post('/image', data, {
      onUploadProgress: e => {
        const progress = parseInt(Math.round((e.loaded * 100) / e.total));

        this.updateFile(uploadedFile.id, {
          progress
        })
      }
    })
    .then(response => {
      this.updateFile(uploadedFile.id, {
        uploaded: true,
        id: response.data.id,
        url: response.data.url
      })
    })
    .catch(() => {
      this.updateFile(uploadedFile.id, {
        error: true
      })
    })
  }

  handleDelete = async id => {
    api.delete(`/image/${id}`);

    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id)
    })

  }

  renderMessageDrag = (isDragActive, isDragReject) => {
    if(!isDragActive) {
      return <p className='upload-message'>Arraste arquivos aqui ...</p>
    }

    if(isDragReject) {
      return <p className='upload-message error' type='error'>Arquivo não suportado</p>
    }

    return <p className='upload-message success' type='success'>Solte os arquivos aqui</p>
  }

  componentWillUnmount() {
    this.state.uploadedFiles.forEach( file => URL.revokeObjectURL(file.preview))
  }

  handleIncludePet = async (e) => {
    e.preventDefault();
    const { dispatch, PetReducer, LoginReducer } = this.props
    
    const { LogginReducerParams } = LoginReducer
    const { createPetReducer } = PetReducer

    const { client } = LogginReducerParams
    const { pets } = createPetReducer

    const { id } = client
    const { name, old, gender, castration, vaccination, infos_pet, type, breed,
      color } = pets
    let ong, user = ''
    let payload = {}
    let uploadImage = []

    this.state.uploadedFiles.forEach(uploadedFile => {
      uploadImage.push(uploadedFile.id)
    });
    
    await dispatch(setPetInfos.handleInput(uploadImage, "images"))

    let images = this.props.PetReducer.createPetReducer.pets.images

    
    user = id
    payload = {name, old, gender, castration, vaccination, infos_pet, type, breed, color, images, user }
    
    dispatch(petActions.createPet(payload, this.callbackPetCreatSuccess))
  }

  callbackPetCreatSuccess = async (response) => {
    let resolveResponse = await Promise.resolve(response)
    if(resolveResponse.success) {
      this.props.dispatch(setPetInfos.handleInput('', "reset"))
      this.props.history.push('/my-space')
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

  render() {
    const { PetReducer, LoginReducer } = this.props
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
                      <div className="content-drop">
                        <Dropzone accept='image/*' onDropAccepted={this.handleUpload}>
                          { ({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                            <div 
                              {...getRootProps()}
                              className={`drop-container ${isDragReject ? 'reject' : isDragActive ? 'active' : ''}`}
                              isDragActive={isDragActive}
                              isDragReject={isDragReject}
                            >
                              <input 
                                {...getInputProps}
                                className="input-drop d-none"
                                type="file"
                              />
                              {this.renderMessageDrag(isDragActive, isDragReject)}

                              {!!uploadedFiles.length &&
                                <ul className="list-image list-unstyled">
                                  {uploadedFiles.map(uploadedFile => (
                                    <li key={uploadedFile.id}>
                                      <div className="file-info">
                                        <img src={uploadedFile.preview} width="36px" height="36px"/>
                                        <div className="text-file">
                                          <strong>{uploadedFile.name}</strong>
                                          <span>
                                            {uploadedFile.readableSize}{" "}
                                            { !!uploadedFile.url && (
                                              <button onClick={() => this.handleDelete(uploadedFile.id)}>Excluir</button>
                                            )}
                                          </span>
                                        </div>
                                      </div>

                                      <div>
                                        {!uploadedFile.uploaded && !uploadedFile.error && (
                                          <CircularProgressbar 
                                            styles={{
                                              root: { width: 24 },
                                              path: { stroke: '#7159c1'},
                                            }}
                                            strokeWidth={10}
                                            value={uploadedFile.progress}
                                          />
                                        )}

                                        {uploadedFile.url && (
                                          <a 
                                            href={uploadedFile.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            <i class="fas fa-link"></i>
                                          </a>
                                        )}

                                        { uploadedFile.uploaded && <i class="fas fa-check-circle"></i> }
                                        { uploadedFile.error && <i class="fas fa-exclamation-triangle"></i> }
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              }
                            </div>
                          ) }
                        </Dropzone>
                      </div>
                    <Form.Row>

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
  const { LoginReducer, PetReducer } = state;
  return {
    LoginReducer,
    PetReducer,
  }
};

export default connect(mapStateToProps)(CreatePet);