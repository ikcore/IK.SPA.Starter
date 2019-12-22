import ContactService from '../services/contact_service'

export default class ContactView {
    constructor(el) {
        this.element = el;
        this.render();
    }
    render () {
        this.element.innerHTML = `<h1>Contact</h1>`;
    }
}