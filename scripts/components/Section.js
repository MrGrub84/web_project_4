export default class Section {
    constructor({ items, renderer }, classSelector) {
        this._classSelector = classSelector;
        this._container = document.querySelector(classSelector);
        this._items = items;
        this._renderer = renderer;
    }

    setItems() {
        this._items.forEach(item => {
            const element = this._renderer(item);
            this.addItem(element);
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }
}