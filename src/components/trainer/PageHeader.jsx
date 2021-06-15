import Image from "react-bootstrap/Image";
import EitanLogoSmall from "../../EitanLogoSmall.PNG";
import * as PropTypes from "prop-types";
import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import NameAndPic from "../NameAndPic"


const Navigation = styled.header`
  width: 100%;
  border-bottom: 8px solid #55215e;
  z-index: 1;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  //padding: 0px 100px 0;
  height: 140px;
  margin-bottom: 30px;
  background: #FFF;
  
  .google{
    // width: 15%;
    // height: 5%;
    // display: flex;
    // flex-direction: column;
    // clear: both;
    // text-decoration: none;
    // position: absolute;
    // left: 7%;
    // top: 4%;
    // bottom: 2%
  }

  .logo  {
    // display: flex;
    // flex-direction: column;
    // clear: both;
    // text-decoration: none;
    // position: absolute;
    // right: 7%;
    // top: 2%;
  }

  a {
    opacity: 4;
    transition: all 0.6s;
    color: #55215e;
    font-size: 1.5em;
  }
  a:hover {
    color: #ffc717;
  }
  .fa-bars {
    display: none;
    color: #55215e;
    font-size: 2rem;
  }
  nav {
    ul {
      display: flex;
      justify-content: center;
      flex-direction: row;
      align-items: center;
    }
    li {
      margin: 0 15px;
      //justify-content: center;
      font-size: 1.3em;
     // flex-grow: 14;
     //width: 100%;
    }
    a {
      font-size: 1em;
      text-decoration: none;

      }
    }
    a.active {
        opacity: 0.5;
    }
  }

  @media only screen and (max-width: 800px) {
    padding: 0px;
    .logo {
      padding-right: 15px;
      padding-top: 0px !important;
    }
  }
  @media only screen and (max-width: 600px) {
    height: auto;
    min-height: 60px;
    display: block;
    position: relative;
    .logo {
      //display: block;
      //position: absolute;
      //top: 10px;
      //left: 10px;
      //cursor: pointer;
      max-width: 55%;
      height: auto;
      float: right;
      padding-right: 0px;
      //a {
      //  padding: 20px 0px;
      //}
    }
    .fa-bars {
      display: inline-block;
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }
    ul.collapsed {
      width: 100%;
      visibility: hidden;
      padding-top: 40px;
      display: flex;
      flex-direction: column-reverse;
      justify-content: center;
      flex-wrap: wrap;
      align-items: flex-end;
      overflow: hidden;
      max-height: 0;
      -moz-transition-duration: 0.4s;
      -webkit-transition-duration: 0.4s;
      -o-transition-duration: 0.4s;
      transition-duration: 0s;
      -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
      -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
      -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
      transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
      
      &.is-expanded {
        visibility: visible;
        overflow: hidden;
        max-height: 500px; /* approximate max height */
        -moz-transition-duration: 0.4s;
        -webkit-transition-duration: 0.4s;
        -o-transition-duration: 0.4s;
        transition-duration: 0.4s;
        -moz-transition-timing-function: ease-in;
        -webkit-transition-timing-function: ease-in;
        -o-transition-timing-function: ease-in;
        transition-timing-function: ease-in;
      }
      li {
        padding: 15px 10px;
        margin: 0px 0px;
        width: 100%;
      }
    }
  }
`;


class PageHeader extends Component {


  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
  }
  handleToggle(e) {
    e.preventDefault();
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }



  render() {
    const { isExpanded } = this.state;
    return (
      <Navigation >

        <nav className="nav" >
          <i
            className="fa fa-bars"
            aria-hidden="true"
            onClick={e => this.handleToggle(e)}
          />
          <ul className={`collapsed ${isExpanded ? "is-expanded" : ""}`}>
            <li className="google">

              <NameAndPic/>

            </li>
            <NavLink activeClassName="active" to="/TrainerPage/exercise_history" >
              <li>היסטוריית אימונים</li>
            </NavLink>

            <NavLink activeClassName="active" to="/TrainerPage/trainees" >
              <li>מתאמנים</li>
            </NavLink>

            <NavLink activeClassName="active" to="/TrainerPage/exercise_schedule">
              <li>לוח אימונים</li>
            </NavLink>



            <NavLink activeClassName="selected" to="/TrainerPage">
              <li>
                <div className="logo">
                  {/* <Link > */}
                  <Image src={EitanLogoSmall} />
                  {/* </Link> */}
                </div>
              </li>
            </NavLink>

          </ul>
        </nav>


      </Navigation>

    );
  }
}



PageHeader.propTypes = {
  authenticationData: PropTypes.any,
  alt: PropTypes.string
};

export default PageHeader;

