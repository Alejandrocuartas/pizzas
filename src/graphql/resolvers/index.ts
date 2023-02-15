import { TimePeriod } from "../../types";
import { totalSoldUnits } from "../../use-cases/soldUnits";

const soldUnits = (
    parent: unknown,
    args: {period:TimePeriod},
    context: any
): any => {
    return totalSoldUnits(args.period)
};

export default {
    Query: {
        soldUnits,
    },
};
