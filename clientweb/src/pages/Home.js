import React from "react";
import Navbar from "../component/NavBar";
import NoteCard from "../component/NoteCard";
import FlatList from "flatlist-react";

function Home() {
  return (
    <div className="home">
      <Navbar />
      <FlatList
        list={[1, 2, 3]}
        renderItem={() => <NoteCard />}
        renderWhenEmpty={() => <></>}
      />
    </div>
  );
}

export default Home;
