import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
    Image,
    Row,
    Container,
    Col,
    Media
} from 'react-bootstrap'

import { petActions } from '../actions/petAction'

import ListPets from '../components/ListPets'

class HomePage extends Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(petActions.getPets())
    
        let toDiv = document.getElementById('fixedBehavior');
        toDiv.scrollIntoView({ behavior: "smooth" });
    }

    checkPet = (pet) => {
        console.log(this.props)
        this.props.history.push(`/view-pet/${pet}`)
    }

    render() {
        const { PetReducer } = this.props
        const { createPetReducer } = PetReducer
        const { petsResponse } = createPetReducer
        return (
            <React.Fragment>
                <Image src="https://image-sos.s3.amazonaws.com/7e0882d4d63e5ef7612802158c805a3b-imagem-grande-3.jpg" fluid className="img-header"/>
                <Container>
                    <Row>
                        <Col xs={12} data-aos="fade-up">
                            <h4 className="text-uppercase text-center pt-3 pb-4">Animais para Adoção</h4>
                        </Col>

                        <ListPets viewPet={this.checkPet}/>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    const { PetReducer } = state;
    return {
      PetReducer
    }
  };
  
export default connect(mapStateToProps)(HomePage);