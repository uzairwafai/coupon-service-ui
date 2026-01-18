import { useState } from "react";
import axios from "axios";

const HOST = import.meta.env.VITE_HOST;

function App() {
  const [amount, setAmount] = useState();
  const [couponCode, setCouponCode] = useState("");
  const [couponValidationResponse, setCouponValidationResponse] =
    useState(null);

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
      setCouponValidationResponse(response?.data);
    } catch (err) {
      console.error(err);
    }
  };

  console.log({ couponValidationResponse });

  return (
    <>
      <h1>Dummy Checkout Page</h1>
      <div>
        <span>Amount </span>
        <input
          type="number"
          value={amount}
          placeholder="Enter cart amount"
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
          placeholder="Enter coupon Code"
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
      {couponValidationResponse && (
        <div>
          {couponValidationResponse.isValid ? (
            <>
              <p style={{ color: "green" }}>Coupon applied successfully</p>
              <span>
                <strong>Discount Applied: </strong>
                {couponValidationResponse.discount}
              </span>
              <br />
              <span>
                <strong>Final Amount: </strong>
                {amount - couponValidationResponse.discount}
              </span>
            </>
          ) : (
            <p style={{ color: "red" }}>Invalid Coupon</p>
          )}
        </div>
      )}
    </>
  );
}

export default App;
