import React, { useEffect, useRef, useState } from 'react';
import './ImageInput.css';
import axios from "axios";
import ImageList from './ImageList/ImageList';
const API_URL= "https://image-gallery-ten-psi.vercel.app/"

const ImageInput = () => {
  const fileInputRef = useRef(null);
  const [image,setImage]=useState(null);
  const [images,setImages]=useState([]);
  const [uploadProgress, setUploadProgress]=useState(0);
  const [isUploading, setIsUploading]=useState(false)


  const handleBtnClick = ()=>
    {
    fileInputRef.current.click();
   
  }
  
  const handleUpload = async(event)=>{
    const file = event.target.files[0];
    if (!file) return;
    setImage(file); 
    setUploadProgress(0);
    setIsUploading(true);
  
    const formData=new FormData();
    formData.append("upload_file", file);
    try 
    {
      const response=await axios.post(API_URL, formData, {
        headers:{
          "Content-Type":"multipart/form-data",
        },
        //progress bar code
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted); 
        },
    });
      setIsUploading(false);
      if(response.data.file)
      {
        const imageUrl = `https://image-gallery-ten-psi.vercel.app/images/${response.data.file.filename}`
         setImages((prev)=>  [...prev, {imageUrl}]) 
         console.log("respone from backend", response.data)
         fetchImages(); 
      }
      else {
        console.log("File information is missing in the response");
      }
      
    }
     catch (error) 
    {
      setIsUploading(false);
      console.log("error in uploading file" , error) 
    } 
  }  


  const fetchImages=async()=>{
    try 
    {
        const response=await axios.get(API_URL);
        const imageUrls = response.data.map((fileName) => ({
          imageUrl: `https://image-gallery-ten-psi.vercel.app/images/${fileName}`,
        }));
        setImages(imageUrls)
        
    }
     catch (error) 
    {
        console.log(error)
    }
    
  }

  useEffect(()=>{
    fetchImages();
  }, [])   


 
  return(
    <>
    <div className='image-input-div'>
        <div className='image-header'>
        <h1>Photo Gallery</h1>
        <p>A picture is worth thousand words.</p>
        </div>

        <div className='image-input-section'>
          <button onClick={handleBtnClick}>+</button>
          <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleUpload}
      />
      <p>{image ? image.name : "select an image"}</p>
       </div>


        {isUploading && (
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{ width: `${uploadProgress}%`,transition: 'width 0.5s ease'}}
            ></div>
            <p>{uploadProgress}%</p>
          </div>
        )} 
      
    <div className='line-div'></div>
    </div>
    <ImageList images={images} />

    </>
  )
}

export default ImageInput;

