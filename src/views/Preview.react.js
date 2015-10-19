import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as PreviewActions from 'actions/previewPage/PreviewActions';
import { connect } from 'react-redux';
class Preview extends Component {
  constructor(props) {
    super(props);
    const { attributesectionsearch, dispatch } = this.props;
    this.state = attributesectionsearch;
    this.delimiter = ',';
    this.headers = [];
    this.customHeader = [];
    this.row1 = [];
    this.row2 = [];
    this.includeHeader = true;
    this.noHeader = false;
    this.actions = bindActionCreators(PreviewActions, dispatch);
  }

  componentWillMount() {
    this.actions.previewFile();
  }

  changeColumn(e) {
    if(e.target.checked == false) {
      this.noHeader = true;
      this.includeHeader = false;
      this.setState({'hh':'kkk'});
      for(let c=1; c<=this.row1.length; c++){
        this.customHeader.push('Column'+c);
      }
    }
    else{
      this.customHeader = [];
      this.noHeader = false;
      this.includeHeader = true;
      this.setState({'hh':'kkk'});
    }
  }

  changeDateFormat(list, format) {
    if (list) {
      for (var i = 0; i < list.length; i++) {
        if (isNaN(list[i])) {
          var d = new Date(list[i]);
          if (d != 'Invalid Date') {
            if('dd-MM-yyyy' == this.guessDateFormat.bind(this, {fileName: this.props.fileName, headers: this.props.headers, rowOne: this.props.rowOne, rowTwo: this.props.rowTwo}, ['dd-MM-yyyy', 'MM/dd/yyyy'], ',')){
              list[i] = new Date(list[i]);
            }
            else{
              var date = d.getDate();
              if (date < 10) date = '0' + date;
              var month = d.getMonth() + 1;
              if (month < 10) month = '0' + month;
              var year = d.getFullYear();
              if (format == 'MM/dd/yyyy')
                list[i] = month + '/' + date + '/' + year;
              else
                list[i] = date + '-' + month + '-' + year;
            }
          }
        }
      };
      return list;
    }
  }
  guessDateFormat(text, possibleDateFormat, delimiter) {
    return possibleDateFormat.filter(testFormat);

    function testFormat(dateFormat) {
      var textArray = [];
      //textArray.push(text.headers);
      textArray.push(text.rowOne);
      textArray.push(text.rowTwo);
      return textArray.every(splitLine);

      function splitLine(line) {
        let wordArray = line.split(delimiter);
        return wordArray.some(testDateFormat);
        function testDateFormat(word) {
          if (isNaN(word)) {
            var d = new Date(word);
            if (d != "Invalid Date") {
                var patt = new RegExp("[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}");
                var patt1 = new RegExp("[d|M]{1,2}\/[d|M]{1,2}\/[y]{4}");
                var res1 = patt.test(word) && patt1.test(dateFormat);

                var patt = new RegExp("[0-9]{1,2}\-[0-9]{1,2}\-[0-9]{4}");
                var patt1 = new RegExp("[d|M]{1,2}\-[d|M]{1,2}\-[y]{4}");
                var res2 = patt.test(word) && patt1.test(dateFormat);
                return res1 || res2;
            }
          }
        }
      }
    }
  }
  dateFormat(e){
    console.log(this.props.header);
    this.headers = this.splitter(this.props.attributesectionsearch.headers, this.delimiter);
    let rowOne = this.splitter(this.props.attributesectionsearch.rowOne, this.delimiter);
    let rowTwo = this.splitter(this.props.attributesectionsearch.rowTwo, this.delimiter);
    this.row1 = this.changeDateFormat(rowOne, e.target.value);
    this.row2 = this.changeDateFormat(rowTwo, e.target.value);
    this.setState({'hh':'kkk'});
  }
  numberFormat(e){
    this.headers = this.splitter(this.props.attributesectionsearch.headers, this.delimiter);
    let rowOne = this.splitter(this.props.attributesectionsearch.rowOne, this.delimiter);
    let rowTwo = this.splitter(this.props.attributesectionsearch.rowTwo, this.delimiter);
    this.row1 = this.changeNumberFormat(rowOne, e.target.value);
    this.row2 = this.changeNumberFormat(rowTwo, e.target.value);
    this.setState({'hh':'kkk'});
  }
  delimiterFormat(e){
    this.delimiter = e.target.value;
    this.headers = this.splitter(this.props.attributesectionsearch.headers, this.delimiter);
    this.row1 = this.splitter(this.props.attributesectionsearch.rowOne, this.delimiter);
    this.row2 = this.splitter(this.props.attributesectionsearch.rowTwo, this.delimiter);
    this.setState({'hh':'kkk'});
  }
  splitter(data, splittype) {
    return data.split(splittype);
  }
  changeNumberFormat(list, format) {
    for (var i = 0; i < list.length; i++) {
      if (!isNaN(list[i])) {
        if (format == '#,##') {
          if(list[i].indexOf(',')<0)
            list[i] = list[i] + ',00';
        }
        if (format == '#.##') {
          if(list[i].indexOf('.')<0)
            list[i] = list[i] + '.00';
        }

        if (format == '#,###.##') {
          if (list[i].toString().length > 5) {
            list[i] = (list[i]*100 / 100);
            var str = list[i].toString().split('.');
            if (str[0].length >= 4) {
                str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
            }
            if (str[1] && str[1].length >= 4) {
                str[1] = str[1].replace(/(\d{3})/g, '$1 ');
            }
            list[i] = str.join('.');
            if(list[i].indexOf('.') < 0){
                list[i] = list[i] + '.00'
            }
          }
        }
        if (format == '#.###,##') {
          var str = list[i].toString();
          if (str.length > 5) {
              str = list[i].slice(0, -5) + '.' + list[i].slice(-3) + '.' + list[i].slice(-3); 
              list[i] = str;
            if(list[i].indexOf(',') < 0){
                list[i] = list[i] + ',00'
            }
          }
        }
      }
    }
    return list;
  }
  render() {
    console.log(this.headers);
    console.log(this.row1);
    console.log(this.row2);
    let CHeader = this.customHeader.map(function(head){
        return <th>{head}</th>;
    });
    let header = this.headers.map(function(head){
        return <th>{head}</th>;
    });
    let headerAsData = this.headers.map(function(head){
        return <td>{head}</td>;
    });
    let row1 = this.row1.map(function(i){
        return <td>{i}</td>;
    });
    let row2 = this.row2.map(function(i) {
      return <td>{i}</td>;
    });
    return (
      <div>
        <div>
          <div className='container'>
            <div className='row'>
              <div className="upload-container">
                <legend>File Preview</legend>
              </div>
              <div className="col-lg-6">
                <div className="row">
                  <div className="form-group">
                    <label className="col-sm-4 control-label">First line include header</label>
                    <div className="col-sm-8">
                      <input type="checkbox" onChange={this.changeColumn.bind(this)}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-4 control-label">Date Format </label>
                    <div className="col-sm-8">
                      <select name="datePattern" className="form-control" onChange={this.dateFormat.bind(this)} required>
                        <option value=''>select format</option>
                        <option value='dd-MM-yyyy'>dd-MM-yyyy</option>
                        <option value='MM/dd/yyyy'>MM/dd/yyyy</option>
                      </select>
                    </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-4 control-label">Number Format</label>
                      <div className="col-sm-8">
                        <select name="numberPattern" id="number" className="form-control" onChange={this.numberFormat.bind(this)}  required>
                          <option value="">select format</option>
                          <option value="#,###.##">#,###.##</option>
                          <option value="#.##">#.##</option>
                          <option value="#.###,##">#.###,##</option>
                          <option value="#,##">#,##</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-sm-4 control-label">Delimiter Format</label>
                      <div className="col-sm-8">
                        <select name="decimalSeparator" id="delimiter" className="form-control" onChange={this.delimiterFormat.bind(this)} required>
                          <option value="">select format</option>
                          <option value=",">Comma(,)</option>
                          <option value=";">Semicolon(;)</option>
                          <option value="|">Pipe(|)</option>
                        </select>
                      </div>
                    </div>
                </div>
                <div className="row btn-margin">
                  <button className="btn btn-primary"  ng-click="resetData()">Reset Preview Settings</button>
                </div>
              </div>

              <table className="table table-bordered">
                {
                  this.includeHeader &&
                  <thead ng-show="fileStyle.includeHeader">
                  <tr>
                    {header}
                  </tr>
                </thead>
                }
                {
                  this.noHeader &&
                  <thead ng-show="!fileStyle.includeHeader">
                  <tr>
                    {CHeader}
                  </tr>
                </thead>
                }
                <tbody>
                  {
                    this.noHeader &&
                    <tr>
                      {headerAsData}
                    </tr>
                  }
                  <tr >
                    {row1}
                  </tr>
                  <tr >
                    {row2}
                  </tr>
                </tbody>
              </table>
              <div className="btn-set button-container pull-right">
                <button className="btn btn-primary"  ng-click="firstStep()">Back</button>
                <Link to="/mapping" className="btn btn-wizard">
                  <button className="btn btn-primary"  ng-show="!stopStep" ng-click="thirdStep(fileStyle, pattern)">Next</button>
                </Link>
                <button className="btn btn-primary"  ng-show="stopStep" ng-click="reloadStep()">Upload</button>
              </div>
            </div>
          </div>
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

Preview.propTypes = {
  attributesectionsearch: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Preview);
