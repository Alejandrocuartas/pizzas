import {PrismaClient} from "@prisma/client"
import { SalesTotal, TimePeriod } from "../types"
const orm = new PrismaClient()

export const totalSold = async(period: TimePeriod): Promise<SalesTotal> => {
    const endDate = new Date(`2022-${period.endMonth}-${period.endDay}`)
    const startDate = new Date(`2022-${period.startMonth}-${period.startDay}`)
    let moreWeeks;
    if(period.week){
        moreWeeks = new Date(endDate.setDate(endDate.getDate() + period.week*7))
    }
    let sum;
    if(period.week){
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
                    lte: endDate,
                    gte: startDate,
                }
            },
            _sum: {
                peperoni: true,
                branco: true,
                alldressed: true
            }
        })
    }
    const prices = await orm.price.findMany()
    console.log(prices)
    if(sum._sum.alldressed && sum._sum.branco && sum._sum.peperoni){
        const salesPeperoni = sum._sum.peperoni*prices[0].price
        const salesBranco = sum._sum.branco*prices[1].price
        const salesAll = sum._sum.alldressed*prices[2].price
        return {
            peperoni: "$"+salesPeperoni,
            branco: "$"+salesBranco,
            allDressed: "$"+salesAll,
        }
    }
    return {
        peperoni: "$0",
        branco: "$0",
        allDressed: "$0",
    }
}