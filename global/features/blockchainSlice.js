import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    balance: 0,
    account: null,
    provider: null,
    allowance: 0,
    totalStaked: 0,
    allTotal: 0
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
            } else {
                state.account = null
                state.balance = 0
                state.provider = null
                state.allowance = 0
                state.totalStaked = 0
                state.allTotal = 0
            }
        }
    }
})

export const { updateChain } = blockchainSlice.actions
export default blockchainSlice.reducer