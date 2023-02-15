import {PrismaClient} from "@prisma/client"
import { IngredientUsed, SalesTotal, TimePeriod } from "../types"
const orm = new PrismaClient()

export const totalIngredientUsed = async(period: TimePeriod): Promise<IngredientUsed> => {
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
    const recipes = await orm.recipe.findMany()
    console.log(recipes)
    if(sum._sum.alldressed && sum._sum.branco && sum._sum.peperoni){
        return {
            peperoni: {
                peperoniSlice: `${recipes[3].peperoni*sum._sum.peperoni} ${recipes[3].name} ${recipes[3].unit}`,
                cheese: `${recipes[2].peperoni*sum._sum.peperoni} ${recipes[2].name} ${recipes[2].unit}`,
                vedgetable: `${recipes[4].peperoni*sum._sum.peperoni} ${recipes[4].name} ${recipes[4].unit}`,
                dough: `${recipes[1].peperoni*sum._sum.peperoni} ${recipes[1].name} ${recipes[1].unit}`,
                sauce: `${recipes[0].peperoni*sum._sum.peperoni} ${recipes[0].name} ${recipes[0].unit}`,
            },
            branco:  {
                peperoniSlice: `${recipes[3].branco*sum._sum.branco} ${recipes[3].name} ${recipes[3].unit}`,
                cheese: `${recipes[2].branco*sum._sum.branco} ${recipes[2].name} ${recipes[2].unit}`,
                vedgetable: `${recipes[4].branco*sum._sum.branco} ${recipes[4].name} ${recipes[4].unit}`,
                dough: `${recipes[1].branco*sum._sum.branco} ${recipes[1].name} ${recipes[1].unit}`,
                sauce: `${recipes[0].branco*sum._sum.branco} ${recipes[0].name} ${recipes[0].unit}`,
            },
            allDressed:  {
                peperoniSlice: `${recipes[3].alldressed*sum._sum.alldressed} ${recipes[3].name} ${recipes[3].unit}`,
                cheese: `${recipes[2].alldressed*sum._sum.alldressed} ${recipes[2].name} ${recipes[2].unit}`,
                vedgetable: `${recipes[4].alldressed*sum._sum.alldressed} ${recipes[4].name} ${recipes[4].unit}`,
                dough: `${recipes[1].alldressed*sum._sum.alldressed} ${recipes[1].name} ${recipes[1].unit}`,
                sauce: `${recipes[0].alldressed*sum._sum.alldressed} ${recipes[0].name} ${recipes[0].unit}`,
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