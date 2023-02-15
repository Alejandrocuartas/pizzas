import {PrismaClient} from "@prisma/client"
import { TimePeriod, UnitSold } from "../types"
const orm = new PrismaClient()

export const totalSoldUnits = async(period: TimePeriod): Promise<UnitSold> => {
    const endDate = new Date(`2022-${period.endMonth}-${period.endDay}`)
    const startDate = new Date(`2022-${period.startMonth}-${period.startDay}`)
    let sum;
    if(period.week){
        const moreWeeks = new Date(endDate.setDate(endDate.getDate() + period.week*7))
        sum = await orm.orders.aggregate({
            where: {
                date: {
                    lte: moreWeeks,
                    gte: startDate,
                }
            },
            _sum: {
                peperoni: true,
                branco: true,
                alldressed: true
            }
        })
    }else{
        sum = await orm.orders.aggregate({
            where: {
                date: {
                    lte: new Date(endDate),
                    gte: new Date(startDate),
                }
            },
            _sum: {
                peperoni: true,
                branco: true,
                alldressed: true
            }
        })
    }
    
    if(sum._sum.alldressed && sum._sum.branco && sum._sum.peperoni){
        return {
            peperoni: sum._sum.peperoni,
            branco: sum._sum.branco,
            allDressed: sum._sum.alldressed
        }
    }
    return {
        peperoni: 0,
        branco: 0,
        allDressed: 0
    }
}