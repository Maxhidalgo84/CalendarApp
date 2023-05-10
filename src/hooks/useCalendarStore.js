import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onSetActiveEvent } from "../store/calendar/calendarSlice"


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
        //actualizandp
      }else {
        //creando
        dispatch(onAddNewEvent({
          ...calendarEvent, _id: new Date().getTime()
        }))
      }
    }



  return {
    //propiedades
    events,activeEvent,

    //Metodos
    SetActiveEvent,startSavingEvent
  }
}
