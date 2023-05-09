
export default interface ICurrencyRepository {
    Create:(args:any, model:any)=>any,
    FindOne:(args:any, model:any)=>any,
}