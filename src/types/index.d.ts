export type TimePeriod = {
    startMonth: string!
    startDay: string!
    endMonth: string!
    endDay: string!
    week?: number
}

type UnitSold = {
    peperoni: number!
    branco: number!
    allDressed: number!
}

type SalesTotal = {
    peperoni: string!
    branco: string!
    allDressed: string!
}