import React, { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import {
  ref,
  uploadString,
  getStorage,
  getDownloadURL,
} from "firebase/storage";
import { db } from "fbase";
import Nweet from "components/Nweet";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
  // console.log(userObj);
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
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
    setNweet((prev) => value);
  };
  useEffect(() => {
    // onSnapshot run when the file changed
    const q = query(collection(db, "nweets"));
    onSnapshot(q, (snapshot) => {
      const nweetAry = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetAry);
    });
  }, []);

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
    <div>
      <span>Home</span>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          placeholder="What's on your mind?"
          maxLength={120}
          type="text"
        />
        <input onChange={onFileChange} type="file" accept="image/*" />
        <input value="submit" type="submit" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearPhotoClick}>Clear</button>
          </div>
        )}
      </form>
      <h1>{nweet}</h1>
      {nweets.map((nweet) => (
        <Nweet
          key={nweet.id}
          nweetObj={nweet}
          isOwner={nweet.creatorId === userObj.uid}
        />
      ))}
    </div>
  );
};

export default Home;
