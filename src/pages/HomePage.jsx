import React, { Component } from 'react'
import {
    Image,
    Row,
    Container,
    Col,
    Media
} from 'react-bootstrap'

class HomePage extends Component {
    render() {
        return (
            <React.Fragment>
                <Image src="http://via.placeholder.com/2400x1080" fluid />
                <Container>
                    <Row>
                        <Col xs={12}>
                            <h4 className="text-uppercase text-center pt-3 pb-4">Animais para Adoção</h4>
                        </Col>

                        <Col xs={12} md={6} lg={4}>
                            <Media className="list-pet">
                                <img
                                width={64}
                                height={64}
                                className="mr-3"
                                src="http://via.placeholder.com/64x64"
                                alt="Generic placeholder"
                                />
                                <Media.Body>
                                    <h5 className="text-center pt-2">Nome do Animal</h5>
                                    <p className="text-justify pt-1">
                                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                        ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
                                        tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
                                        Donec lacinia congue felis in faucibus.
                                    </p>
                                </Media.Body>
                            </Media>
                        </Col>
                        <Col xs={12} md={6} lg={4}>
                            <Media className="list-pet">
                                <img
                                width={64}
                                height={64}
                                className="mr-3"
                                src="http://via.placeholder.com/64x64"
                                alt="Generic placeholder"
                                />
                                <Media.Body>
                                    <h5 className="text-center pt-2">Nome do Animal</h5>
                                    <p className="text-justify pt-1">
                                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                        ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
                                        tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
                                        Donec lacinia congue felis in faucibus.
                                    </p>
                                </Media.Body>
                            </Media>
                        </Col>
                        <Col xs={12} md={6} lg={4}>
                            <Media className="list-pet">
                                <img
                                width={64}
                                height={64}
                                className="mr-3"
                                src="http://via.placeholder.com/64x64"
                                alt="Generic placeholder"
                                />
                                <Media.Body>
                                    <h5 className="text-center pt-2">Nome do Animal</h5>
                                    <p className="text-justify pt-1">
                                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                        ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
                                        tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
                                        Donec lacinia congue felis in faucibus.
                                    </p>
                                </Media.Body>
                            </Media>
                        </Col>
                        <Col xs={12} md={6} lg={4}>
                            <Media className="list-pet">
                                <img
                                width={64}
                                height={64}
                                className="mr-3"
                                src="http://via.placeholder.com/64x64"
                                alt="Generic placeholder"
                                />
                                <Media.Body>
                                    <h5 className="text-center pt-2">Nome do Animal</h5>
                                    <p className="text-justify pt-1">
                                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                        ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
                                        tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
                                        Donec lacinia congue felis in faucibus.
                                    </p>
                                </Media.Body>
                            </Media>
                        </Col>
                        <Col xs={12} md={6} lg={4}>
                            <Media className="list-pet">
                                <img
                                width={64}
                                height={64}
                                className="mr-3"
                                src="http://via.placeholder.com/64x64"
                                alt="Generic placeholder"
                                />
                                <Media.Body>
                                    <h5 className="text-center pt-2">Nome do Animal</h5>
                                    <p className="text-justify pt-1">
                                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                        ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
                                        tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
                                        Donec lacinia congue felis in faucibus.
                                    </p>
                                </Media.Body>
                            </Media>
                        </Col>
                        <Col xs={12} md={6} lg={4}>
                            <Media className="list-pet">
                                <img
                                width={64}
                                height={64}
                                className="mr-3"
                                src="http://via.placeholder.com/64x64"
                                alt="Generic placeholder"
                                />
                                <Media.Body>
                                    <h5 className="text-center pt-2">Nome do Animal</h5>
                                    <p className="text-justify pt-1">
                                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                        ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
                                        tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
                                        Donec lacinia congue felis in faucibus.
                                    </p>
                                </Media.Body>
                            </Media>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}

export default HomePage