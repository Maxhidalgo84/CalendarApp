import React from 'react'
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { addHours } from 'date-fns';


export const FabAddNew = () => {

    const {openDateModal} = useUiStore();
    const {SetActiveEvent} =useCalendarStore();

   const clickNew = ()=> {
    SetActiveEvent({
        
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(),2),
        bgColor:'#fafafa',
        user:{
          _id: '123',
          name:'Maximo'
        }
    })

    openDateModal()
}

  return (
    <button 
    className='btn btn-primary fab'
    onClick={clickNew}
    >
        <i className='fas fa-plus'></i>

    </button>
  )
}
