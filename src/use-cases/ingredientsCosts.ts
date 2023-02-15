import {PrismaClient} from "@prisma/client"
import { IngredientUsed, SalesTotal, TimePeriod } from "../types"
const orm = new PrismaClient()

export const totalIngredientCost = async(period: TimePeriod): Promise<IngredientUsed> => {
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
    const costs = (await orm.ingredientCosts.findMany()).map(i => i.cost)
    const costsNumber = costs.map(c => {
        return Number(c.split("$")[1])
    })
    const recipes = await orm.recipe.findMany()
    if(sum._sum.alldressed && sum._sum.branco && sum._sum.peperoni){
        return {
            peperoni: {
                peperoniSlice: `$${recipes[3].peperoni*sum._sum.peperoni*costsNumber[2]}`,
                cheese: `$${recipes[2].peperoni*sum._sum.peperoni*costsNumber[0]}`,
                vedgetable: `$${recipes[4].peperoni*sum._sum.peperoni*costsNumber[4]}`,
                dough: `$${recipes[1].peperoni*sum._sum.peperoni*costsNumber[3]}`,
                sauce: `$${recipes[0].peperoni*sum._sum.peperoni*costsNumber[1]}`,
            },
            branco:  {
                peperoniSlice: `$${recipes[3].branco*sum._sum.branco*costsNumber[2]}`,
                cheese: `$${recipes[2].branco*sum._sum.branco*costsNumber[0]}`,
                vedgetable: `$${recipes[4].branco*sum._sum.branco*costsNumber[4]}`,
                dough: `$${recipes[1].branco*sum._sum.branco*costsNumber[3]}`,
                sauce: `$${recipes[0].branco*sum._sum.branco*costsNumber[1]}`,
            },
            allDressed:  {
                peperoniSlice: `$${recipes[3].alldressed*sum._sum.alldressed*costsNumber[2]}`,
                cheese: `$${recipes[2].alldressed*sum._sum.alldressed*costsNumber[0]}`,
                vedgetable: `$${recipes[4].alldressed*sum._sum.alldressed*costsNumber[4]}`,
                dough: `$${recipes[1].alldressed*sum._sum.alldressed*costsNumber[3]}`,
                sauce: `$${recipes[0].alldressed*sum._sum.alldressed*costsNumber[1]}`,
            },
        }
    }
    return {
        peperoni: {
            peperoniSlice: "",
            cheese: "",
            vedgetable: "",
            dough: "",
            sauce: ""
        },
        branco:  {
            peperoniSlice: "",
            cheese: "",
            vedgetable: "",
            dough: "",
            sauce: ""
        },
        allDressed:  {
            peperoniSlice: "",
            cheese: "",
            vedgetable: "",
            dough: "",
            sauce: ""
        },
    }
}