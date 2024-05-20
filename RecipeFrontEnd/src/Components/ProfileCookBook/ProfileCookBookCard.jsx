import React from 'react'

export default function ProfileCookBookCard({cookbook, handleNavigateCook}) {
  return (
    <div>
        <h1>My Cook Books</h1>
      {cookbook.map((item)=>{
        return (
            <div onClick={() => handleNavigateCook(item._id)} key={item._id}>
                <h1>{item.name}</h1>
                <h1>{item.price}$</h1>
            </div>
        )
      })}
    </div>
  )
}
