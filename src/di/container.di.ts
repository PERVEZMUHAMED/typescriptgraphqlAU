import {Container} from "inversify";
import { TYPES } from "./Types";
import UserRepository from "../repository/user.repository";
import UserBusiness from "../business/user.business";
import IUserRepository from "../repository/Interface/user.repository.interface";
import IUserBusiness from "../business/Interface/user.business.interface";
import ICurrencyRepository from "../repository/Interface/currency.repository.interface";
import CurrencyRepository from "../repository/currency.repository";
import ICurrencyBusiness from "../business/Interface/currency.business.interface";
import CurrencyBusiness from "../business/currency.business";
import IDepositRepository from "../repository/Interface/deposit.repository.interface";
import DepositBusiness from "../business/deposit.business";
import DepsoitRepository from "../repository/deposit.repository";
import IDepositBusiness from "../business/Interface/deposit.business.interface";
import IWithdrawBusiness from "../business/Interface/withdraw.business.interface";
import WithdrawBusiness from "../business/withdraw.business";
import IWithdrawRepository from "../repository/Interface/withdraw.repository.interface";
import WithdrawRepository from "../repository/withdraw.repository";

const container = new Container();

container.bind<IUserRepository>(TYPES.User).to(UserRepository);
container.bind<ICurrencyRepository>(TYPES.currency).to(CurrencyRepository);
container.bind<IDepositRepository>(TYPES.Deposit).to(DepsoitRepository);
container.bind<IWithdrawRepository>(TYPES.Withdraw).to(WithdrawRepository)

export const user = container.resolve<IUserBusiness>(UserBusiness);
export const currency = container.resolve<ICurrencyBusiness>(CurrencyBusiness);
export const deposit = container.resolve<IDepositBusiness>(DepositBusiness);
export const withdraw = container.resolve<IWithdrawBusiness>(WithdrawBusiness);