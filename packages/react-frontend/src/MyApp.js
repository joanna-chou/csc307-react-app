import React, {useState, useEffect} from 'react';

import Table from "./Table"
import Form from "./Form"


function MyApp() {
    const [characters, setCharacters] = useState([]);
      function removeOneCharacter (index) {
        deleteUser(characters[index].id)
          .then((res) => {
            if (res.status === 204)
             {const updated = characters.filter((character, i) => {
            return i !== index
          });
          setCharacters(updated)}}) 
          .catch((error) => {
            console.log(error);
          })
      }
    function updateList(person) {
        postUser(person)
          .then((res) => {
            return res.status === 201 ? res.json() : undefined}) // return newly created POST object
          .then((json) => {
            if (json) setCharacters([...characters, json])})
          .catch((error) => {
            console.log(error);
          });
      }

useEffect(() => {
  fetchUsers()
	  .then((res) => res.json())
	  .then((json) => setCharacters(json["users_list"]))
	  .catch((error) => { console.log(error);});
}, [] );


function postUser(person) {
  const promise = fetch("http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });
  return promise;
}

function deleteUser(id) {
  const promise = fetch(`http://localhost:8000/users/${id}`, {
    method: "DELETE"
  });
  return promise;
}

// load list based on backend
function fetchUsers() {
  const promise = fetch("http://localhost:8000/users");
  return promise;
}


  return (
    <div className = "container">
      <Table characterData={characters}
                removeCharacter = {removeOneCharacter}/>
    <Form handleSubmit={updateList} />

    </div>
  );

}
export default MyApp;