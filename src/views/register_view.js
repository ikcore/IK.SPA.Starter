import UserServer from '../services/user_service'

export default class RegisterView {
    constructor(el) {
        this.element = el;
        this.render();
    }
    render () {
        this.element.innerHTML = `<h1>Register</h1>`;
    }
}