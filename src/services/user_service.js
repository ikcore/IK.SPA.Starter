import Api from '../core/api'

export default class UserService {
    
    constructor() {}

    login(args) {
        return Api.request({ method: 'POST', url: Api.get_base() + '/user/login', data: args });
    }
    register(args) {
        return Api.request({ method: 'POST', url: Api.get_base() + '/user/register', data: args });
    }
}