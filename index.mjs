import fetch from "node-fetch";

// 12 robbies per request
// counter is the total number of pages
// 12 async requests needed to get all robbies
// robbies NFT Contract 0xd4220b0b196824c2f548a34c47d81737b0f6b5d6

const query = async () => {

    var robbies = []

    const sortBy = 'newest'
    const userAddress = 'no-address'
    const page = '0'
    const partner = '6184f5111329baa2cd24ec38'
    const filter = 'none'

    const url = `https://marketplace.biswap.org/back/offers/main-page?sortBy=${sortBy}&userAddress=${userAddress}&page=${page}&partner=${partner}&filter=${filter}`
    
    const response = await fetch(url, { method: 'GET' })
    const { counter } = await response.json()

    console.log(counter)

    for (var i = 0; i < counter; i++) {
        console.log(`performing request ${i}`)
        const response = await fetch(url, { method: 'GET' })
        const json = await response.json()
        robbies = [...robbies, ...json.data]
    }

    console.log(`Total robbies fetched: ${robbies.length}`)
    const robbiesCheck = robbies.map(r => r.)

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