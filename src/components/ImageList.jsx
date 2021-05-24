import { map } from 'lodash';
import React, { Component } from 'react'
import { connect } from "react-redux";
import api from '../api/index'

import { GridList, GridListTile, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
  }));

class ImageList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            ImagePet: []
        }
    }
    

    componentDidMount() {
        this.getImagePet()
    }


    getImagePet = () => {
        const { imageList } = this.props
        let ImagePet = this.state.ImagePet
        
        imageList.map(image => {
            api.get(`/image/${image}`)
                .then(response => {
                    ImagePet.push(response.data.image.url)
                    console.log(ImagePet)
                    this.setState({ImagePet: ImagePet})
                })
                .catch((error) => {
                    console.log(error)
                })
        })
    }

    render() {
        const { ImagePet } = this.state
        return (
            <React.Fragment>
                {this.state.ImagePet.length>0 &&
                    <GridList cellHeight={160} className={useStyles.gridList} cols={3}>
                        {this.state.ImagePet.length>0 && this.state.ImagePet.map((tile, key) => (
                            <GridListTile key={key} cols={tile.cols || 1}>
                                <img src={tile} alt='Pet' />
                            </GridListTile>
                        ))}
                    </GridList>
                }
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
  
export default connect(mapStateToProps)(ImageList);