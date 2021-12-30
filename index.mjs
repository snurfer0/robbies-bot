import fetch from "node-fetch"

// decimals 18
// 12 robbies per request
// counter is the total number of pages
// 100+ async requests needed to get all robbies
// remove last 18 chars from string str.slice(0, -18)
// robbies NFT Contract 0xd4220b0b196824c2f548a34c47d81737b0f6b5d6

const BASE_URL = 'https://marketplace.biswap.org/back/offers/main-page'
const DEFAULT_PARTNER = '6184f5111329baa2cd24ec38'
const DEFAULT_FILTER = 'none'
const DEFAULT_SORT = 'newest'
const USER_ADDRESS = 'no-address'

const getUrl = (sortBy, userAddress, page, partner, filter) => {
    return `${BASE_URL}?sortBy=${sortBy}&userAddress=${userAddress}&page=${page}&partner=${partner}&filter=${filter}`
}

const request = async page => {
    console.log(`Fetching robbies from page ${page}`)
    const URL = getUrl(DEFAULT_SORT, USER_ADDRESS, page, DEFAULT_PARTNER, DEFAULT_FILTER)
    const response = await fetch(URL, { method: 'GET' })
    return await response.json()
}

const query = async () => {

    var robbies = []
    var promises = []

    const data = await request(0)
    const counter = data.counter

    const start = new Date().getTime()
    for (var page = 0; page < counter; page++) promises.push(request(page))
    const result = await Promise.all(promises)
    robbies = result.map(r => r.data)
    robbies = [].concat.apply([], robbies)
    const end = new Date().getTime()

    console.log(`Total robbies fetched: ${robbies.length}`)
    console.log(`Call to [query] took ${end - start} milliseconds`)

}

query()

// robbie json example
// {
//       _id: '61ccfdd74afc95c20c5e4543',
//       price: '92000000000000000000',
//       nft_contract: '0xd4220b0b196824c2f548a34c47d81737b0f6b5d6',
//       deal_token: '0x965f527d9159dce6288a2219db51fc6eef120dd1',
//       currency: 'BSW',
//       nft_id: 46976,
//       nft_db_id: '61c32583bcfb137d6a6e0c21',
//       user: '0x4abe808f66e1823da5a62e7bff4c90ddcc14e442',
//       offer_id: 299333,
//       side: 0,
//       partner_db_id: '6184f5111329baa2cd24ec38',
//       collection_db_id: null,
//       status: 'open',
//       createdAt: '2021-12-30T00:31:19.441Z',
//       nft: [Object],
//       partner: [Object],
//       isFavorite: false,
//       usdPrice: 90.160418723
//     }