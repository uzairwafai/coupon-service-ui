import { useState } from "react";
import axios from "axios";

const HOST = "http://localhost:3000";

function App() {
  const [amount, setAmount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponValidation, setCouponValidation] = useState(null);

  const onApplyCoupon = async () => {
    let response;
    try {
      response = await axios.post(
        `${HOST}/coupons/validate`,
        { couponCode, amount },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setCouponValidation(response?.data);
    } catch (err) {
      console.error(err);
    }
  };

  console.log({ couponValidation });

  return (
    <>
      <h1>Dummy Checkout Page</h1>
      <div>
        <span>Amount </span>
        <input
          type="number"
          value={amount}
          placeholder="Amount"
          min={0}
          onChange={(event) => {
            setAmount(event.target.value);
          }}
        />
        <br />
        <br />
        <span>Coupon Code </span>
        <input
          type="text"
          value={couponCode}
          placeholder="Coupon Code"
          onChange={(event) => {
            setCouponCode(event.target.value);
          }}
        />
        <br />
        <br />
        <button disabled={!amount || !couponCode} onClick={onApplyCoupon}>
          Apply Coupon
        </button>
      </div>
      {couponValidation && (
        <div>
          {couponValidation.isValid ? (
            <p style={{ color: "green" }}>Coupon applied successfully</p>
          ) : (
            <p style={{ color: "red" }}>Invalid Coupon</p>
          )}
          {couponValidation.discount > 0 && (
            <>
              <span>
                <strong>Discount Applied: </strong>
                {couponValidation.discount}
              </span>
              <br />
              <span>
                <strong>Final Amount: </strong>
                {amount - couponValidation.discount}
              </span>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default App;
