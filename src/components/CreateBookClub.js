import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import S3FileUpload from 'react-s3';
import Button from '@material-ui/core/Button';

const CreateBookClub = () => {
   const currentUserId = useSelector(state => state.auth.user.id);
   const history = useHistory();
   const [picture, setPicture] = useState('');
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');

   const config = {
      bucketName: 'bookclub-photos',
      region: 'us-west-2',
      accessKeyId: process.env.REACT_APP_BOOKCLUB_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_BOOKCLUB_SECRET_ACCESS_KEY,
   };

   const upload = e => {
      S3FileUpload.uploadFile(e.target.files[0], config)
         .then(data => {
            console.log(data.location);
            setPicture(data.location);
         })
         .catch(error => {
            alert(error);
         });
   };

   const handleNameChange = event => {
      setName(event.target.value);
   };

   const handleDescriptionChange = event => {
      setDescription(event.target.value);
   };

   const handleSubmit = event => {
      event.preventDefault();
      fetch(`http://localhost:3000/api/v1/bookclubs`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json',
         },
         body: JSON.stringify({
            name,
            picture,
            description,
            id: currentUserId,
         }),
      })
         .then(response => response.json())
         .then(data => {
            console.log(data);
            history.push('/');
         });
   };

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <label>
               Name
               <input type="text" value={name} onChange={handleNameChange} />
            </label>
            <label>
               Description
               <input
                  type="text"
                  value={description}
                  onChange={handleDescriptionChange}
               />
            </label>
            <img src={picture} alt="bookclub" />
            <input
               hidden
               accept="image/*"
               id="raised-button-file"
               multiple
               type="file"
               onChange={upload}
            />
            <label htmlFor="raised-button-file">
               <Button component="span">Upload</Button>
            </label>
            <input type="submit" />
         </form>
      </div>
   );
};

export default CreateBookClub;