import Api from './api'

export default class Auth {

    static localName = '';

    static login (bearer) {
        window.token = bearer;
        try {
            window.localStorage.setItem(this.localName, bearer);
        } catch (err) { console.warn('no local storage'); }
        Api.set_auth_token(bearer);
    };
    static logout () {
        delete window.token;        
        try {
            window.localStorage.removeItem(this.localName);
        } catch (err) { console.warn('no local storage'); }
        Api.set_auth_token(null);
    };
    static init (storeName) {        
        try {
            this.localName = storeName;
            window.token = window.localStorage.getItem(this.localName);
        } catch (err) { console.warn('no local storage'); }
        if (this.check()) {
            this.login(window.token);
        }
    };
    static check () {
        return (window.token !== undefined && window.token !== null);
    };    
}