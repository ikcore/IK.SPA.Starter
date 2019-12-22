export default class Api {

    static base = '/api';
    static token = null;

    static get_base() {
        return this.base;
    }
    static set_base (args) {
        this.base = args.replace(/\/$/, "");
    };
    static set_auth_token (token) {
        this.token = token;
    }
    static get_token_data () {
        let token = this.token;
        if (token !== null) {
            let base64Url = token.split('.')[1];
            let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        }
        return {};
    }
    static request (args) {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open(args.method, args.url);
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    var data = JSON.parse(this.responseText);
                    resolve(data);
                } else {
                    var response = {};
                    try {
                        response = JSON.parse(this.responseText);
                    } catch (err) { console.log(err); }

                    reject({
                        status: this.status,
                        statusText: xhr.statusText,
                        responseText: this.responseText,
                        data: response
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            if (args.headers) {
                Object.keys(args.headers).forEach(function (key) {
                    xhr.setRequestHeader(key, args.headers[key]);
                });
            }
            if (this.token !== undefined && this.token !== null) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + this.token);
            }
            if (args.hasOwnProperty('download_progress')) {
                xhr.onprogress = args.download_progress;
            }
            if (args.hasOwnProperty('upload_progress')) {
                xhr.upload.addEventListener('progress', args.upload_progress, false);
            }

            let params = args.params;
            if (params && typeof params === 'object') {
                params = Object.keys(params).map(function (key) {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
                }).join('&');
            }
            if (args.method === 'POST' || args.method === 'PUT') {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(args.data));
            } else {
                xhr.send(params);
            }
        }.bind(this));
    }
    static validate_email (email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}