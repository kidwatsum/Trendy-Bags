import { Button } from "@mui/material"
import "../components/CartSummary.css"

export default function CartSummary({number_items,total_price,onCheckout}){
    return(
        <>
            <div className="summary-main">
                <div className="summary-text">
                <h1>Summary</h1>
                <h3>Number of items: {number_items}</h3>
                <h3>Estimated total: MKD {total_price}</h3>
                </div>
                <Button id="checkout-btn" onClick={onCheckout} >Checkout</Button>
            </div>
        </>
    )
}