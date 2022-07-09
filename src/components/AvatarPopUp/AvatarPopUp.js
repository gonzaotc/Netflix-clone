import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

import "./AvatarPopUp.scss";
const AvatarPopUp = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [isPopUpDissapearing, setIsPopUpDissapearing] = useState(false);

  const navigate = useNavigate();
  return (
    <div
      className="avatarPopUp"
      onMouseOver={() => {
        setShowPopUp(true);
      }}
      onMouseLeave={() => {
        setIsPopUpDissapearing(true);
        setTimeout(() => {
          setIsPopUpDissapearing(false);
          setShowPopUp(false);
        }, 150);
      }}
      onClick={() => {
        navigate("/profile");
      }}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="netflix avatar icon"
      />
      <FontAwesomeIcon
        icon={faCaretDown}
        className={`icon ${showPopUp && "iconRotateAnimation"}`}
      />
      {showPopUp && (
        <>
          <div className="pathSaver">
            {/* <FontAwesomeIcon icon={faCaretUp} className="icon" /> */}
          </div>
          <div className={`popUp ${isPopUpDissapearing && "popUpDissapear"}`}></div>
        </>
      )}
    </div>
  );
};

export default AvatarPopUp;
