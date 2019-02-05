// Copy the JSON from cars.json and assign it to a variable in a new application. This data holds sales information for a car dealership. Your job is to produce the following reports for the dealership based on their total 2017 sales.

// forEach() - Calls a function for each array element
// filter() - *Creates a new array* with every element in an array that pass a test
// map() - *Creates a new array* with the result of calling a function for each array element
// find() - Returns the value of the first element in an array that pass a test
// reduce() - Reduce the values of an array to a single value (going left-to-right)
// sort() - Sorts the elements of an array
// reverse() - Reverses the order of items in the array
// every() - Determine if every item in an array passes a condition
// some() - Determine if some of the items in an array passes a condition

// 1. Total profit for 2017
// 2. In which month did they sell the most cars?
// 3. Which salesperson sold the most cars?
// 4. Which salesperson made the most profit?
// 5. Which model was the most popular?
// 6. Which bank provided the most loans to our customers?

const getCars = () => {
  return fetch("http://localhost:3002/vehicles").then(res => res.json())
}

// 1. Total profit for 2017
const totalProfits = getCars().then(cars =>
  console.log("Total profits for 2017",cars
    .filter(car => car.purchase_date.startsWith("2017"))
    .reduce((acc, money) => acc + money.gross_profit, 0))
)

// 2. In which month did they sell the most cars?
const moneyMonth = getCars().then(cars => {
  const months = cars
    .map(car => car.purchase_date.split("-")[1])
    .reduce((acc, month) => {
      if (acc.some(mon => mon.hasOwnProperty(month))) {
        let monthObj = acc.find(mon => mon.hasOwnProperty(month))
        monthObj[month]++
      } else {
        let obj = { [month]: 1 }
        acc.push(obj)
      }
      return acc
    }, [])
    .sort()[0]
 const  month = Object.keys(months)[0]
 console.log("The month with the most profit is",month)
})

const salespersonObj = getCars().then(cars => {
  const salesObj = cars.reduce((acc, vehicle) => {
    if (acc.some(v => v.hasOwnProperty(vehicle.sales_id))) {
      let vehicleObj = acc.find(v => v.hasOwnProperty(vehicle.sales_id))
      vehicleObj[vehicle.sales_id]++
      vehicleObj.profit += vehicle.gross_profit
    } else {
      let obj = {
        [vehicle.sales_id]: 1,
        name: `${vehicle.sales_agent.first_name} ${
          vehicle.sales_agent.last_name
        }`,
        profit: vehicle.gross_profit
      }
      acc.push(obj)
    }
    return acc
  }, [])
    return salesObj
})

// 3. Which salesperson sold the most cars?
const mostSales = salespersonObj.then(s =>
    console.log("Salesperson with the most sales",
    s.sort((a, b) => b[Object.keys(b)[0]] - a[Object.keys(a)[0]])[0].name
  )
)

// 4. Which salesperson made the most profit?
const mostProfit = salespersonObj.then(
  s => console.log("Salesperson with the most profits",s.sort((a, b) => b.profit - a.profit)[0].name)
)

// 5. Which model was the most popular?
const mostPopularModel = getCars().then(cars =>
  console.log("Most popular car model sold",
    cars
      .reduce((acc, vehicle) => {
        if (acc.some(v => v.model === vehicle.vehicle.make)) {
          let vehicleObj = acc.find(v => v.model === vehicle.vehicle.make)
          vehicleObj.total++
        } else {
          let obj = {
            total: 1,
            model: vehicle.vehicle.make
          }
          acc.push(obj)
        }
        return acc
      }, [])
      .sort((a, b) => b.total - a.total)[0].model
  )
)

// 6. Which bank provided the most loans to our customers?
const mostLoansBank = getCars().then(cars =>
  console.log("The bank that provided the most loans",
    cars
      .reduce((acc, vehicle) => {
        if (acc.some(v => v.bank === vehicle.credit.credit_provider)) {
          let vehicleObj = acc.find(
            v => v.bank === vehicle.credit.credit_provider
          )
          vehicleObj.total++
        } else {
          let obj = {
            total: 1,
            bank: vehicle.credit.credit_provider
          }
          acc.push(obj)
        }
        return acc
      }, [])
      .sort((a, b) => b.total - a.total)[0].bank
  )
)


