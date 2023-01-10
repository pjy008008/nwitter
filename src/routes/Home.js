import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "fbase";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
  // console.log(userObj);
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "nweets"), {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("error adding document : ", e);
    }
    setNweet("");
  };
  const onChange = (event) => {
    const { value } = event.target;
    setNweet((prev) => value);
  };
  // const getNweets = async () => {
  //   const querySnapshot = await getDocs(collection(db, "nweets"));
  //   querySnapshot.forEach((docs) => {
  //     const nweetObject = {
  //       ...docs.data(),
  //       id: docs.id,
  //     };
  //     setNweets((prev) => [nweetObject, ...prev]);
  //   });
  // };
  useEffect(() => {
    // getNweets();
    const q = query(collection(db, "nweets"));
    onSnapshot(q, (snapshot) => {
      const nweetAry = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetAry);
    });
  }, []);
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
        <input value="submit" type="submit" />
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
