import React, { Component } from 'react'
import { connect } from "react-redux";
import api from '../api/index'


class ImagePet extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            ImagePet: ''
        }
    }

    componentDidMount() {
        this.getImagePet()
    }


    getImagePet = () => {
        const { imgPet } = this.props
        let ImagePet = ''
        api.get(`/image/${imgPet}`)
            .then(response => {
                ImagePet = response
                this.setState({ImagePet: ImagePet.data.image.url})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <React.Fragment>
                <img
                    className="image-pet"
                    src={this.state.ImagePet}
                    alt="Generic placeholder"
                />
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
  
export default connect(mapStateToProps)(ImagePet);