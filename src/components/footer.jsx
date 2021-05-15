import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Image
} from 'react-bootstrap'

//components
import Links from './Links'

class Footer extends Component {
  render() {
    return (
      <footer>
        <section>
          <Image src="https://image-sos.s3.amazonaws.com/24064fdbba5e86c394c990a5c97dba53-imagem-grande-1.jpg" fluid  />
        </section>
      </footer>
    );
  }
}

const mapStateToProps = state => {
  return {state}
};

export default connect(mapStateToProps)(Footer);