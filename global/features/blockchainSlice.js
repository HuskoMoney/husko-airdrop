import { createSlice } from '@reduxjs/toolkit'
import stake from '../../pages'

const initialState = {
    loading: false,
    balance: 0,
    account: null,
    provider: null,
    allowance: 0,
    totalStaked: 0,
    allTotal: 0,
    stake6Amount: 0,
    stake9Amount: 0,
    stake12Amount: 0,
    stake15Amount:0,
    stake6: {},
    stake9: {},
    stake12: {},
    stake15: {},
    claimed: false
}

export const blockchainSlice = createSlice({
    name: 'blockchain',
    initialState,
    reducers: {
        updateChain: (state, action) => {
            if(action.payload) {
                state.account = action.payload.account
                state.balance = action.payload.balance
                state.provider = action.payload.provider
                state.allowance = action.payload.allowance
                state.claimed = action.payload.claimed
             
            } else {
                state.account = null
                state.balance = 0
                state.provider = null
                state.allowance = 0
                state.totalStaked = 0
                state.claimed = false
            
            }
        }
    }
})

export const { updateChain } = blockchainSlice.actions
export default blockchainSlice.reducer