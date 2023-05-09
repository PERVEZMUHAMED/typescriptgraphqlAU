
export default interface IUserRepository {
    Create:(args:any, model:any)=>any,
    FindOne:(args:any, model:any)=>any,
    currency:(args:any, model:any)=>any,
}