import React from 'react'
import './CookBookCard.css'

export default function CookBookCard({ cookbook,handleNavigate }) {
  return (
    <div className='cookbookContainer'>
      {cookbook?.map((item) => (
       <div key={item._id} onClick={() => handleNavigate(item._id)} className='cookbookcard'>
          <img src={item.imgURL} alt="" />
          <h1>{item?.name}</h1>
          <h2>{item?.price}$</h2>
          <p>Created by: {item?.userId.username}</p>
        </div> 
      ))}
    </div>
  )
}
