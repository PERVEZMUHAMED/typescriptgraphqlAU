import { injectable } from "inversify";
import IPaymentRepository from "./Interface/payment.repository.interface";

@injectable()
class PaymentRepository implements IPaymentRepository {
    public Create = async(args, model)=>{
        try {
            const create = await model.create(args);
            return create;
        } catch (error) {
            return error;
        }
    }
}
export default PaymentRepository;