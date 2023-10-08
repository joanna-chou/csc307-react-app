import React, {useState} from 'react';

function Form(props) {
    function handleChange(event) {
        const { name, value} = event.target;
        if (name === "job")
          setPerson(
             {name: person['name'], job: value, id: person['id']}
          );
        else     
           setPerson(
             {name: value, job: person['job'], id: person['id']}   
           );
      }
    function submitForm() {
        props.handleSubmit(person);
        setPerson({name: '', job: '', id: ''});
    }
      
  const [person, setPerson] = useState(
     {
        name: "",
        job: "",
        id: ""
     }
  );
  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={person.name}
        onChange={handleChange} />
      <label htmlFor="job">Job</label>
      <input
        type="text"
        name="job"
        id="job"
        value={person.job}
        onChange={handleChange} />
    <input type="button" value="Submit" onClick={submitForm} />

    </form>
);
}
export default Form;