
export default interface IDepositRepository {
    Create:(args:any, model:any)=>any,
    FindOne:(args:any, model:any)=>any,
    wallet:(args:any, model:any)=>any,
    walletUpdate:(args:any, model:any)=>any,
}