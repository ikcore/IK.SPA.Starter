import Api from '../core/api'

export default class ContactService {
    
    constructor() {}

    post_contact(args) {
        return Api.request({ method: 'POST', url: Api.get_base() + '/contact', data: args });
    }
}