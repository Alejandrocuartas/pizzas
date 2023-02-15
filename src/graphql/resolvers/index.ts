import { IngredientUsed, SalesTotal, TimePeriod, UnitSold } from "../../types";
import { totalIngredientCost } from "../../use-cases/ingredientsCosts";
import { totalSoldUnits } from "../../use-cases/soldUnits";
import { totalSold } from "../../use-cases/totalSales";
import { totalIngredientUsed } from "../../use-cases/usedIngredients";

const soldUnits = (
    parent: unknown,
    args: {period:TimePeriod},
    context: any
): Promise<UnitSold> => {
    return totalSoldUnits(args.period)
};

const totalSales = (
    parent: unknown,
    args: {period:TimePeriod},
    context: any
): Promise<SalesTotal> => {
    return totalSold(args.period)
};

const ingredientsUsed = (
    parent: unknown,
    args: {period:TimePeriod},
    context: any
): Promise<IngredientUsed> => {
    return totalIngredientUsed(args.period)
};

const ingredientsCost = (
    parent: unknown,
    args: {period:TimePeriod},
    context: any
): Promise<IngredientUsed> => {
    return totalIngredientCost(args.period)
};

export default {
    Query: {
        soldUnits,
        totalSales,
        ingredientsUsed,
        ingredientsCost,
    },
};
