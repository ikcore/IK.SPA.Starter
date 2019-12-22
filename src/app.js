import Router from './core/router'
import Auth from './core/auth'
import Api from './core/api'
import NavigationComponent from './components/navigation_component'
import RegisterView from './views/register_view'
import LoginView from './views/login_view'

import HomeView from './views/home_view'
import ContactView from './views/contact_view'

window.app = document.getElementById('app');
window.header = document.createElement('div');
window.header.className = 'app-header';
window.app.appendChild(window.header);

window.main = document.createElement('div');
window.main.className = 'app-main';
window.app.appendChild(window.main);

var navigation = new NavigationComponent(window.header);

Router.flush();
Router.config({ mode: 'history' });

Router.add(/dashboard/, () => {
    console.log('dashboard');
})
.add(/contact/, () => {
    console.log('contact');
    new ContactView(window.main);
})
.add(/register/, () => {
    console.log('register');
    new RegisterView(window.main);
})
.add(/login/, () => {
    console.log('login');
    new LoginView(window.main);
})
.add(function () {
    console.log('default');
    new HomeView(window.main);
})
.listen();

console.log('App started');
console.log(Api.get_base());

window.onload = function () {
    var path = window.location.pathname;
    var redir = path;
    if (window.location.search !== undefined) {
        redir += window.location.search;
    }
    Router.navigate(redir);
};