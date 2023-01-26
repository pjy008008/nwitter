import React, { useState } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "fbase";
import { deleteObject, getStorage, ref } from "firebase/storage";
import styles from "./Nweet.module.css";

const Nweet = ({ nweetObj, isOwner }) => {
  const [edit, setEdit] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const storage = getStorage();
  const desertRef = ref(storage, nweetObj.attachmentUrl);
  const NweetTextRef = doc(db, "nweets", `${nweetObj.id}`);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      //delete nweet
      await deleteDoc(NweetTextRef);
      if (nweetObj.attachmentUrl !== "") {
        await deleteObject(desertRef)
          .then(() => {
            // console.log("file deleted successfully");
          })
          .catch((error) => {
            // console.log(error);
          });
      }
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(NweetTextRef, {
      text: newNweet,
    });
    toggleEdit();
  };
  const onChange = (event) => {
    const { value } = event.target;
    setNewNweet(value);
  };
  const toggleEdit = () => setEdit((prev) => !prev);
  return (
    <div>
      {edit ? (
        <>
          <div className={styles.editNweet}>
            <form onSubmit={onSubmit}>
              <input
                className={styles.editText}
                type="text"
                placeholder="Edit your nweet"
                onChange={onChange}
                value={newNweet}
                required
              />
              <br />
              <input
                className={styles.editSubmit}
                value="Update"
                type="submit"
              />
            </form>
            <button className={styles.cancel} onClick={toggleEdit}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <div className={styles.nweets}>
          <h4 className={styles.nweetText}>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <>
              <img
                className={styles.nweetImg}
                alt="post"
                src={nweetObj.attachmentUrl}
                width="300px"
                height="300px"
              />
              <br />
            </>
          )}
          {isOwner && (
            <>
              <button id="edit" className={styles.btn} onClick={toggleEdit}>
                <img
                  className={styles.imgBtn}
                  src={`${process.env.PUBLIC_URL}/img/edit.png`}
                />
              </button>
              <button
                id="delete"
                className={styles.btn}
                onClick={onDeleteClick}
              >
                <img
                  className={styles.imgBtn}
                  src={`${process.env.PUBLIC_URL}/img/delete.png`}
                />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Nweet;
