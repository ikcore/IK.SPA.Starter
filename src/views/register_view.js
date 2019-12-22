import UserService from '../services/user_service'

export default class RegisterView {
    constructor(el) {
        this.element = el;
        this.user_service = new UserService();
        this.render();
        
    }
    render () {
        this.element.innerHTML = `<h1>Register</h1>`;
        this.user_service.register({}).then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err);
        });
    }
}