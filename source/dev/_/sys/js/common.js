var html = document.querySelector('html'),
		body = document.querySelector('body'),
		wrap = document.querySelector('.wrap');

var mailPattern = /^[0-9a-z_-]+@[0-9a-z_-]+.[a-z]{2,5}$/i;


document.addEventListener('DOMContentLoaded', ()=>{
	let $gallery = document.querySelectorAll('.gallery__slider');

	if ($gallery) {
		$gallery.forEach(($galleryItem)=>{
			let $slider = $galleryItem.querySelector('.gallery__wrap'),
					$arrowsPrev = $galleryItem.querySelector('.gallery__arrow.arrow.--prev'),
					$arrowsNext = $galleryItem.querySelector('.gallery__arrow.arrow.--next');

			new Swiper($slider, {
				loop: true,
				slidesPerView: 3,
				spaceBetween: 20,
				navigation: {
					nextEl: $arrowsNext,
					prevEl: $arrowsPrev,
				},
			});
		});
	}

	
	let $toggleLinks = document.querySelectorAll('.toggle-modal');

	if ($toggleLinks) {
		$toggleLinks.forEach(($toggleLink)=>{
			$toggleLink.addEventListener('click', (event)=>{
				event.preventDefault();

				let attrModal = $toggleLink.getAttribute('data-popup-toggle');

				$.fancybox.close();
				$.fancybox.open({
					src: attrModal,
					type: 'inline'
				});
			});
		});
	}


	function Auth(){
		let $auth = document.querySelector('.auth');

		if ($auth) {
			let $items  = $auth.querySelectorAll('.auth__item'),
					$timer  = $auth.querySelector('.auth__timer'),
					$timerValue  = $auth.querySelector('.auth__timer var'),
					$resend = $auth.querySelector('.auth__resend'),
					$resendLink = $auth.querySelector('.auth__resend span'),
					interval,
					currentDate,
					endDate;

			$items[0].classList.add('--current');

			$items.forEach(($item)=> {
				let $btn = $item.querySelector('.auth__btn');
				$btn.addEventListener('click', ()=>{
					if ($btn.classList.contains('--next')) {
						let errors = 0;
						let $input = $item.querySelector('.input.--phone');

						if ($input.querySelector('.input__area').value.length != 13) {
							$input.classList.add('--error');
							errors++;
						} else {
							$input.classList.remove('--error');
						}

						if (grecaptcha.getResponse().length < 1) {
							errors++;
						}

						console.log(errors)

						if (errors == 0) {
							$item.classList.remove('--current');
							$item.nextSibling.classList.add('--current');

							sendSMS();
						}

					}
				});

				$resendLink.addEventListener('click', ()=>{
					if (endDate > 0) {
						sendSMS();
					} 
				});

				function sendSMS() {
					endDate = new Date(Date.now() + (60 * 3 * 1000));

					interval = setInterval(()=>{
						currentDate = new Date(Date.now());

						let difference = new Date(endDate - currentDate);
						if (difference <= 0) {							
							clearInterval(interval);
							$timer.classList.remove('--show');
							$resend.classList.add('--show');
							endDate = 0;

						} else {
							let minutes = difference.getMinutes(),
									seconds = difference.getSeconds();
							$timerValue.textContent = `${minutes < 10 ? '0' + minutes : minutes }:${seconds < 10 ? '0' + seconds : seconds}`
						}
					}, 1000);

					$timer.classList.add('--show');
					$resend.classList.remove('--show');


				}
			});
		}
	}
	
	new Auth();


	let $products = document.querySelectorAll('.product');

	if ($products) {
		$products.forEach(($product)=>{
			let imgs = {
				only: {
					$wrap: $product.querySelector('.imgs__only-wrap'),
					$list: $product.querySelector('.imgs__only-list')
				},
				thumbs: {
					$wrap: $product.querySelector('.imgs__thumbs-wrap'),
					$list: $product.querySelector('.imgs__thumbs-list'),
					$arrowPrev: $product.querySelector('.imgs__thumbs-arrow.--prev'),
					$arrowNext: $product.querySelector('.imgs__thumbs-arrow.--next')
				}
			}

			imgs.thumbs.swiper = new Swiper(imgs.thumbs.$wrap, {
				loop: true,
				slidesPerView: 3,
				spaceBetween: 17,
				navigation: {
					prevEl: imgs.thumbs.$arrowPrev,
					nextEl: imgs.thumbs.$arrowNext,
				},

			});

			imgs.only.swiper = new Swiper(imgs.only.$wrap, {
				loop: true,
				watchSlidesVisibility: true,
				watchSlidesProgress: true,
				thumbs: {
					swiper: imgs.thumbs.swiper,
				},
			});

			
		});
	}

	let $mapArea = document.querySelector('.map__area');

	if ($mapArea) {
		ymaps.ready(function () {
			let mapLng = $mapArea.getAttribute('data-lng'),
					mapLnt = $mapArea.getAttribute('data-lnt');

			let myMap = new ymaps.Map($mapArea, {
				center: [mapLng, mapLnt],
				zoom: 16,
				controls: []
			});

			myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, {
				iconLayout: 'default#image',
			});
			
			myMap.geoObjects.add(myPlacemark);

			myMap.behaviors.disable('scrollZoom');

		});

		
	}

});