import React from 'react'

export const Calendarbox = ({event}) => {

    const {title,user} = event

  return (
    <>
     <strong>{title}</strong>
     <span> - {user.name}</span>

    </>
    
      )
}
