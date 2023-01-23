import React from "react";
import {
  ref,
  uploadString,
  getStorage,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "fbase";
import styles from "./NweetFactory.module.css";

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const storage = getStorage();
      const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(storageRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(storageRef);
    }
    try {
      const docRef = await addDoc(collection(db, "nweets"), {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("error adding document : ", e);
    }
    setNweet("");
    setAttachment("");
  };
  const onChange = (event) => {
    const { value } = event.target;
    setNweet(value);
  };
  const onFileChange = (event) => {
    const { files } = event.target;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      // console.log(finishedEvent);
      const { result } = finishedEvent.currentTarget;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearPhotoClick = () => {
    setAttachment("");
  };
  return (
    <form onSubmit={onSubmit}>
      <div className={styles.type}>
        <input
          className={styles.nweetText}
          value={nweet}
          onChange={onChange}
          placeholder="What's on your mind?"
          maxLength={120}
          type="text"
        />
      </div>
      <div>
        <input className={styles.submitBtn} value="➜" type="submit" />
      </div>
      <br />
      <div className="filebox">
        <input
          className={styles.addPhoto}
          onChange={onFileChange}
          type="file"
          accept="image/*"
          id="ex_file"
        />
        <label for="ex_file">add photos +</label>
      </div>
      {attachment && (
        <div>
          <img
            className={styles.preview}
            alt="preview"
            src={attachment}
            width="100px"
            height="100px"
          />
          <br />
          <button className={styles.clearBtn} onClick={onClearPhotoClick}>
            Remove ✕
          </button>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;
