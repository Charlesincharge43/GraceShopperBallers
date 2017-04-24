import axios from 'axios'
import { setCurrentPoOAC } from './orders'

const UPDATE_BILLING = 'UPDATE_BILLING'
const USER_CHECKOUT = 'USER_CHECKOUT'

/* Action Creator */


export function createBill(bill){
	return {
		type: UPDATE_BILLING,
		bill
	}
}

/* Thunks*/

export function createBillingInfo(cardNumber, expDate, ccvNumber, address, city, state, zipCode) {

	return function (dispatch) {
		return axios.post('/api/billing', {
			cardNumber: cardNumber,
			expDate: expDate,
			ccvNumber: ccvNumber,
			address: address,
			city: city,
			state: state,
			zipCode: zipCode
		})
		.then(res => res.data)
		.then(Bill => {
			const action = createBill(Bill)
			dispatch(action)
		})
		.catch(err => {
			console.error(err)
		})
	}
}

export function completeOrder(uId) {

	return function (dispatch) {
		return axios.put('/api/orders/complete', {user_id: uId})
		.then(res => {
			console.log('success***********', res)
			dispatch(setCurrentPoOAC([]))
		})
		.catch(err => {
			console.error(err)
		})
	}
}

export function updateOrderPrice(curPoOArr) {

	return function (dispatch) {
		console.log('curPoO******', curPoOArr)
		return axios.put('/api/prodOnOrders/updateCompOrderPrice', {curPoOArr})
		.then(res => {
			console.log('reached updateCompOrderPrice')
		})
	}
}


/* Reducer */
let initialState = {
	currentBill: {}
}


export function createBillReducer (prevState=initialState, action) {

	const newState = Object.assign({}, prevState)

	switch(action.type) {
      
		case UPDATE_BILLING: 
			newState.currentBill = action.bill
			break
		default: 
        
			return prevState
	}
	return newState
}
