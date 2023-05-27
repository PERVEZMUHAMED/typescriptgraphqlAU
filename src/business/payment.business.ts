import {inject, injectable} from "inversify";
import PaymentRepository from "../repository/payment.repository";
import { IPaymentBusiness } from "./Interface/payment.business.interface";
import { TYPES } from "../di/Types";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY,{
    apiVersion: '2022-11-15',})

@injectable()
class PaymentBusiness implements IPaymentBusiness {
    private payment: PaymentRepository;
    constructor(
        @inject(TYPES.Payment) private _Payment:PaymentRepository
    ){
        this.payment = _Payment;
    }
    public processPayment =async(args, context)=>{
        try {
            const paymentIntent:any = await stripe.paymentIntents.create({
                amount:100,
                currency:"USD",
                description:"TEST PAYMENT",
                metadata:{integration_check:"accept_Payment"},
                payment_method_types:['card'],
                shipping:args.input,
                automatic_payment_methods:{enabled:true}
            })
             
        } catch (error) {
            return error;
        }
    }
} 