import React, { Component, PropTypes } from 'react';
import request from 'request-promise';
import Dropzone from 'react-dropzone';
import { bindActionCreators } from 'redux';
import * as PreviewActions from 'actions/previewPage/PreviewActions';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.actions = bindActionCreators(PreviewActions, dispatch);
  }
  onDrop(files) {
    console.log('Received files: ', files);
    var formData = new FormData();
    formData.append('file', files);
    console.log('==formData==', formData);
    request({
      url: 'http://localhost:3000/api/csv/upload',
      method: 'POST',
      body: formData,
      json: true
    }).then(function success(data) {
        console.log('---------------');
      }).error(function failure(error) {
        console.log('gdgjkdfgkd');
      });
  }
  render() {
    const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
    return (
      <div>
	    <div className="container">  
	      <Dropzone onDrop={this.onDrop}>
	        <div>Try dropping some files here, or click to select files to upload.</div>
	      </Dropzone>
	    </div>
	  </div>
    );
  }
}

function mapStateToProps(state) {
  const { attributesectionsearch } = state;
  return {
    attributesectionsearch
  };
}

Home.propTypes = {
  increment: PropTypes.func.isRequired,
  incrementIfOdd: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Home);
