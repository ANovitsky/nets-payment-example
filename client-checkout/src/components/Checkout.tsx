import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadScript } from "../helpers/loadScript";

declare var Dibs: any;

const Checkout = () => {
  const [isLoading, setLoading] = useState<boolean>(true);

  let params = useParams();

  useEffect(() => {
    loadScript(
      "nets-payments",
      "https://test.checkout.dibspayment.eu/v1/checkout.js?v=1"
    ).then(() => {
      var checkoutOptions = {
        checkoutKey: "[YOUR KEY]",
        paymentId: params.paymentId,
        containerId: "checkout-container-div",
        language: "en-GB",
        theme: {
          buttonRadius: "5px",
        },
      };
      var checkout = new Dibs.Checkout(checkoutOptions);
    });
  }, []);

  // if (isLoading) {
  //   return <div className="App">Loading</div>;
  // }

  return (
    <div className="App">
      <div id="checkout-container-div"></div>
    </div>
  );
};

export default Checkout;
