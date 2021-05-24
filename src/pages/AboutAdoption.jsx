import React, { Component } from 'react'
import {
    Image,
    Row,
    Container,
    Col,
    ListGroup,
    Accordion,
    Card
} from 'react-bootstrap'

class AboutAdoption extends Component {
    componentDidMount() {
        let toDiv = document.getElementById('fixedBehavior');
        toDiv.scrollIntoView({ behavior: "smooth" });
    }
    render() {
        return (
            <React.Fragment>
                <Image src="https://image-sos.s3.amazonaws.com/bdb61200fcec73c1f03b4831c5bb86fd-imagem-grande-2.jpg" fluid className="img-header" />
                <Container className="about-adoption">
                    <Row>
                        <Col xs={12}>
                            <h4 className="text-uppercase text-center pt-3 pb-4">Adoçao</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <p data-aos="fade-up" className="text-justify">
                                A <strong>adoção de pet</strong> é um ato de amor. Afinal, acolher um cãozinho abandonado vai trazer amor tanto para a vida dele, que vai ganhar uma família, quanto para a sua, que vai ter o afeto e companhia de um animal eternamente grato.<br/>
                                Segundo dados da Organização Mundial da Saúde (OMS), o número de animais abandonados no Brasil chega a 30 milhões. Entre eles, 20 milhões são cachorros.<br/>
                                Se você tem vontade de se tornar mãe ou pai de um Pet, este texto vai te ajudar a tomar a decisão, a encontrar seu pet e a cuidar dele, desde os primeiros momentos até os desafios do dia a dia. Confira!
                            </p>
                            <h3>10 motivos para adotar um Pet</h3>
                            <ListGroup>
                                <ListGroup.Item>
                                    <Accordion>
                                        <Card data-aos="fade-up">
                                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                            Você salva uma vida
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                <p>
                                                Um Pet que está para adoção em organizações ou abandonado na rua não tem uma vida fácil. Cães precisam do amor e dos cuidados de uma família, com quem possam compartilhar o dia a dia. Tirar um peludo de uma situação assim é, antes de tudo, salvar uma vida.
                                                </p>
                                            </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Accordion>
                                        <Card data-aos="fade-up">
                                            <Accordion.Toggle as={Card.Header} eventKey="1">
                                            Não vai faltar amor
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="1">
                                            <Card.Body>
                                                <p>
                                                Acredite: adotar um Pet muda completamente a vida de alguém. E o amor que eles nos dão é tão grande que fica até difícil retribuir à altura!
                                                </p>
                                            </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Accordion>
                                        <Card data-aos="fade-up">
                                            <Accordion.Toggle as={Card.Header} eventKey="2">
                                            Saúde mais forte
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="2">
                                            <Card.Body>
                                                <p>
                                                Cães disponíveis para adoção geralmente não têm uma raça definida. Existem estudos que mostram que nossos queridos vira-latas têm menos tendência a desenvolver uma série de doenças e, portanto, costumam ser mais saudáveis. Quer algo melhor que isso?
                                                </p>
                                            </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Accordion>
                                        <Card data-aos="fade-up">
                                            <Accordion.Toggle as={Card.Header} eventKey="3">
                                            A melhor companhia
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="3">
                                            <Card.Body>
                                                <p>
                                                Adotar um Pet vai deixá-lo eternamente grato a você. Você vai ter a melhor companhia que poderia querer em todos os momentos!
                                                </p>
                                            </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Accordion>
                                        <Card data-aos="fade-up">
                                            <Accordion.Toggle as={Card.Header} eventKey="4">
                                            Muito aprendizado
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="4">
                                            <Card.Body>
                                                <p>
                                                Nós ensinamos muitas coisas aos pets, mas nada se compara ao que podemos aprender com eles. Especialmente com um peludo que já enfrentou tantas coisas: resiliência é pouco!
                                                </p>
                                            </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Accordion>
                                        <Card data-aos="fade-up">
                                            <Accordion.Toggle as={Card.Header} eventKey="5">
                                            Eles podem vir prontos
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="5">
                                            <Card.Body>
                                                <p>
                                                É claro que você vai precisar ensinar muitas coisas ao seu pet, mas adotar um pet adulto já torna a sua tarefa como mãe ou pai bem mais fácil.
                                                </p>
                                            </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Accordion>
                                        <Card data-aos="fade-up">
                                            <Accordion.Toggle as={Card.Header} eventKey="6">
                                            Flexibilidade
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="6">
                                            <Card.Body>
                                                <p>
                                                As raças de pet são cheias de restrições. Os vira-latas, por outro lado, são flexíveis e se adaptam facilmente a novos ambientes e situações. Em todo caso, é possível, com um pouco mais de dificuldade, encontrar raças de pet para adoção.
                                                </p>
                                            </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Accordion>
                                        <Card data-aos="fade-up">
                                            <Accordion.Toggle as={Card.Header} eventKey="7">
                                            Perfeito para crianças
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="7">
                                            <Card.Body>
                                                <p>
                                                Se você tem filhos, a adoção de pet pode ser ainda mais benéfica. A convivência com esses seres peludos ajuda no desenvolvimento, além de ensinar sobre amor e cuidado.
                                                </p>
                                            </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Accordion>
                                        <Card data-aos="fade-up">
                                            <Accordion.Toggle as={Card.Header} eventKey="8">
                                            Diminui o estresse
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="8">
                                            <Card.Body>
                                                <p>
                                                Você sabia que adotar um cachorro ajuda a diminuir o estresse? Sim! Até nisso eles contribuem.
                                                </p>
                                            </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Accordion>
                                        <Card data-aos="fade-up">
                                            <Accordion.Toggle as={Card.Header} eventKey="9">
                                            Boa forma
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="9">
                                            <Card.Body>
                                                <p>
                                                Depois de levar um cachorro para casa, você vai precisar ter muita energia para dar conta de tanto passeio! Já pensou no benefício que isso traz a sua saúde?
                                                </p>
                                            </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col xs={12} className="mt-3">
                            <p data-aos="fade-up" className="text-justify">
                                Adotar um animal de estimação não é apenas uma questão de vontade. Junto com a decisão de ter um pet em casa surge uma série de responsabilidades. Por isso, instituições de defesa dos animais lutam pela adoção consciente, para que os novos tutores garantam o bem-estar do pet.<br/>
                                No Brasil, não há legislação que determine como as pessoas devam adotar animais de estimação. Contudo, a Lei n° 9.605, de 12 de fevereiro de 1998, estabelece, em seu artigo 32, que práticas de “abuso, maus-tratos, ferir ou mutilar animais silvestres, domésticos ou domesticados, nativos ou exóticos” implicam em detenção de três meses a um ano e multa.<br/>
                                O valor da multa é determinado pelos municípios, que são os responsáveis pela fiscalização.<br/>
                                “Segundo a Constituição brasileira, os animais de estimação são de responsabilidade de toda a sociedade. O Estado pode tutelar animais em condição de abandono. Mas, se qualquer pessoa maltratar um animal, ainda que não seja seu, pode ser responsabilizada”<br/>
                            </p>
                        </Col>

                        
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}

export default AboutAdoption