import React, {useState, useEffect} from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core';
import useStyles from './styles';

import AddressForm from '../AddressForm'
import  PaymentForm from '../PaymentForm'
import Commerce from '@chec/commerce.js';

const commerce= new Commerce('pk_27326c19aa9d5d7747890f8c9bc786b21093c6bbca4b2', true);      

const steps=['Shipping address', 'Payment details'];

function Checkout({cart}) {

const [activeStep, setactiveStep] = useState(0);
const [checkoutToken, setcheckoutToken] = useState(null)
const [shippingData, setshippingData] = useState({})
const classes=useStyles();

useEffect(()=>{
const generateToken=async ()=>{
    try{
const token=await commerce.checkout.generateToken(cart.id, {type:'cart'})
console.log(token);
setcheckoutToken(token)
    }catch(error){

    }
}
generateToken();
},[cart]);

const nextStep=()=>setactiveStep((prevActiveState)=>prevActiveState+1)
const backStep=()=>setactiveStep((prevActiveState)=>prevActiveState-1)

const next=(data)=>{
setshippingData(data);
nextStep();
}

const Confirmation=()=>{
    return(
    <div>confirm</div>
    )
}

const Form=()=>{
    return(
    activeStep==0?<AddressForm checkoutToken={checkoutToken} next={next}  />:<PaymentForm  shippingData={shippingData}  checkoutToken={checkoutToken} backStep={backStep} />
    ) 
}


    return (
        <>
        
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' align='center'>Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
                    </Stepper>
                    {activeStep==steps.length?<Confirmation/>:checkoutToken && <Form/>}
                </Paper>
            </main>
        </>
    )
}

export default Checkout
