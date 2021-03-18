"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Popup {
  createElements() {
    this.elem.block = document.createElement('div');
    this.elem.inner = document.createElement('div');
    this.elem.wrap = document.createElement('div');
    this.elem.imgWrap = document.createElement('div');
    this.elem.arrowPrev = document.createElement('div');
    this.elem.arrowNext = document.createElement('div');
    this.elem.img = document.createElement('div');
    this.elem.bg = document.createElement('div');

    this.elem.block.className = this.nameBlock;
    this.elem.inner.className = this.nameInner;
    this.elem.wrap.className = this.nameWrap;
    this.elem.imgWrap.className = this.imgWrap;

    this.elem.arrowPrev.className = this.arrow + ' --prev';
    this.elem.arrowNext.className = this.arrow + ' --next';

    var svgIcon = this.elem.arrowNext.innerHTML = '';
    this.elem.arrowPrev.innerHTML = svgIcon;
    this.elem.arrowNext.innerHTML = svgIcon;
    this.elem.img.className = this.nameImg;

    this.elem.bg.className = this.nameBg + ' ' + this.classBtnClose;

    body.append(this.elem.block);
    this.elem.block.append(this.elem.inner);
    this.elem.inner.append(this.elem.wrap);
    this.elem.inner.append(this.elem.imgWrap);
    this.elem.imgWrap.append(this.elem.arrowPrev);
    this.elem.imgWrap.append(this.elem.img);
    this.elem.imgWrap.append(this.elem.arrowNext);
    this.elem.block.append(this.elem.bg);
  }

  close() {
    setTimeout(() => {
      var element = this.elem.wrap.firstChild;

      if (element) {
        element.classList.add('--hidden');
        element.classList.remove('--show');
      }

      this.elem.img.innerHTML = '';
    }, 300);
    this.elem.block.classList.remove(this.classShow);
    this.elem.wrap.classList.remove('--show');
		this.elem.imgWrap.classList.remove('--show');
    wrap.classList.remove('overflow-disable');
  }

  open() {
    wrap.classList.add('overflow-disable');
    this.elem.block.classList.add(this.classShow);
  }

  setImg(group, element){
  	var img = this.elem.img.querySelector('img'),
  			src = element.getAttribute('href') ? element.getAttribute('href') : element.getAttribute('data-src');

  	img.src = src;

  	this.setButtonsImg(group, element);
  }
  setButtonsImg(group, item){
  	var currentIndex = this.groups[group].indexOf(item),
				prevElement = this.groups[group][currentIndex - 1],
				nextElement = this.groups[group][currentIndex + 1];

		if (prevElement) {
			this.elem.arrowPrev.setAttribute('data-src', [currentIndex - 1]);
			this.elem.arrowPrev.setAttribute('data-group', group);
			this.elem.arrowPrev.classList.add('--show');
		} else {
			this.elem.arrowPrev.classList.remove('--show');
			this.elem.arrowPrev.removeAttribute('data-img')
		}
		if (nextElement) {
			this.elem.arrowNext.setAttribute('data-src', [currentIndex + 1]);
			this.elem.arrowNext.setAttribute('data-group', group);
			this.elem.arrowNext.classList.add('--show');
		} else {
			this.elem.arrowNext.classList.remove('--show');
			this.elem.arrowNext.removeAttribute('data-img')
		}
  }
  arrowClick(arrow) {
  	var index = arrow.getAttribute('data-src'),
  			group = arrow.getAttribute('data-group'),
  			element = this.groups[group][index];

  	this.setImg(group, element);
  }

  constructor() {
    _defineProperty(this, "nameBlock", 'popup');

    _defineProperty(this, "nameInner", this.nameBlock + '__inner');

    _defineProperty(this, "nameWrap", this.nameBlock + '__wrap');

    _defineProperty(this, "imgWrap", this.nameBlock + '__img-wrap');

    _defineProperty(this, "arrow", this.nameBlock + '__arrow');

    _defineProperty(this, "nameImg", this.nameBlock + '__img');

    _defineProperty(this, "nameBg", this.nameBlock + '__bg');

    _defineProperty(this, "classShow", '--show');

    _defineProperty(this, "classBtnOpen", 'popup-btn-open');

    _defineProperty(this, "classBtnClose", 'popup-btn-close');

    _defineProperty(this, "elem", {
      block: null,
      inner: null,
      wrap: null,
      img: null,
      bg: null,
      arrowPrev: null,
      arrowNext: null
    });

    _defineProperty(this, "groups", {});

    this.createElements();
    var closeBtns = document.querySelectorAll('.' + this.classBtnClose);

    for (let btn of closeBtns) {
      btn.addEventListener('click', () => {
        this.close();
      });
    }

    var items = document.querySelectorAll('[data-popup]');
    items.forEach(item => {
    	var group = item.getAttribute('data-popup')
    	if (group) {
    		if (!this.groups[group]) {
    			this.groups[group] = [];
    		}
    		this.groups[group].push(item);
    	}
      item.addEventListener('click', e => {
        e.preventDefault();
        var src = item.getAttribute('data-src'),
            href = item.getAttribute('href'),
            popupId = src ? src : href,
            element = document.getElementById(popupId.replace('#', ''));

        if (element) {
          element.classList.remove('--hidden');
          element.classList.add('--show');
          this.elem.wrap.classList.add('--show');
          this.elem.wrap.prepend(element);
          this.open();
        } else if (get_extension(popupId) == 'jpg' || get_extension(popupId) == 'jpeg' || get_extension(popupId) == 'png') {
        	if (this.groups[group]) {
        		this.setButtonsImg(group, item);
        	}
        	
          var img = document.createElement('img');
          img.src = popupId;
          img.className = '--hidden';
          this.elem.imgWrap.classList.add('--show');
          this.elem.img.append(img);
          setTimeout(() => {
            img.classList.remove('--hidden');
          }, 300);
          this.open();
        }
      });
    });

    this.elem.arrowPrev.addEventListener('click', ()=>{
    	this.arrowClick(this.elem.arrowPrev);
    });

    this.elem.arrowNext.addEventListener('click', ()=>{
    	this.arrowClick(this.elem.arrowNext);
    });
  }

}

new Popup();