export default class Router { 

    static routes = [];
    static mode = null;
    static root = '/';
    static first = true;

    constructor() {
        this.routes = [];
        this.mode = null;
        this.root = '/';
        this.first = true;
    }
    static config (options) {
        this.mode = options && options.mode && options.mode === 'history'
            && !!(history.pushState) ? 'history' : 'hash';
        this.root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/';
        return this;
    }
    static getFragment () {
        let fragment = '';
        if (this.mode === 'history') {
            fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
            fragment = fragment.replace(/\?(.*)$/, '');
            fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
        } else {
            let match = window.location.href.match(/#(.*)$/);
            fragment = match ? match[1] : '';
        }
        return this.clearSlashes(fragment);
    }
    static clearSlashes (path) {
        return path.toString()
            .replace(/\$/, '')
            .replace(/^\//, '');
    }
    static add (re, handler) {
        if (typeof re === 'function') {
            handler = re;
            re = '';
        }
        this.routes.push({ re: re, handler: handler });
        return this;
    }
    static remove (param) {
        for (let i = 0, r; i < this.routes.length, r = this.routes[i]; i++) {
            if (r.handler === param || r.re.toString() === param.toString()) {
                this.routes.splice(i, 1);
                return this;
            }
        }
        return this;
    }
    static flush () {
        this.routes = [];
        this.mode = null;
        this.root = '/';
        return this;
    }
    static check (f) {
        var fragment = f || this.getFragment();
        for (let i = 0; i < this.routes.length; i++) {
            let match = fragment.match(this.routes[i].re);
            if (match) {
                match.shift();
                this.routes[i].handler.apply({}, match);
                return this;
            }
        }
        return this;
    }
    static listen () {
        let self = this;
        let current = '/';
        if (this.first) {
            this.first = false;
        } else {
            current = self.getFragment();
        }
        let fn = function () {
            if (current !== self.getFragment()) {
                current = self.getFragment();
                self.check(current);
            }
        };
        clearInterval(this.interval);
        this.interval = setInterval(fn, 20);
        return this;
    }
    static navigate (path, reset) {
        path = path ? path : '';

        if (reset !== undefined && reset) {
            current = '';
        }
        if (this.mode === 'history') {
            history.pushState(null, null, this.root + this.clearSlashes(path));
        } else {
            window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
        }
        return this;
    }
}