import Router from './utils/router'
import Auth from './utils/auth'
import Api from './utils/api'
import NavigationComponent from './components/navigation'

import HomeView from './views/home'
import ContactView from './views/contact'

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
.add(function () {
    console.log('default');
    new HomeView(window.main);
})
.listen();

console.log('App started');
console.log(Api.get_base());