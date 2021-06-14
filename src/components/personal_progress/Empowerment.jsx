import styled from "styled-components";


const StyledButton = styled.button`
color: #55215e;
background-color: white;
border: 2px solid #55215e;
padding: 15px 32px; 
text-align: center;
font-size: 20px;
cursor: pointer;
width:248px;
transition-duration: 0.4s;
border-radius: 10px;
margin-top: 40px;
&:hover {
    background-color: #55215e;
    color: #ffc717;
  }
`;

export default StyledButton;