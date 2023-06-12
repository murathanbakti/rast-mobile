import React, { useCallback, useMemo, useState } from "react";
import "./assets/addUser.css";
import { ReactComponent as CloseIcon } from "./assets/svg/close-icon.svg";

const AddUser = ({ onClose, exData }) => {
  const [socialMediaLink, setSocialMediaLink] = useState("");
  const [socialMediaName, setSocialMediaName] = useState("");
  const [socialMediaDescription, setSocialMediaDescription] = useState("");

  const handledData = useMemo(() => {
    return {
      socialMediaLink: socialMediaLink,
      socialMediaName: socialMediaName,
      socialMediaDescription: socialMediaDescription,
    };
  }, [socialMediaLink, socialMediaName, socialMediaDescription]);

  const handleSubmit = useCallback(() => {
    if (!Array.isArray(exData)) {
      let doArray = [];
      doArray.push(handledData);
      const newData = JSON.stringify(doArray);
      localStorage.setItem("user", newData);
    } else {
      exData.push(handledData);
      const newData = JSON.stringify(exData);
      localStorage.setItem("user", newData);
    }
  }, [exData, handledData]);

  return (
    <section className="add-user-background">
      <div className="add-user-container">
        <div className="close-icon" onClick={onClose}>
          <CloseIcon />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-item">
            <label htmlFor="link">Sosyal Medya Linki</label>
            <input
              type="text"
              name="link"
              className="form-input"
              id="socialMediaLink"
              required
              value={socialMediaLink}
              onChange={(e) => setSocialMediaLink(e.target.value)}
            />
          </div>
          <div className="form-item">
            <label htmlFor="media-name">Sosyal Medya Adı</label>
            <input
              type="text"
              name="media-name"
              className="form-input"
              id="socialMediaName"
              required
              value={socialMediaName}
              onChange={(e) => setSocialMediaName(e.target.value)}
            />
          </div>
          <div className="form-item">
            <label htmlFor="desc">Açıklama</label>
            <input
              type="text"
              name="desc"
              className="form-input"
              id="socialMediaDescription"
              required
              value={socialMediaDescription}
              onChange={(e) => setSocialMediaDescription(e.target.value)}
            />
          </div>
          <div className="form-buttons">
            <div className="close-section" onClick={onClose}>
              Vazgeç
            </div>
            <button className="save-user-btn" type="sumbit">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddUser;
