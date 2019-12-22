import Router from './core/router'
import Auth from './core/auth'
import Api from './core/api'

import NavigationComponent from './components/navigation_component'

import RegisterView from './views/register_view'
import LoginView from './views/login_view'
import HomeView from './views/home_view'
import ContactView from './views/contact_view'

window.app = document.getElementById('app');
window.header = document.createElement('nav');
window.header.className = 'app-header';
window.app.appendChild(window.header);

window.main = document.createElement('div');
window.main.className = 'app-main';
window.app.appendChild(window.main);

window.footer = document.createElement('footer');
window.footer.className = 'app-footer';
window.app.appendChild(window.footer);

new NavigationComponent(window.header);

Router.flush();
Router.config({ mode: 'history' });

Router.add(/contact/, () => {
    new ContactView(window.main);
})
.add(/register/, () => {
    new RegisterView(window.main);
})
.add(/login/, () => {
    new LoginView(window.main);
})
.add(() => {
    new HomeView(window.main);
})
.listen();

console.log('App started');

window.onload = () => {
    var path = window.location.pathname;
    var redir = path;
    if (window.location.search !== undefined) {
        redir += window.location.search;
    }
    Router.navigate(redir);
};