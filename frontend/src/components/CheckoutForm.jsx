import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Send paymentMethod.id and amount to backend
    try {
      const response = await fetch("http://localhost:3000/stripe-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount: totalAmount * 100, // Convert to cents
          paymentMethodId: paymentMethod.id
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setError("Payment failed.");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Payment Information</h3>
      <CardElement className="card-input" />
      {error && <p className="text-danger">{error}</p>}
      {success && <p className="text-success">Payment successful!</p>}
      <button type="submit" disabled={loading || !stripe} className="btn btn-brown mt-3">
        {loading ? "Processing..." : `Pay €${totalAmount.toFixed(2)}`}
      </button>

      {/* Styling */}
      <style>{`
        .card-input {
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 5px;
          margin-top: 10px;
        }
      `}</style>
    </form>
  );
};

export default CheckoutForm;
