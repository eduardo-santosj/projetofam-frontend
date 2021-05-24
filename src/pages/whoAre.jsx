import React, { Component } from 'react'
import {
    Image,
    Row,
    Container,
    Col
} from 'react-bootstrap'

class WhoAre extends Component {
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
                            <h4 className="text-uppercase text-center pt-3 pb-4">Sobre a S.O.S. Pet</h4>
                        </Col>

                        <Col xs={12}>
                          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis vero fuga voluptatem cum repellat ut labore tenetur pariatur dolorem, praesentium quam enim hic natus! Nihil, expedita. Quod quis accusantium amet!
                          Repellendus, quisquam! Et ab, fugiat, sunt asperiores cumque doloribus quibusdam exercitationem odio numquam recusandae rerum. Omnis labore aspernatur magni, itaque esse corporis id minima illum, tenetur tempore laboriosam earum. Odio!
                          Perspiciatis ipsam fugiat quis facere! Tenetur dignissimos expedita veritatis, ducimus sapiente excepturi aspernatur, commodi saepe dicta quibusdam numquam voluptatibus assumenda possimus corporis, doloribus ad! Velit, fugit neque! Numquam, recusandae iure?
                          Consectetur ad temporibus expedita, nam doloribus, perspiciatis aut repellendus dignissimos, illum nostrum totam ut deleniti modi dolor omnis quas quis sunt sequi? Cupiditate dolorem odio quaerat eveniet voluptate, optio fuga?
                          </p>
                        </Col>

                        
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}

export default WhoAre