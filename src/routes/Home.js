import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "fbase";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import styles from "./Home.module.css";

const Home = ({ userObj }) => {
  // console.log(userObj);
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    // onSnapshot run when the file changed
    const q = query(collection(db, "nweets"), orderBy("createdAt", "desc"));
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
      <NweetFactory userObj={userObj} />
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
