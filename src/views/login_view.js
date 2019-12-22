import UserService from '../services/user_service'

export default class LoginView {
    constructor(el) {
        this.element = el;
        this.render();
        this.user_service = new UserService();
    }
    render () {
        this.element.innerHTML = `<h1>Login</h1>`;
    }
}