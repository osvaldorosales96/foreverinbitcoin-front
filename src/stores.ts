import { writable } from 'svelte/store'
import type { FeeRateEstimate, PriorityFees } from './interfaces/priorityFees'

export const text = writable<string>("")
export const fileName = writable<string>("")
export const receiveAddress = writable<string>("")
export const focusedAddressInput = writable<boolean>(false)
// receive_address: str = ""
// receive_address_type: str = ""
// is_receive_address_set: bool = False
// is_invalid_address: bool = False


const defaultLowFeeRateEstimate: FeeRateEstimate = {
    feeRate: 3,
    networkFee: 30000,
    serviceFee: 25000,
    totalAmount: 55000
}
const defaultMediumFeeRateEstimate: FeeRateEstimate = {
    feeRate: 5,
    networkFee: 50000,
    serviceFee: 25000,
    totalAmount: 75000
}
const defaultHighFeeRateEstimate: FeeRateEstimate = {
    feeRate: 10,
    networkFee: 100000,
    serviceFee: 25000,
    totalAmount: 125000
}

const defaultPriorityFees: PriorityFees = {
    low: defaultLowFeeRateEstimate,
    medium: defaultMediumFeeRateEstimate,
    high: defaultHighFeeRateEstimate,
    rateUSD: 30000
}

export const priorityFees = writable<PriorityFees>(defaultPriorityFees)
export const feePriority = writable<string>("high")
export const feeRate = writable<number>(1)
// fee_priority: str = "High"

//     # From confirmation
// order: str = ""
// order_status: int = 0
// order_type: str = "image"
// invoice_id: str = ""
export const orderId = writable<string>("No order id")
export const checkoutLink = writable<string>("http://reddit.com")
export const orderStatus = writable<number>(0)
// checkout_link: str = ""

//     # Order creation and processing
// order_processing: bool = False
// order_confirmed: bool = False
// order_loading: bool = True

//     # Inscription
// inscription: str = ""
// inscription_sent_tx: str = ""

//     # Show
// address_done_button: bool = False

// host: str = os.getenv("HOST", "http://localhost")



type Notification = string

export const notifications = writable<Notification[]>([])

export function toast(message: string) {
    notifications.update((state) => [message, ...state])
    setTimeout(removeToast, 2000)
}

function removeToast() {
    notifications.update((state) => {
        return [...state.slice(0, state.length - 1)]
    })
}
