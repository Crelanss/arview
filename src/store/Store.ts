import {makeAutoObservable} from 'mobx'

import {Inputs} from '../helpers/Interfaces'

class Store {
    constructor() {
        makeAutoObservable(this)
    }

    currentId: number = 1

    events: Inputs[] = []

    filteredEvents: Inputs[] = []

    datePicked: string = new Date().toLocaleDateString()

    setDatePicked(date: string) {
        this.datePicked = date
    }

    increment() {
        this.currentId++
    }

    filterEvents(date: string) {
        this.filteredEvents = this.events.filter(element => element.date === date)
    }

    setIdAndEvents() {
        localStorage.setItem('events', JSON.stringify(this.events))
        localStorage.setItem('id', JSON.stringify(this.currentId))
    }

    addEvent (passedEvent: Inputs) {
        this.events.push({...passedEvent, id: this.currentId, date: this.datePicked})
        this.setIdAndEvents()
    }

    changeEvent(id: number | undefined, passedEvent: Inputs) {
        this.events.forEach(element => {
            if (element.id === id) {
                this.events = this.events.filter(element => element.id !== id)
                this.events.push({...passedEvent, id: id, date: this.datePicked})
            }
        })
        this.setIdAndEvents()
    }

    deleteEvent(id: number | undefined) {
        this.events.forEach(element => {
            if (element.id === id) {
                this.events = this.events.filter(element => element.id !== id)
            }
        })
        this.filterEvents(this.datePicked)
        this.setIdAndEvents()
    }

    getEventsFromStorage(events: Inputs[], id: number) {
        this.events = events
        this.currentId = id
    }
}

export default new Store()
