import { http } from 'viem'
import { suaveRigil } from "viem/chains"
import { TransactionRequestSuave } from 'viem/chains/suave/types'

// defaults for local suave-geth devnet; account at privateKey is pre-funded
const suaveUrl = 'http://localhost:8545'
const privateKey = '0x91ab9a7e53c220e6210460b65a7a3bb2ca181412a8a7b43ff336b3df1737ce12'
const wallet = suaveRigil.newWallet(privateKey, http(suaveUrl))
const provider = suaveRigil.newPublicClient(http(suaveUrl))

async function main() {
    const balance = await provider.getBalance(wallet.account)
    console.log(`Wallet ${wallet.account.address} Balance: ${balance}`)
    const fundTx = {
        to: '0x0000000000000000000000000000000000000000',
        value: 1n,
        type: '0x0',
        gas: 21000n,
        gasPrice: 1000000000n,
    } as TransactionRequestSuave
    const sendRes = await wallet.sendTransaction(fundTx)
    console.log(`Transaction hash: ${sendRes}`)

}

main()
