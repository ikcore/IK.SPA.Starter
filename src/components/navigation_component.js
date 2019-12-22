import Router from '../core/router'

export default class NavigationComponent {
    constructor(el) {
        this.element = el;
        this.render();
        this.resize();
        window.addEventListener('resize', (() => {this.resize()}).bind(this), false);
    }
    render() {
        this.element.innerHTML = ``;
        let ul = document.createElement('ul');
        ul.className = 'nav-ul';
        this.element.appendChild(ul);

        this.create_nav_item(ul, { title: 'Home', route: '/'});
        this.create_nav_item(ul, { title: 'Contact', route: '/contact'});
    }
    resize() {
        this.width = window.innerWidth;
    }
    create_nav_item (ul, args) {
        let li = document.createElement('li');
        ul.appendChild(li);
        let item = document.createElement('span');
        li.appendChild(item);
        item.className = 'nav-link';
        item.innerText = args.title;
        item.addEventListener('click',((ue) => { Router.navigate(args.route); }).bind(this), false);
    }
}