"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Select {
  constructor(element) {
    _defineProperty(this, "classWrap", 'select__wrap');

    _defineProperty(this, "classArea", 'select__area');

    _defineProperty(this, "classTitle", 'select__title');

    _defineProperty(this, "classIcon", 'select__icon');

    _defineProperty(this, "classDrop", 'select__drop');

    _defineProperty(this, "classList", 'select__list');

    _defineProperty(this, "classItem", 'select__item');

    _defineProperty(this, "classSelected", '--selected');

    _defineProperty(this, "classOpen", '--open');

    var wrap = document.createElement('div'),
        area = document.createElement('div'),
        title = document.createElement('div'),
        icon = document.createElement('div'),
        drop = document.createElement('div'),
        list = document.createElement('div'),
        options = element.querySelectorAll('option'),
        placeholder = element.getAttribute('data-placeholder'),
        current = placeholder ? null : options[0];
    wrap.className = this.classWrap;
    area.className = this.classArea;
    title.className = this.classTitle;
    icon.className = this.classIcon;
    drop.className = this.classDrop;
    list.className = this.classList;
    element.append(wrap);
    wrap.append(area);
    area.append(title);
    area.append(icon);
    wrap.append(drop);
    drop.append(list);

    icon.innerHTML = '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.1027 4.69909C14.1958 4.60606 14.2423 4.48978 14.2423 4.36188C14.2423 4.23397 14.1958 4.11769 14.1027 4.02467C13.9167 3.83862 13.6144 3.83862 13.4283 4.02467L7.49809 9.9549L1.56786 4.02467C1.38181 3.83862 1.07949 3.83862 0.893441 4.02467C0.707395 4.21071 0.707395 4.51304 0.893441 4.69909L7.16088 10.9665C7.34693 11.1526 7.64925 11.1526 7.8353 10.9665L14.1027 4.69909Z" fill="#FFB800"/></svg>';
    options.forEach(option => {
      var item = document.createElement('div'),
          text = option.innerText,
          value = option.getAttribute('value'),
          selected = option.getAttribute('selected'),
          group = option.getAttribute('data-group');
      item.className = this.classItem;
      list.append(item);
      item.innerText = text;

      if (value) {
        item.setAttribute('data-value', value);
      }

      if (selected) {
        current = option;
      }

      if (group) {
        item.setAttribute('data-group', group);
      }
    });

    if (placeholder) {
      title.innerText = placeholder;
    } else {
      if (element.classList.contains('--title-value')) {
        title.innerText = current.getAttribute('value');
      } else {
        title.innerText = current.innerText;
      }
    }

    if (current) {
      current.setAttribute('selected', 'selected');
      var currentItem = list.querySelector('.' + this.classItem + '[data-value = "' + current.getAttribute('value') + '"]');
      currentItem.classList.add(this.classSelected);
    }

    area.addEventListener('click', event => {
      element.classList.toggle(this.classOpen);
    });
    var items = element.querySelectorAll('.' + this.classItem);
    items.forEach(item => {
      item.addEventListener('click', () => {
        if (!item.classList.contains(this.classSelected)) {
          var value = item.getAttribute('data-value');

          if (element.classList.contains('--title-value')) {
            title.innerText = value;
          } else {
            title.innerText = item.innerText;
          }

          options.forEach(option => {
            option.removeAttribute('selected');
          });
          items.forEach(itemsItem => {
            itemsItem.classList.remove(this.classSelected);
          });
          var option = element.querySelector('option[value = "' + value + '"]');
          option.setAttribute('selected', 'selected');
          item.classList.add(this.classSelected);
          element.classList.remove(this.classOpen);
        }
      });
    });

    if (element.getAttribute('data-input')) {
      var inputName = element.getAttribute('data-input-name'),
          inputMods = element.getAttribute('data-input-mods'),
          inputPlaceholder = element.getAttribute('data-input-placeholder');
      var input = document.createElement('div');
      input.classList = 'select__input input';
      var inputWrap = document.createElement('div');
      inputWrap.classList = 'input__wrap';
      var inputArea = document.createElement('input');
      inputArea.classList = 'input__area';

      if (inputMods) {
        input.classList += '' + inputMods;
      }

      if (inputName) {
        inputArea.name += inputName;
      }

      if (inputPlaceholder) {
        inputArea.placeholder = inputPlaceholder;
      }

      drop.prepend(input);
      input.append(inputWrap);
      inputWrap.append(inputArea);
      inputArea.addEventListener('keyup', () => {
        var value = inputArea.value;
        items.forEach(item => {
          var text = item.innerText;

          if (text.indexOf(value) < 0) {
            item.classList.add('--hide');
          } else {
            item.classList.remove('--hide');
          }
        });
      });
    }
  }

}

var selects = document.querySelectorAll('.select');
selects.forEach(select => {
  new Select(select);
});