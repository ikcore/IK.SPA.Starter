export default class HomeView {
    constructor(el) {
        this.element = el;
        this.render();
    }
    render() {
        this.element.innerHTML = `<h1>Home</h1>`;
    }
}