import { createSlice } from '@reduxjs/toolkit'

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
    stake15Amount:0
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
                state.totalStaked = action.payload.totalStaked
                state.allTotal = action.payload.allTotal
                state.stake6Amount = action.payload.stake6Amount
                state.stake9Amount = action.payload.stake9Amount
                state.stake12Amount = action.payload.stake12Amount
                state.stake15Amount = action.payload.stake15Amount
            } else {
                state.account = null
                state.balance = 0
                state.provider = null
                state.allowance = 0
                state.totalStaked = 0
                state.allTotal = 0
                state.stake6Amount = 0
                state.stake9Amount = 0
                state.stake12Amount = 0
                state.stake15Amount = 0
            }
        }
    }
})

export const { updateChain } = blockchainSlice.actions
export default blockchainSlice.reducer