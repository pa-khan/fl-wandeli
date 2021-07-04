let $inputs = document.querySelectorAll('.input');

if ($inputs) {
	$inputs.forEach(($input)=>{
		let $area = $input.querySelector('.input__area');

		$area.addEventListener('focusin', ()=>{
			$input.classList.add('--focus');
			$input.classList.remove('--error');
		});

		$area.addEventListener('focusout', ()=>{
			$input.classList.remove('--focus');
		});

		if ($input.classList.contains('--phone')) {
			$($area).mask('000 000 00 00');
		}

		if ($input.classList.contains('--code')) {
			$($area).mask('0000');
		}

		if ($input.classList.contains('--date')) {
			$($area).mask('A0.B0.CD00', {
				'translation': {
					'A': {
						pattern: /[0-3]/
					},
					'B': {
						pattern: /[0-1]/
					},
					'C': {
						pattern: /[1-2]/
					},
					'D': {
						pattern: /[0,9]/
					}

				}
			});

			let $icon = $input.querySelector('.input__icon');

			$icon.addEventListener('click', ()=>{
				$input.classList.toggle('--show-calendar')
			});

			let $date = $(document.querySelectorAll('.input__date'));

			$($area).datepicker();		
		}
	});
}