export interface DialogProps {
    open: boolean;
    onClose: Function;
    isEdit: boolean
    defaultValues: Inputs;
}

export interface Inputs {
    [key: string]: any,
    id?: number,
    eventName?: string,
    eventType?: string,
    place?: string,
    time?: string,
    address?: string,
    moneyAmount?: string,
    note?: string,
    date?: string
}
