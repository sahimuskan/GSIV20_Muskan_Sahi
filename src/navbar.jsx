import React, { Component } from "react";
class Navbar extends Component {
  state = {};

  render() {
    return (
        <React.Fragment>

      <div className="row bg-white ">
        <div className="col-lg-6 col-6 mt-1">
          <input
            className="form-control-sm fa  text-muted col-12"
            style={{ backgroundColor: "#DFDFDF" }}
            type="text"
            id="search"
            onChange={(e)=>this.props.search(e)}
            placeholder=" &#xf002; Search"
          />
        </div>
        <div className="col-lg-6 col-6 text-right">
            <i className="fas fa-home text-muted   "></i>
        </div>
      </div>
    
      </React.Fragment>

    );
  }
}

export default Navbar;
