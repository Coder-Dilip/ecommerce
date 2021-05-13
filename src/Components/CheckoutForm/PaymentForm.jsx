import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import FacebookIcon from '@material-ui/icons/Facebook';
import Review from './Review';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ checkoutToken, nextStep, backStep, shippingData, onCaptureCheckout }) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

    if (error) {
      console.log('[error]', error);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
        shipping: { name: 'International', street: shippingData.address1, town_city: shippingData.city, county_state: shippingData.shippingSubdivision, postal_zip_code: shippingData.zip, country: shippingData.shippingCountry },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      onCaptureCheckout(checkoutToken.id, orderData);

      nextStep();
    }
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>{({ elements, stripe }) => (
          <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
            <CardElement />
            <br /> <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>

              <Button variant="outlined" onClick={backStep}>Back</Button>
              <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                Pay {checkoutToken.live.subtotal.formatted_with_symbol}
              </Button>
            </div>
          </form>
        )}
        </ElementsConsumer>
      </Elements>

      <div>
          <p  style={{ marginTop:'50px', lineHeight:'1.3rem'}}><strong style={{color:'orangered'}}>NOTE: </strong>This site is developed by <span><a target='_blank'  style={{textDecoration:'none',color:'blue'}} href="https://www.instagram.com/dilip_stack/"> Dilip Pokhrel </a></span> and is not for selling real products, so payment functions are temporarily disabled!</p>
          <p style={{marginTop:'40px'}}>Contact Developer</p>
          <div style={{display:'flex', alignItems:'center'}}>
       
         
         
         <a target='_blank' style={{textDecoration:'none', color:'orangered'}} href="https://www.instagram.com/dilip_stack/"><InstagramIcon /></a>

         <a target='_blank' style={{textDecoration:'none', color:'#4267B2', marginLeft:'8px'}} href="https://www.facebook.com/dilip.pokhrel.18294"><FacebookIcon /></a>

         <a target='_blank' style={{textDecoration:'none', color:'#1DA1F2', marginLeft:'8px'}} href="https://twitter.com/DilipPo44481108"><TwitterIcon /></a>
         
         </div>
      </div>
    </>
  );
};

export default PaymentForm;