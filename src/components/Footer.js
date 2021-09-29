import React from "react";

const Footer = () => {
  return (
    <div className="ui segment footer">
      <div className="legacyText">© 2020 | SrujanaP | Srujana Pengonda</div>
      <div className="links">
        <ul>
          <li className="footerLink">
            <a href="https://github.com/SRUJANA-PENUGONDA13">
              <i className="large github icon"></i>
            </a>
          </li>
          <li className="footerLink">
            <a href="https://www.linkedin.com/in/srujana-penugonda-49b9b9148">
              <i className="large linkedin icon"></i>
            </a>
          </li>
          <li className="footerLink">
            <a href="https://leetcode.com/Srujana_Penugonda/">
              <i className="large code icon"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
