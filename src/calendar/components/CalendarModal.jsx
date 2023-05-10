import React, { useEffect, useMemo, useState } from 'react'
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import DatePicker,{registerLocale} from "react-datepicker";
import { addHours, differenceInSeconds } from 'date-fns';
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';

registerLocale('es', es)

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

Modal.setAppElement('#root');

export const CalendarModal = () => {

  const {activeEvent, startSavingEvent}= useCalendarStore()

  const {isDateModalOpen,closeDateModal}= useUiStore()
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addHours(startDate,2));
  const [formSubmited, setFormSubmited] = useState(false)
  //const  [isOpen, setIsOpen] = useState(true)

  const [formValues, setFormValues] = useState({

    title: '',
    notes: '',
    start: '',
    end: ''
  
  
  })

   useEffect(() => {
     if (activeEvent !== null) {
      setFormValues({
        ...activeEvent
      })    
    }   
   
   }, [activeEvent])
   
 
  const titleClass = useMemo(()=>{
    if (!formSubmited) return '';

    return(formValues.title.length>0)
    ?'is-valid'
    :'is-invalid'

  },[formValues.title, formSubmited])

  const onInputChange = ({target}) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
      start: startDate,
      end: endDate

   
      })
  
  }

  // const onDateChange = (event,change) => {
  //   setFormValues({
  //     ...formValues,
  //     [change] : event
  //   })
  // }

    

       
    const closeModal=()=> {
        console.log('cerrando mdal');
        //setIsOpen(false)
        closeDateModal()
      }

    const onSubmit = async(event)=> {
      event.preventDefault();
      setFormSubmited(true)

      const difference = differenceInSeconds(endDate,startDate)
      
      if (isNaN(difference) || difference<= 0) {
        Swal.fire({
          icon:'error',
          title:'Fechas incorrectas',
          text:'Revisar Fechas'})
        return;
      }
      if (formValues.title.length <= 0 )
      return;    

      //TODO:
      await startSavingEvent(formValues);
      closeDateModal();
      setFormSubmited(false)
    }

    


  return (
    <Modal
        className={'modal'}
        overlayClassName={'modal-fondo'}
        closeTimeoutMS={200}
        isOpen={isDateModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
    >
    <h1> Nuevo evento </h1>
<hr />
<form className="container" onSubmit={onSubmit}>

    <div className="form-group mb-2">
        <label>Fecha y hora inicio</label>
        <DatePicker
        selected={startDate}
        className='form-control'
        value={startDate}
        name='starDate'
        //onChange={(event)=>onDateChange(event,'start')}
        onChange={date => setStartDate(date)}
        dateFormat="Pp"
        showTimeSelect
        timeCaption='Hora'
        locale="es"
       
         />
       
    </div>

    <div className="form-group mb-2">
        <label>Fecha y hora fin</label>
        <DatePicker
        minDate={startDate}
        selected={endDate}
        value={endDate}
        name='endDate'
        className='form-control'
        onChange={date => setEndDate(date)}
        //onChange={(event) => onDateChange(event,'end') }
        dateFormat="Pp"
        showTimeSelect
        timeCaption='Hora'
        locale="es"
       
         />
    </div>

    <hr />
    <div className="form-group mb-2">
        <label>Titulo y notas</label>
        <input 
            type="text" 
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            onChange={onInputChange}
            value={formValues.title}
        />
        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
    </div>

    <div className="form-group mb-2">
        <textarea 
            type="text" 
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            onChange={onInputChange}
            value={formValues.notes}
        ></textarea>
        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
    </div>

    <button
        type="submit"
        className="btn btn-outline-primary btn-block"
    >
        <i className="far fa-save"></i>
        <span> Guardar</span>
    </button>

</form>
    </Modal>
  )
}
