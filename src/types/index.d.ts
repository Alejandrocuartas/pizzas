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

type IngredientUsed = {
    peperoni: Ingredients!
    branco: Ingredients!
    allDressed: Ingredients!
}

type Ingredients = {
    peperoniSlice: String!
    cheese: String!
    vedgetable: String!
    dough: String!
    sauce: String!
}