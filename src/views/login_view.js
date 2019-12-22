import UserServer from '../services/user_service'

export default class LoginView {
    constructor(el) {
        this.element = el;
        this.render();
    }
    render () {
        this.element.innerHTML = `<h1>Login</h1>`;
    }
}