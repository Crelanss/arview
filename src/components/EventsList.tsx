import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {observer} from 'mobx-react-lite'

import Store from '../store/Store'
import AddDialog from './AddDialog'
import {Inputs} from '../helpers/Interfaces'

const EventListContainer = styled.div`
  width: 60%;
  height: 300px;
  box-sizing: border-box;
  padding: 20px;
  overflow: auto;
`

const DeleteEditContainer = styled.div`
  width: 50%;
  height: 100%;
  display: none;
  
  span {
    &:hover {
      cursor: pointer;
      color: aqua;
    }
  }
`

const EventContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  margin-bottom: 10px;
  box-sizing: border-box;
  padding: 10px;
  
  &:hover ${DeleteEditContainer}{
    display: inline;
  }
`

const TextContainer = styled.div`
  width:50%;
  height: 100%;
  display: flex;
  flex-direction: column;

  label{
    font-size: 24px;
    color: #50b1d4;
    text-decoration: underline;
    margin-bottom: 10px;
  }
`


const passValues = (id: number | undefined) => {
    return Store.events.filter(element => element.id === id)[0]
}

const EventsList: React.FC = observer(() => {
    useEffect(() => {
        Store.filterEvents(new Date().toLocaleDateString())
    }, [])

    const [values, setValues] = useState<Inputs>({eventName: 'ab'})
    const [open, setOpen] = useState<boolean>(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = (id: number | undefined) => {
        setOpen(true)
        setValues(passValues(id))
    }

    return (
        <EventListContainer>
            {Store.filteredEvents.map((element) => (
                <EventContainer key={element.id}>
                    <TextContainer>
                        <label>{element.eventName}</label>
                        {element.eventType === 'holidays' ?
                            <span>{element.moneyAmount}</span> : element.eventType === 'activity' ?
                                <><span>{element.address}</span> <span>{element.time}</span></> :
                                <span>{element.note}</span>}
                    </TextContainer>
                    <DeleteEditContainer>
                        <span onClick={() => {
                            handleOpen(element.id)
                        }}
                        >Редактировать </span>
                        <span onClick = {() => {
                            Store.deleteEvent(element.id)
                        }}>Удалить</span>
                    </DeleteEditContainer>
                </EventContainer>
            ))}
            <AddDialog open={open}
                       onClose={handleClose}
                       defaultValues={values}
                       isEdit={true}
            />
        </EventListContainer>
    )
})

export default EventsList
