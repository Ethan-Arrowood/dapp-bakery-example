const Web3 = require('web3')
const fs = require('fs')

const web3 = new Web3('ws://localhost:7545')

const Bakery_bytecode = fs.readFileSync('Bakery_sol_Bakery.bin', { encoding: 'utf8' })
const Bakery_abi = JSON.parse(fs.readFileSync('Bakery_sol_Bakery.abi', { encoding: 'utf8' }))

const Cookie_bytecode = fs.readFileSync('Bakery_sol_Cookie.bin', { encoding: 'utf8' })
const Cookie_abi = JSON.parse(fs.readFileSync('Bakery_sol_Cookie.abi', { encoding: 'utf8' }))

async function printCookieCount(bakery) {
  let cookieCount = await bakery.methods.getContractCount().call()

  console.log(`Cookie Count: ${cookieCount}`)
}

async function main() {
  const accounts = await web3.eth.getAccounts()

  const Bakery = new web3.eth.Contract(Bakery_abi)

  const bakery = await Bakery.deploy({
    data: Bakery_bytecode
  }).send({
    from: accounts[0],
    gas: 1500000,
    gasPrice: 20000000000,
  })

  console.log(`Bakery Contract Address: ${bakery.options.address}`)

  console.log(bakery.methods)

  printCookieCount(bakery)

  await bakery.methods.newCookie("chocolate").send({
    from: accounts[0],
    gas: 1500000,
    gasPrice: 20000000000,
  })

  printCookieCount(bakery)

  const cookieAddress = await bakery.methods.contracts(0).call()

  console.log(`CookieAddres: ${cookieAddress}`)

  const cookie = new web3.eth.Contract(Cookie_abi, cookieAddress)

  console.log(`Cookie Contract Address: ${cookie.options.address}`)

  console.log(cookie.methods)

  const cookieFlavor = await cookie.methods.getFlavor().call()

  console.log(`Flavor: ${cookieFlavor}`)

  return
}

main()