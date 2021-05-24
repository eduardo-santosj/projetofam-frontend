import React, { Component } from 'react'
import {
    Image,
    Row,
    Container,
    Col,
    Form,
    Button
} from 'react-bootstrap'

class Contact extends Component {
    componentDidMount() {
        let toDiv = document.getElementById('fixedBehavior');
        toDiv.scrollIntoView({ behavior: "smooth" });
    }
    render() {
        return (
            <React.Fragment>
                <Image src="https://image-sos.s3.amazonaws.com/10b91a26e9fd400b6c41fbc7586cd522-imagem-grande-4.jpg" fluid className="img-header" />

                <Container>
                    <Row data-aos="fade-up">
                        <Col xs={12}>
                            <h4 className="text-uppercase text-center pt-3 pb-4">Envie uma mensagem para a gente!</h4>
                        </Col>

                        <Col xs={12}>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Nome:</Form.Label>
                                    <Form.Control type="text" placeholder="Nome" />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control type="email" placeholder="Email" />
                                </Form.Group>

                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>Assunto</Form.Label>
                                    <Form.Control as="select">
                                    <option>Informações</option>
                                    <option>Sugestões</option>
                                    <option>Reclamações</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Check me out" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>

                        
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}

export default Contact