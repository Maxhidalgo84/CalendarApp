import { parse, startOfWeek, format, getDay } from 'date-fns'
import esES from 'date-fns/locale/es'
import { dateFnsLocalizer } from 'react-big-calendar'


const locales = {
    'es': esES,
  }
  
  export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })
  
export const getMessageES = () => {
    return {
    allDay: 'Todo el día',
    previous: '<',
    next: '>',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Evento',
    noEventsInRange: 'No hay eventos en este rango',
    showMore: total => `+ Ver más (${total})`
    }

}
