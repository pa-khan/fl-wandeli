"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Check {
  removeRadios(name) {
    var radiosInputs = document.querySelectorAll('.' + this.elemName + ' input[name = "' + name + '"]');
    radiosInputs.forEach(radioInput => {
      var radio = radioInput.closest('.' + this.elemName);

      if (radio) {
        radio.classList.remove(this.classChecked);
        radioInput.removeAttribute('checked');
      }
    });
  }

  constructor(element) {
    _defineProperty(this, "elemName", 'check');

    _defineProperty(this, "classChecked", '--checked');

    var input = element.querySelector('input'),
        type = input.getAttribute('type'),
        isChecked = input.getAttribute('checked');

    if (isChecked) {
      element.classList.add(this.classChecked);
    }

    if (type == 'checkbox') {
      element.addEventListener('click', () => {
        if (!element.classList.contains(this.classChecked)) {
          element.classList.add(this.classChecked);
          input.setAttribute('checked', 'checked');
        } else {
          element.classList.remove(this.classChecked);
          input.removeAttribute('checked', 'checked');
        }
      });
    } else if (type == 'radio') {
      element.addEventListener('click', () => {
        var name = input.getAttribute('name');

        if (name && !element.classList.contains(this.classChecked)) {
          this.removeRadios(name);
          element.classList.add(this.classChecked);
          input.setAttribute('checked', 'checked');
        }
      });
    } else {
      return false;
    }
  }

}

var checks = document.querySelectorAll('.check');
checks.forEach(check => {
  new Check(check);
});