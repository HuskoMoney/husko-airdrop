import Web3EthContract from 'web3-eth-contract'
import WallectConnectProvider from '@walletconnect/web3-provider'
import Web3Modal from 'web3modal'
import Web3 from 'web3'
import { store } from '../store/store'
import { useDispatch } from 'react-redux'
import abi from './airdrop.json'

const providerOptions = {
    walletconnect: {
        package: WallectConnectProvider,
        options: {
            rpc: {
                8001: 'https://rpc-endpoints.superfluid.dev/mumbai'
            },
            chainId: 8001,
        }
    }
}



export const connect = async () => {
    const web3Modal = new Web3Modal({
    network: 'mainnet',
    cacheProvider: true,
    providerOptions,
})
    const provider = await web3Modal.connect()
    await web3Modal.toggleModal()
    provider.on("chainChanged", (chainId) => {
       
        console.log(chainId)

    })
    console.log(provider.chainId)
    if(provider.chainId == 0x13881) {
    try {
        const tokenAbi = await fetch('config/tokenAbi.json')
        const abiJson = await tokenAbi.json()
        const stakeAbi = await fetch('config/mint.json')
        const stakeJson = await stakeAbi.json()
        Web3EthContract.setProvider(provider)

        const contract = new Web3EthContract(abiJson, '0xEc62AA55F5Aac3d2b57126a3851954072763caDB')
        const stakingContract = new Web3EthContract(stakeJson, '0xE289B396BA03944CAc88F996BaF91F77b6B5E7B8')
        const airdropContract = new Web3EthContract(abi, '0x9ea1E05d7d2874705BD027da8B6aAbAc8e81fb51')
        

        let web3 = new Web3(provider);
        let accounts = await web3.eth.getAccounts()
        let balance = await web3.eth.getBalance(accounts[0])
        let account = accounts[0]
        let allowance = await contract.methods.allowance(account, '0x828bF85bdD2DEC27d4223c0EDb3f25Fb82dFE3c4').call()
        let claimed = await airdropContract.methods.AirdropClaimed(account).call()

        return {
            account,
            balance,
            provider,
            allowance,
            claimed
            
        }
    } catch (err) {
        console.log(err);
    }
} else {
    alert('Connect to Mumbai TestNet')
}
}

export const disconnect = async () => {
    const web3Modal = new Web3Modal({
        network: 'mainnet',
        cacheProvider: true,
        providerOptions,
    })
    await web3Modal.clearCachedProvider();
    return null;
}

export const Approve = async () => {
    const tokenAbi = await fetch('config/tokenAbi.json')
    const abiJson = await tokenAbi.json()
    await Web3EthContract.setProvider(store.getState().blockchain.provider)
    const contract = new Web3EthContract(abiJson, '0xEc62AA55F5Aac3d2b57126a3851954072763caDB')

    try {
        await contract.methods.approve('0x828bF85bdD2DEC27d4223c0EDb3f25Fb82dFE3c4', 10000000).send({
            from: store.getState().blockchain.account
        })
    } catch (err) {
        console.log(err)
    }


}

export const Claim = async() => {
    await Web3EthContract.setProvider(store.getState().blockchain.provider)
    const airdropContract = new Web3EthContract(abi, '0x9ea1E05d7d2874705BD027da8B6aAbAc8e81fb51')

    try {
        const account =  store.getState().blockchain.account
        
        let web3 = new Web3(store.getState().blockchain.provider);
        let balance = await web3.eth.getBalance(account)
        await airdropContract.methods.claimTokens().send({
            from: account
        })

        const claimed = await airdropContract.methods.AirdropClaimed(account).call()

        return {
            account,
            balance,
            claimed
        }
    } catch(err) {
        console.log(err)
    }

}