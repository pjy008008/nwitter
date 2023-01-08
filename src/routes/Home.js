import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { db } from "fbase";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "nweets"), {
        nweet: nweet,
        createdAt: Date.now(),
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
  const getNweets = async () => {
    const querySnapshot = await getDocs(collection(db, "nweets"));
    querySnapshot.forEach((docs) => {
      const nweetObject = {
        ...docs.data(),
        id: docs.id,
      };
      setNweets((prev) => [nweetObject, ...prev]);
    });
  };
  useEffect(() => {
    getNweets();
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
        <div key={nweet.id}>
          <h4>{nweet.nweet}</h4>
          {/* <h4>{nweet.createdAt}</h4> */}
        </div>
      ))}
    </div>
  );
};

export default Home;
