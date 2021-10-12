import React, {useState} from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'

import Store from '../store/Store'
import AddDialog from './AddDialog'

const DatePickerContainer = styled.div`
  width: 40%;
  height: 100%;
`

const AddButton = styled.button`
  margin-top: 300px;
  width: 80%;
  background: white;
  border-radius: 20px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #333392;
  
  &:hover{
    cursor: pointer;
  }
`

const Calendar: React.FC = () => {
    const [startDate, setStartDate] = useState<Date>(new Date())
    const [open, setOpen] = useState<boolean>(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <DatePickerContainer>
            <DatePicker selected={startDate}
                        onChange={(date: Date) => {
                            setStartDate(date)
                            Store.setDatePicked(date.toLocaleDateString())
                            Store.filterEvents(date.toLocaleDateString())
                        }}
                        shouldCloseOnSelect={false}
            />
            <AddButton onClick={handleOpen}>
                Добавить
            </AddButton>
            <AddDialog open={open}
                       onClose={handleClose}
                       defaultValues={{}}
                       isEdit={false}
            />
        </DatePickerContainer>
    )
}

export default Calendar
