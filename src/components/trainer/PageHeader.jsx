import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import EitanLogoSmall from "../../EitanLogoSmall.PNG";
import * as PropTypes from "prop-types";
import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import Logout from '../../components/Logout'

const Navigation = styled.header`
  width: 100%;
  border-bottom: 10px solid #55215e;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 100px 0;
  height: 140px;
  margin-bottom: 60px;
  background: #FFF;

  .google{
    width: 15%;
    height: 5%;
    display: flex;
    flex-direction: column;
    clear: both;
    text-decoration: none;
    position: absolute;
    left: 7%;
    top: 4%;
    bottom: 2%
  }

  .logo  {
    display: flex;
    flex-direction: column;
    clear: both;
    text-decoration: none;
    position: absolute;
    right: 7%;
    top: 2%;
    p {
      width: 50%;
      display: block;
    }
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
    }
    li {
      margin: 0 15px;
      justify-content: center;
      font-size: 1.3em;
    }
    a {
      font-size: 1em;
      text-decoration: none;
      .active {
        color: tomato;
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
      width: 100%;
      display: block;
      padding-top: 20px;
      margin: 0px;
      margin-left: -5px;
      a {
        padding: 20px 0px;
      }
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
      flex-direction: column;
      justify-content: center;
      flex-wrap: wrap;
      align-items: flex-end;
      overflow: hidden;
      max-height: 0;
      -moz-transition-duration: 0.4s;
      -webkit-transition-duration: 0.4s;
      -o-transition-duration: 0.4s;
      transition-duration: 0.4s;
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

    let training_his = ["מתאמנים",[{trainDate:"13-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"good train", type:"crossfit"},
            {trainDate:"12-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"swim"},
            {trainDate:"11-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"dance"},
            {trainDate:"10-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"crossfit"},
            {trainDate:"9-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"swim"},
            {trainDate:"8-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"dance"},
            {trainDate:"7-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"swim"},
            {trainDate:"6-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"dance"},
            {trainDate:"5-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"swim"},
            {trainDate:"4-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"dance"},
            {trainDate:"3-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"swim"},
            {trainDate:"2-05-21",trainTime:"08:00:00", trainer_or_group_members:"{100000001}",description:"", type:"dance"}]];


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
    <Navigation>

    <nav className="nav">
      <i
        className="fa fa-bars"
        aria-hidden="true"
        onClick={e => this.handleToggle(e)}
      />
      <ul className={`collapsed ${isExpanded ? "is-expanded" : ""}`}>
        <NavLink activeClassName="active" to="/TrainerPage/exercise_history"  >
          <li>היסטוריית אימונים</li>
        </NavLink>

        <NavLink activeClassName="active" to="/TrainerPage/trainees" >
          <li>מתאמנים</li>
        </NavLink>

        <NavLink activeClassName="active" to="/TrainerPage/exercise_schedule">
          <li>לוח אימונים</li>
        </NavLink>
        <li>
        <div className="google">
          <p>
                <img style={{margin: 5, display: "inline-block", float: "right"}} width="40px" src={this.props.authenticationData.imageUrl} alt={this.props.alt}/>
                <Logout/>
                <h6 dir='rtl'>שלום, {this.props.authenticationData.name}</h6>
                </p>

            </div>
        </li>
        <li>
        <div className="logo">
          <Link to="/TrainerPage">
          <Image src={EitanLogoSmall}/>
          </Link>
        </div>
        </li>

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

