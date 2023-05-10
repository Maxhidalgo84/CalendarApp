import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"


export const useCalendarStore = () => {

    const dispatch = useDispatch()

    const {
        events,activeEvent
    } = useSelector(state => state.calendar)

    const SetActiveEvent = (calendarEvent) => {
      dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async(calendarEvent)=> {
      //TODO: Llegar al backend

      //TODO bien
      if (calendarEvent._id){
        dispatch(onUpdateEvent({...calendarEvent}))
        //actualizandp
      }else {
        //creando
        dispatch(onAddNewEvent({
          ...calendarEvent, _id: new Date().getTime()
        }))
      }
    }

    const startDeleteEvent= (calendarEvent)=> {
      dispatch(onDeleteEvent(calendarEvent))

    }



  return {
    //propiedades
    events,activeEvent,

    //Metodos
    SetActiveEvent,startSavingEvent,startDeleteEvent
  }
}
