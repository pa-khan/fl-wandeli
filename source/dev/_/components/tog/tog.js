class Tog {
	constructor(){
		var togs = document.querySelectorAll('.tog');
		togs.forEach((tog)=>{
			var head = tog.querySelector('.tog-head'),
					body = tog.querySelector('.tog-body');

			head.addEventListener('click', ()=>{
				if (!tog.classList.contains('--show')){
					tog.classList.add('--show');
					body.style.maxHeight = body.scrollHeight + 'px';
				} else{
					tog.classList.remove('--show');
					body.style.maxHeight = null;
				}
			})
		})
	}
}

new Tog();