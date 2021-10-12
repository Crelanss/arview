import React, {useEffect} from 'react'
import styled from 'styled-components'
import Dialog from '@mui/material/Dialog'
import {useForm} from 'react-hook-form'
import {observer} from 'mobx-react-lite'

import {DialogProps, Inputs} from '../helpers/Interfaces'
import Store from '../store/Store'

const DialogContainer = styled.div`
  width:400px;
  height: 400px;

  
  form{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    align-items: center;
  }
`

const InputLabelContainer = styled.div`
  width:100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  
  input{
    &:focus{
      outline: none;
    }
  }
  select{
    height: 25px;
  
    &:focus{
      outline:none;
    }
  }
`

const SaveCancelContainer = styled.div`
  display: flex;
  width:80%;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 20px;
`

const SaveCancelButton = styled.button`
  background: white;
  border-radius: 20px;
  height: 20px;
  border: 1px solid #8a8afc;
  
  &:hover{
    cursor: pointer;
  }
`

const ErrorMessage = styled.span`
  color: red;
  font-size: 10px;
`

const AddDialog: React.FC<DialogProps> = observer((props) => {
    const {onClose, open, defaultValues, isEdit} = props

    useEffect(() => {
        reset(defaultValues)
    }, [defaultValues])

    const {register, handleSubmit, formState: {errors}, watch, reset} = useForm<Inputs>({
        defaultValues: {
            'eventType': defaultValues.eventType,
            'eventName': defaultValues.eventName,
            'address': defaultValues.address,
            'time': defaultValues.time,
            'moneyAmount': defaultValues.moneyAmount,
            'note': defaultValues.note
        }
    })

    const onSubmit = handleSubmit(data => {
        if (isEdit) {
            Store.changeEvent(defaultValues.id, data)
        } else {
            Store.addEvent(data)
            Store.increment()
        }
        Store.filterEvents(Store.datePicked)
        onClose()
    })

    const handleClose = () => {
        Store.filterEvents(Store.datePicked)
        onClose()
        reset()
    }

    return (
        <Dialog onClose={handleClose}
                open={open}
        >
            <DialogContainer>
                <form onSubmit={onSubmit}>
                    <InputLabelContainer>
                        <label>Название события </label>
                        <input {...register('eventName', {required: true, minLength: 4})}/>
                        {errors.eventName && <ErrorMessage>Проверьте введенные данные</ErrorMessage>}
                    </InputLabelContainer>
                    <InputLabelContainer>
                        <label>Тип события</label>
                        <select {...register('eventType')}>
                            <option value='holidays'>Праздничные дни</option>
                            <option value='activity'>Мероприятия</option>
                            <option value='notes'>Пометки/Другое</option>
                        </select>
                    </InputLabelContainer>
                    {watch('eventType') === 'notes' ?
                        <InputLabelContainer>
                            <label>Заметка</label>
                            <input {...register('note', {required: true, minLength: 4})}/>
                            {errors.note && <ErrorMessage>Проверьте введенные данные</ErrorMessage>}
                        </InputLabelContainer> :
                        watch('eventType') === 'activity' ?
                            <>
                                <InputLabelContainer>
                                    <label>Адрес</label>
                                    <input {...register('address', {required: true, minLength: 4})}/>
                                    {errors.address && <ErrorMessage>Проверьте введенные данные</ErrorMessage>}
                                </InputLabelContainer>
                                <InputLabelContainer>
                                    <label>Время</label>
                                    <input {...register('time', {required: true, minLength: 4})}/>
                                    {errors.time && <ErrorMessage>Проверьте введенные данные</ErrorMessage>}
                                </InputLabelContainer>
                            </> :
                            <InputLabelContainer>
                                <label>Сумма денег</label>
                                <input {...register('moneyAmount', {required: true, minLength: 4})}/>
                                {errors.moneyAmount && <ErrorMessage>Проверьте введенные данные</ErrorMessage>}
                            </InputLabelContainer>
                    }
                    <SaveCancelContainer>
                        <SaveCancelButton type='submit'>Сохранить</SaveCancelButton>
                        <SaveCancelButton type='button'>Отмена</SaveCancelButton>
                    </SaveCancelContainer>
                </form>
            </DialogContainer>
        </Dialog>
    )
})

export default AddDialog
