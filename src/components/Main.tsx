import React, {useEffect} from 'react'
import styled from 'styled-components'
import {observer} from 'mobx-react-lite'

import 'react-datepicker/dist/react-datepicker.css'
import EventsList from './EventsList'
import Calendar from './Calendar'
import Store from '../store/Store'

const Wrapper = styled.div`
  width:40%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
`

const Main: React.FC = observer(() => {
    useEffect(() => {
        if(localStorage.getItem('events') !== null) {
            Store.getEventsFromStorage(JSON.parse(localStorage.getItem('events') as string), JSON.parse(localStorage.getItem('id') as string))
        }
        Store.filterEvents(new Date().toLocaleDateString())
    }, [])

    return (
        <Wrapper>
            <Calendar/>
            <EventsList/>
        </Wrapper>
    )
})

export default Main
