class customErrorHandler extends Error {
    constructor(status, msg) {
        super();
        this.status = status;
        this.message = msg
    }

    static alreadyExist(message) {
        return new customErrorHandler(409, message)
    }
    static alreadyExistEmail(message) {
        return new customErrorHandler(409, message)
    }

    static wrongCredentails(message = 'Email and password is wrong!') {
        return new customErrorHandler(404, message)
    }
    static unAuthorized(message = 'unAuthorized') {
        return new customErrorHandler(401, message)
    }
    
    static notFound(message = 'Loan Not Found') {
        return new customErrorHandler(404, message)
    }
    static ServerError (message = 'Internal server Error') {
        return new customErrorHandler(500, message)
    }
    static Empty (message = "Opps there is no Data in DataBase"){
        return new customErrorHandler(404, message)
    }
    static InvalidExt (message = "Invalid extension. Accept png and jpeg files"){
        return new customErrorHandler(422, message)
    }
    static notAprroved (message = 'Your loan is not aprroved yet'){
        return new customErrorHandler(401, message)
    }
    
}
export default customErrorHandler