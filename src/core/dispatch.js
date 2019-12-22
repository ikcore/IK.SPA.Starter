export default class Dispatch
{
    static subscribers = [];

    static subscribe (func) {
        this.subscribers.push(func);
    }
    static broadcast (evt) {
        this.subscribers.forEach( subscriber => {
            subscriber(evt);
        });
    }
}