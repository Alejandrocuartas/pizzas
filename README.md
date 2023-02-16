# Pizza Sales GraphQL API Documentation

This is the documentation for the Pizza Sales GraphQL API, which provides information about pizza sales.

## Queries

The following queries are supported:

### soldUnits

Returns the number of pizzas sold for each type of pizza during the specified time period.

#### Arguments

- `period` (required): The time period for which to retrieve data, specified as a `TimePeriod` object:  

input TimePeriod {  
    startMonth: String!  
    startDay: String!  
    endMonth: String!  
    endDay: String!  
    week: Int  //optional: increments the given period by the number of weeks specified  
}

#### Example

query Query {  
  soldUnits(period: { startMonth: "01", startDay: "01", endMonth: "01", endDay: "31" }) {  
    peperoni  
    branco  
    allDressed  
  }  
}


#### Response

{  
  "data": {  
    "soldUnits": {  
      "peperoni": 100,  
      "branco": 50,  
      "allDressed": 75  
    }  
  }  
}

### ingredientsUsed

Returns the ingredients used in each pizza during the specified time period.

#### Arguments

- `period` (required): The time period for which to retrieve data, specified as a `TimePeriod` object.

#### Example

query Query {
  ingredientsUsed(period: { startMonth: "01", startDay: "01", endMonth: "01", endDay: "31" }) {  
    peperoni {  
      peperoniSlice  
      cheese  
      vedgetable  
      dough  
      sauce  
   }  
    branco {  
      peperoniSlice    
      cheese  
      vedgetable  
      dough  
      sauce  
    }  
    allDressed {  
      peperoniSlice  
      cheese  
      vedgetable  
      dough  
      sauce  
    }  
  }  
}


#### Response

{  
"data": {  
"ingredientsUsed": {  
"peperoni": {  
"peperoniSlice": "100 slices",  
"cheese": "200g",  
"vedgetable": "50g",  
"dough": "300 pizza",  
"sauce": "100 pizza"  
},  
"branco": {  
"peperoniSlice": "0 slices",  
"cheese": "150g",  
"vedgetable": "100g",  
"dough": "250 pizza",  
"sauce": "50 pizza"  
},
"allDressed": {
"peperoniSlice": "50 slices",  
"cheese": "175g",  
"vedgetable": "75g",  
"dough": "275 pizza",  
"sauce": "75 pizza"  
}
}
}
}


### totalSales

Returns the total income from each type of pizza during the specified time period.

#### Arguments

- `period` (required): The time period for which to retrieve data, specified as a `TimePeriod` object.

#### Example

query Query {  
totalSales(period: { startMonth: "01", startDay: "01", endMonth: "01", endDay: "31" }) {  
peperoni  
branco  
allDressed  
}  
}


#### Response

{
"data": {
"totalSales": {
"peperoni": "$1000",
"branco": "$500",
"allDressed": "$750"
}
}
}


### ingredientsCost

Returns the cost of the ingredients used in each pizza during

#### Arguments

- `period` (required): The time period for which to retrieve data, specified as a `TimePeriod` object.

#### Example

query Query {  
  ingredientsCost( startMonth: "01", startDay: "01", endMonth: "01", endDay: "31" }) {  
    allDressed {  
      cheese  
      dough  
      peperoniSlice  
      sauce  
      vedgetable  
    }  
    peperoni {  
      vedgetable  
      sauce  
      peperoniSlice  
      dough  
      cheese  
    }  
  }  
}  

### Response

{  
  "data": {  
    "ingredientsCost": {  
      "allDressed": {  
        "cheese": "$138.6",  
        "dough": "$72.6",  
        "peperoniSlice": "$63.36",  
        "sauce": "$51.48",  
        "vedgetable": "$594"  
      },  
      "peperoni": {  
        "cheese": "$210.0",  
        "dough": "$82.5",  
        "peperoniSlice": "$144",  
        "sauce": "$58.5",  
        "vedgetable": "$0"  
      }  
    }  
  }  
}
