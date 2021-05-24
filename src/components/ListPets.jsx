import React, { Component } from 'react'
import { connect } from "react-redux";
import { history } from "../helpers/history";

import {
    Col,
    Media
} from 'react-bootstrap'

import ImagePet from './ImagePet'

class ListPets extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { PetReducer } = this.props
        const { createPetReducer } = PetReducer
        const { petsResponse } = createPetReducer

        return (
            <React.Fragment>
                {petsResponse.data && petsResponse.data.map((pet, key) => {
                    return (
                        <Col xs={12} md={6} lg={4} data-aos="fade-up" key={key}>
                            <Media className="list-pet" onClick={() => this.props.viewPet(pet._id)}>
                                <ImagePet imgPet={pet.images[0]}/>
                                <Media.Body className="pb-2">
                                    <h5 className="text-center pt-2">{pet.name}</h5>
                                    {pet.type === "Dog" ?
                                        <p className="mb-0 text-left pt-1">
                                            <i class="fas fa-dog"></i> Cachorro
                                        </p>
                                    :
                                        <p className="mb-0 text-left pt-1">
                                            <i class="fas fa-cat"></i> Gato
                                        </p>
                                    }
                                    <p className="mb-0 text-left pt-1">
                                        <i class="fas fa-paw"></i> {pet.gender === 'Male' ? 'Macho' : 'Fêmea'}
                                    </p>
                                    <p className="mb-0 text-left pt-1">
                                        <i class="fas fa-fill-drip"></i> {pet.color}
                                    </p>
                                    <p className="mb-0 text-left pt-1">
                                        <i class="fas fa-calendar-alt"></i> {pet.old}
                                    </p>
                                    
                                    
                                </Media.Body>
                            </Media>
                        </Col>
                    )
                })}
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
  
export default connect(mapStateToProps)(ListPets);