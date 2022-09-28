import Web3EthContract from 'web3-eth-contract'
import WallectConnectProvider from '@walletconnect/web3-provider'
import Web3Modal from 'web3modal'
import Web3 from 'web3'
import { store } from '../store/store'
import { useDispatch } from 'react-redux'

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
        const stakingContract = new Web3EthContract(stakeJson, '0x828bF85bdD2DEC27d4223c0EDb3f25Fb82dFE3c4')

        

        let web3 = new Web3(provider);
        let accounts = await web3.eth.getAccounts()
        let balance = await web3.eth.getBalance(accounts[0])
        let account = accounts[0]
        let allowance = await contract.methods.allowance(account, '0x828bF85bdD2DEC27d4223c0EDb3f25Fb82dFE3c4').call()
        let stake6 = await stakingContract.methods._stake6(account).call()
        let stake9 = await stakingContract.methods._stake9(account).call()
        let stake12 = await stakingContract.methods._stake12(account).call()
        let stake15 = await stakingContract.methods._stake15(account).call()
        let totalStaked = (await stake6.amount)
        let allTotal = totalStaked + 10000
        console.log(totalStaked)
        console.log(stake6)
        console.log(allowance)

        return {
            account,
            balance,
            provider,
            allowance,
            totalStaked,
            allTotal
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

export const Mint = async (mintAmount) => {
    const tokenAbi = await fetch('config/abi.json')
    const abiJson = await tokenAbi.json()
    Web3EthContract.setProvider(store.getState().blockchain.provider)

    const contract = new Web3EthContract(abiJson, '0xB471991BF9482D9db75b0139382944b7D0A96633');

    try {
        await contract.methods.mint(mintAmount).send({
            from: store.getState().blockchain.account,
            value: (mintAmount * 2) * 10**18
        })
    } catch (err) {
        console.log(err)
    }
}

export const Stake = async (compoundValue, amount) => {
    const mintAbi = await fetch('config/mint.json')
    const abiJson = await mintAbi.json()

    Web3EthContract.setProvider(store.getState().blockchain.provider)
    let web3 = new Web3(store.getState().blockchain.provider);

    const contract = new Web3EthContract(abiJson, '0x828bF85bdD2DEC27d4223c0EDb3f25Fb82dFE3c4')

    try {
        if(amount < 2) {
            alert('Please input amount needed')
        } else {
            if(compoundValue == 3) {
                await contract.methods.stake6(amount).send({
                    from: store.getState().blockchain.account
                })
                alert('Successfully staked for 30 Days')
            } else if(compoundValue == 5) {
                await contract.methods.stake9(amount).send({
                    from: store.getState().blockchain.account
                })
                alert('Successfully staked for 60 Days')
            } else if(compoundValue == 7) {
                await contract.methods.stake12(amount).send({
                    from: store.getState().blockchain.account
                })
                alert('Successfully staked for 90 Days')
            } else if(compoundValue == 9) {
                await contract.methods.stake15(amount).send({
                    from: store.getState().blockchain.account
                })
                alert('Successfully staked for 120 Days')
            }
        }
        console.log(compoundValue);
        console.log(amount)

    } catch (err) {
        console.log(err)
    }
}