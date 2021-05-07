import React, { Component } from 'react'
import { clientActions } from "../actions/clientAction"
import { loginActions } from "../actions/loginAction"
import { connect } from "react-redux";

import {
    Row,
    Container,
    Col,
    Form,
    Button
} from 'react-bootstrap'

//Alert
import ShowAlert from '../helpers/alertHelper'
import MaterialInput from '../helpers/inputs/materialInput'
import { helpers } from "../helpers/validate/validateInput";
import { wordIsAllowed } from "../helpers/configuration";
import { history } from "../helpers/history";


class LoginPage extends Component {
  constructor(props) {
      super(props)

      this.state = {
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          showAlertMessage: false,
          formCreatedClient: false,
          validEmail: false,
          emailHasNotAllowedWord: false,
          validName: false,
          nameHasNotAllowedWord: false,
          iqualPassword: false,
          validPass: false,
          emailLogin: '',
          validEmailLogin: false,
          passwordLogin: '',
          formSendLogin: false
      }
  }

  handleChangeInput = (event, type) => {
    const valueMapped = event.target.value
    let isAllowedWord, validEmail = ''
    switch (type) {
      case "name":
        event.preventDefault();
        const validName = helpers.nameValidation(valueMapped);
        isAllowedWord = wordIsAllowed(validName);
        this.setState({ [type]: valueMapped, validName: validName, nameHasNotAllowedWord: isAllowedWord })
        break;

      case "email":
        event.preventDefault();
        validEmail = helpers.validateEmail(valueMapped);
        isAllowedWord = wordIsAllowed(valueMapped);
        this.setState({ [type]: valueMapped, validEmail: validEmail, emailHasNotAllowedWord: isAllowedWord })
        break;
      
      case "password":
        event.preventDefault();
        const validPass = helpers.validatePassword(valueMapped);
        this.setState({ [type]: valueMapped, validPass: validPass })
        break;

      case "confirmPassword":
        event.preventDefault();
        const validPassword = this.state.password === valueMapped ? true : false
        this.setState({ [type]: valueMapped, iqualPassword: validPassword})
        break;

      case "emailLogin":
        event.preventDefault();
        validEmail = helpers.validateEmail(valueMapped);
        isAllowedWord = wordIsAllowed(valueMapped);
        this.setState({ [type]: valueMapped, validEmailLogin: validEmail })
        break;
      
      case "passwordLogin":
        event.preventDefault();
        this.setState({ [type]: valueMapped })
        break;
    
      default:
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
    const { dispatch } = this.props
    const { name, email, password, confirmPassword } = this.state
    this.setState({ formCreatedClient: true });
    const fieldsTarget = [name, email, password, confirmPassword];
    const fieldsValid = this.validateRequiredFields(fieldsTarget);

    if(helpers.validatePassword(password) === false) {
      this.setState({validPass: false })
    }

    if (fieldsValid === false || name === false || helpers.validateEmail(email) === false || password !== confirmPassword) return
    let finalizeRegistration = true
    let createDate = helpers.getDate()

    const payload = { name, email, password, finalizeRegistration, createDate}
    dispatch(clientActions.createClient(payload, this.callbackClientSuccess))
  }


  callbackClientSuccess = async (response) => {
    let resolveResponse = await Promise.resolve(response)
    this.setState({name: '', email:'', password:'', confirmPassword:'', formCreatedClient: false})
    let toDiv = document.getElementById('fixedBehavior');
    this.setState({ showAlertMessage: true, typeMessage: resolveResponse.success, messageAlert: resolveResponse.message })
    toDiv.scrollIntoView({ behavior: "smooth" });
    setTimeout(
      () => this.setState({ showAlertMessage: false }), 
      10000
    );
  }

  loginClient = (e) => {
    e.preventDefault();
    const { dispatch } = this.props
    const { emailLogin, passwordLogin } = this.state
    this.setState({ formSendLogin: true });
    const fieldsTarget = [emailLogin, passwordLogin];
    const fieldsValid = this.validateRequiredFields(fieldsTarget);

    if ( fieldsValid === false || helpers.validateEmail(emailLogin) === false ) return

    const payload = { emailLogin, passwordLogin }
    dispatch(loginActions.loginClient(payload, this.callbackLoginClient))
  }
  callbackLoginClient = async (response) => {
    let resolveResponse = await Promise.resolve(response)
    if(resolveResponse.success) {
      if(resolveResponse.data.finalizeRegistration) this.props.history.push('/first-access')
      else this.props.history.push('/')
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
    const { name, email, password, confirmPassword, showAlertMessage, typeMessage, formCreatedClient, validEmail, emailHasNotAllowedWord, validName, nameHasNotAllowedWord, iqualPassword, messageAlert, validPass, emailLogin, validEmailLogin, passwordLogin, formSendLogin } = this.state
    return (
      <React.Fragment>
        {showAlertMessage && 
        <ShowAlert ref="child" type={typeMessage} show={showAlertMessage} message={messageAlert}/>}
        <Container>
          <Row className="justify-content-md-center">
            <Col xs={12}>
              <h4 className="text-uppercase text-center pt-3 pb-4">Login</h4>
            </Col>

            <Col xs={12} md={6}>
              <Form onSubmit={(event) => this.loginClient(event)}>
                <MaterialInput
                  type="text"
                  containerClass="form-group col-12"
                  inputClass="form-control"
                  label='Email'
                  placeholder="Email"
                  name="email"
                  id="email"
                  value={emailLogin}
                  onChange={(event) => this.handleChangeInput(event, "emailLogin")}
                  optionValue="value"
                  optionText="label"
                  errorMsg='Insira um email valido'
                  error={formSendLogin && (!emailLogin || !validEmailLogin )} />

                <MaterialInput
                  type="password"
                  containerClass="form-group col-12"
                  inputClass="form-control"
                  label='Senha'
                  placeholder="Senha"
                  name="password"
                  id="password"
                  value={passwordLogin}
                  onChange={(event) => this.handleChangeInput(event, "passwordLogin")}
                  optionValue="value"
                  optionText="label"
                  errorMsg={(!passwordLogin) ? `Insira a sua senha` : ''}
                  error={formSendLogin && (!passwordLogin) } />

                <Button variant="link">
                  Esqueceu a senha?
                </Button>
                <Button variant="primary" type="submit">
                  Entrar
                </Button>
              </Form>
            </Col>
          </Row>

          <Row className="justify-content-md-center mt-6">
            <Col xs={12}>
              <h4 className="text-uppercase text-center pt-3 pb-2">Não tem Login?</h4>
              <h4 className="text-uppercase text-center pt-1 pb-4">Cadastre-se</h4>
            </Col>

            <Col xs={12} md={6}>
              <Form onSubmit={(e) => this.handleIncludeClient(e)}>
                <MaterialInput
                  type="text"
                  containerClass="form-group col-12"
                  inputClass="form-control"
                  label='Nome'
                  placeholder="Nome Completo"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(event) => this.handleChangeInput(event, "name")}
                  optionValue="value"
                  optionText="label"
                  minlength="4"
                  errorMsg='Insira o nome copleto'
                  error={formCreatedClient && (!name || !validName || !nameHasNotAllowedWord)} />
                <MaterialInput
                  type="text"
                  containerClass="form-group col-12"
                  inputClass="form-control"
                  label='Email'
                  placeholder="Email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(event) => this.handleChangeInput(event, "email")}
                  optionValue="value"
                  optionText="label"
                  errorMsg='Insira um email valido'
                  error={formCreatedClient && (!email || !validEmail || !emailHasNotAllowedWord)} />

                <MaterialInput
                  type="password"
                  containerClass="form-group col-12"
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
                  error={formCreatedClient && (!password || !iqualPassword || !validPass)} />

                <MaterialInput
                  type="password"
                  containerClass="form-group col-12"
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
                  error={formCreatedClient && (!confirmPassword || !iqualPassword)} />
                <Button variant="primary" type="submit">
                  Cadastrar
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { ClientReducer, LoginReducer} = state;
  return {
    ClientReducer,
    LoginReducer
  }
};

export default connect(mapStateToProps)(LoginPage);