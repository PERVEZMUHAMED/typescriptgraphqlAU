
export default interface IUserBusiness {
    Register:(args:any)=>any
    Login:(args:any, Context:any)=>any
    updateUser:(args:any, context:any)=>any
    deleteUser:(args:any, context:any)=>any
    getUser:(args:any, context:any)=>any
    getAllUsers:(args:any, context:any)=>any
    verifyToken:(args:any)=>any
    forgotPassword:(args:any)=>any
    resetPassword:(args:any)=>any
    changePassword:(args:any, context:any)=>any
}