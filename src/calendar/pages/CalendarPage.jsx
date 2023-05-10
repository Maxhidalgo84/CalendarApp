import React, { useState } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar } from 'react-big-calendar'
import { NavBar } from '../components/NavBar'
import { addHours } from 'date-fns'
import { localizer, getMessageES } from '../../helpers/calendarlocalizer'
import { Calendarbox } from '../components/Calendarbox'
import { CalendarModal } from '../components/CalendarModal'
import { useUiStore } from '../../hooks/useUiStore'
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { FabAddNew } from '../components/FabAddNew'


// const events = [{
//   title: 'Cumple',
//   notes: 'hay que comprar pastel',
//   start: new Date(),
//   end: addHours(new Date(),2),
//   bgColor:'#fafafa',
//   user:{
//     _id: '123',
//     name:'Maximo'
//   }
// }]

export const CalendarPage = () => {

  const {openDateModal} = useUiStore();
  const {events, SetActiveEvent} = useCalendarStore();

  const  [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');
  const  [selected, setSelected] = useState(false);

  const eventStyleGetter= (event,start,end,isSelected) => {
    //console.log({event,start,end,isSelected});
  }

  const onDoubleClick = (event) => {
    //console.log({doubleClick: event});
    openDateModal()
  }

  const onSelect = (event) => {
    //setSelected(true)
    SetActiveEvent(event)
    

  
   // console.log({click: event});
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView',event)

  }

  return (

    <>
    <NavBar/>


    
    <Calendar
      culture='es'
      localizer={localizer}
      events={events}
      defaultView={lastView}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc(100vh - 80px)' }}
      messages={getMessageES()}
      eventPropGetter={eventStyleGetter}
      components={{
        event: Calendarbox
      }}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelect}
      onView={onViewChanged}
    />
    <CalendarModal />
    <FabAddNew/>
    </>
  )
}
