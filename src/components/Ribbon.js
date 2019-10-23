import React from "react";
import styled from "styled-components";

const StyledRibbon = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  .ribbon {
    width: 475px;
    position: absolute;
    text-align: center;
    font-size: 22px;
    background: #51abbf;
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(#51abbf),
      to(#387785)
    );
    background: -webkit-linear-gradient(top, #51abbf, #387785);
    background: -moz-linear-gradient(top, #51abbf, #387785);
    background: -ms-linear-gradient(top, #51abbf, #387785);
    background: -o-linear-gradient(top, #51abbf, #387785);
    background-image: -ms-linear-gradient(top, #51abbf 0%, #387785 100%);
    -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 1px;
    -moz-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 1px;
    box-shadow: rgba(0, 0, 0, 0.3) 0 1px 1px;
    border-radius: 5px;
  }

  .ribbon p {
    font-size: 50px;
    font-family: var(--header-font);
    color: #ffffff;
    /* text-shadow: #1c1e1f 0 1px 0; */
    margin: 0px;
    padding: 22px 10px;
  }

  .ribbon:before,
  .ribbon:after {
    content: "";
    position: absolute;
    display: block;
    bottom: -1em;
    border: 1.5em solid #387785;
    z-index: -1;
  }

  .ribbon:before {
    left: -2em;
    border-right-width: 1.5em;
    border-left-color: transparent;
    -webkit-box-shadow: rgba(0, 0, 0, 0.4) 1px 1px 1px;
    -moz-box-shadow: rgba(0, 0, 0, 0.4) 1px 1px 1px;
    box-shadow: rgba(0, 0, 0, 0.4) 1px 1px 1px;
  }

  .ribbon:after {
    right: -2em;
    border-left-width: 1.5em;
    border-right-color: transparent;
    -webkit-box-shadow: rgba(0, 0, 0, 0.4) -1px 1px 1px;
    -moz-box-shadow: rgba(0, 0, 0, 0.4) -1px 1px 1px;
    box-shadow: rgba(0, 0, 0, 0.4) -1px 1px 1px;
  }

  .ribbon .ribbon-content:before,
  .ribbon .ribbon-content:after {
    border-color: #1f424a transparent transparent transparent;
    position: absolute;
    display: block;
    border-style: solid;
    bottom: -1em;
    content: "";
  }

  .ribbon .ribbon-content:before {
    left: 0;
    border-width: 1em 0 0 1em;
  }

  .ribbon .ribbon-content:after {
    right: 0;
    border-width: 1em 1em 0 0;
  }
`;

const Ribbon = () => {
  return (
    <StyledRibbon>
      <div className="ribbon">
        <div className="ribbon-content">
          <p>
            <b>Vintage Sverige</b>
          </p>
        </div>
      </div>
    </StyledRibbon>
  );
};

export default Ribbon;
