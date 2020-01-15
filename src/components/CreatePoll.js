import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const CreatePoll = () => {
   const bookclub = useSelector(state => state.bookclub.bookclub);
   const [title, setTitle] = useState('');

   const handleChange = event => {
      setTitle(event.target.value);
   };

   const handleSubmit = event => {
      event.preventDefault();
      fetch(`http://localhost:3000/api/v1/polls`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json',
         },
         body: JSON.stringify({
            name: title,
            bookclub_id: bookclub.id,
         }),
      });
   };

   return (
      <div>
         <div>Create Poll for {bookclub.name}</div>
         <form onSubmit={handleSubmit}>
            <label>
               Title
               <input type="text" value={title} onChange={handleChange} />
               <input type="submit" />
            </label>
         </form>
      </div>
   );
};

export default CreatePoll;
