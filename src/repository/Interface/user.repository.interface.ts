
export default interface IUserRepository {
    Create:(args:any, model:any)=>any,
    FindOne:(args:any, model:any)=>any,
    Update:(args:any, context:any, model:any)=>any,
    Delete:(args:any, context:any, model:any)=>any,
    currency:(args:any, model:any)=>any,
}