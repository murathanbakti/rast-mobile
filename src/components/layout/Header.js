import React from "react";
import "./../assets/header.css";
import { ReactComponent as YoutubeIcon } from "./../assets/svg/youtube-icon.svg";
import { ReactComponent as InstagramIcon } from "./../assets/svg/instagram-icon.svg";
import { ReactComponent as BeIcon } from "./../assets/svg/be-icon.svg";
import { ReactComponent as LinkedinIcon } from "./../assets/svg/linkedin-icon.svg";

const Header = () => {
  return (
    <header>
      <div className="navbar">
        <ul className="navbar-list">
          <li className="navbar-logo">
            <a href="#">
              <img src={require("./../assets/logo.png")} alt="hata" />
            </a>
          </li>
          <li className="desktop">
            <a href="#">Hakkımızda</a>
          </li>
          <li className="desktop">
            <a href="#">Juri- Yarışma Yazılımı</a>
          </li>
          <li className="desktop">
            <a href="#">Word Ninja</a>
          </li>
          <li className="desktop">
            <a href="#">Word Pyramids</a>
          </li>
          <li>
            <div className="social-buttons">
              <a href="#">
                <YoutubeIcon />
              </a>
              <a href="#">
                <InstagramIcon />
              </a>
              <a href="#">
                <BeIcon />
              </a>
              <a href="#">
                <LinkedinIcon />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
