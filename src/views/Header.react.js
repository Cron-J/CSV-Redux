import React, { Component, PropTypes } from 'react';

class Header extends Component {
  render() {
    return (
      <div className="navbar navbar-default navbar-main-menu">
        
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="/#/">
          <img src={'http://www.jcatalog.com/WeceemFiles/de/Image/jclogo.png'} height= "30px" alt="jCatalog"/>
          </a>
        </div>
        <div className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li className="dropdown">
              <a className="dropdown-toggle active pointer" data-toggle="dropdown">Import <b className="caret"></b></a>
              <ul className="dropdown-menu">
                <li><a>Execute Import</a></li>
                <li><a href="" ng-click="moveToMappingEditor()">Mapping Editor</a></li>
              </ul>
            </li>
            <li><a className="pointer" ng-click="moveToEditMapping()">Edit</a></li>
            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown">Validate <b className="caret"></b></a>
              <ul className="dropdown-menu">
                <li><a>Execute Business Rules</a></li>
              </ul>
            </li>
            <li><a>Export</a></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown">
              Martin Hallmann <b className="caret"></b>
              </a>
              <ul className="dropdown-menu">
                <li><a>Account</a></li>
                <li><a>Log Off</a></li>
                <li className="divider"></li>
                <li className="dropdown-header">Language</li>
                <li className="active"><a href="">English</a></li>
                <li><a >Deutsch</a></li>
              </ul>
            </li>
            <li className="dropdown">
              <a className="icon-nav-item dropdown-toggle" data-toggle="dropdown"><span className="glyphicon glyphicon-cog"></span>  <b class="caret"></b></a>
              <ul className="dropdown-menu">
                <li className="dropdown-header">Business Rules</li>
                <li><a>Business Rules Editor</a></li>
                <li className="dropdown-header">Security</li>
                <li><a>Users</a></li>
                <li><a>Roles</a></li>
              </ul>
            </li>
          </ul>
          <form className="navbar-form navbar-right" role="search">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Search" />
            </div>
            <sup><button type="submit" className="btn btn-default"><span className="glyphicon glyphicon-search"></span></button></sup>
          </form>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
};

export default Header;
