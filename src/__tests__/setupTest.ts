jest.mock("../use-cases/soldUnits", () => {
    return {
        totalSoldUnits: () => {
            return {
                peperoni: 100,
                branco: 100,
                allDressed: 100
            }
        }
    }
})