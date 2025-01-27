import React, { useState } from 'react';
import './ImageList.css';
const ImageList = ({images}) => {
  const [isModalOpen, setIsModalOpen]=useState(false)
  const [selectedImage,setSelectedImage]=useState(null);

  const handleModal=(imageUrl)=>{
    setIsModalOpen(true) 
    setSelectedImage(imageUrl);
  }

  const closeModal=()=>{
    setIsModalOpen(false);
  }
  // console.log("Images received by ImageList:", images); 
  return (
    <>
      <div className='image-list-container'>
      <div className='image-list-section'>
        {images.length > 0 ? (
          images.map((image, index) => (
            <button onClick={()=>handleModal(image.imageUrl)} className='image-btn'><div key={index} className='image-item'>
              <img
                src={image.imageUrl}  // Image URL 
                alt={`image-${index}`}
                width="300"  
                height="auto"  
              />
            </div></button>
          ))
        ) : (
          <p>No images available.</p>
        )}
      </div>
    </div>

    {isModalOpen && 
      <div className="modal-container" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={closeModal}>&times;</span>
        <img src={selectedImage} alt="Selected" className="modal-image" />
      </div>
    </div>}
    </>
  )
}

export default ImageList
