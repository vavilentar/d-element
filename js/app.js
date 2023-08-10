const messageFormCross = document.getElementById('form__close'),
	formOverlay = document.getElementById('form__overlay'),
	popupButton = document.getElementById('popup__open'),
	messageForm = document.getElementById('popup'),
	formInputs = document.querySelectorAll('.message__input'),
	submitButton = document.getElementById('submit_btn'),
	successPopup = document.querySelector('.success');

let formData = [];

submitButton.addEventListener('click', (e) => {
	formData = [];
	e.preventDefault();
	validationCheck();
});

formInputs.forEach(item => {
	item.addEventListener('change', () => {
		item.classList.remove('validation_failed');
	});
});

messageFormCross.addEventListener('click', () => {
	closeModal();
});

popupButton.addEventListener('click', () => {
	openModal();
});

formOverlay.addEventListener('click', () => {
	closeModal();
});

function cleanInputs() {
	formInputs.forEach(item => {
		item.value = '';
		item.classList.remove('validation_failed');
	});
}

function emailValidation(data) {
	const splittedEmail = data[1].split('');
	for (let i = 0; i < splittedEmail.length; i++) {
		switch (splittedEmail[i]) {
			case "@":
				return true;
			default:
				break;
		}
	}
	return false;
}

function dataOdject(name, email, message) {
	const data = {
		userName: name,
		userEmail: email,
		userMessage: message,
	};
	return data;
}

function validationCheck() {
	for (let i = 0; i < formInputs.length; i++) {
		if (formInputs[i].value === '') {
			formInputs[i].classList.add('validation_failed');
		} else {
			formData.push(formInputs[i].value);
		}
	}
	if (formData.length == 3) {
		if (emailValidation(formData)) {
			successPopup.classList.remove('form__closed');
			const stringifyData =  JSON.stringify(dataOdject(formData[0], formData[1], formData[2]));
			closeModal();
			postData('https://my-json-server.typicode.com/vavilentar/jsondb', stringifyData);
			setTimeout(closeSuccessPopup, 1000);
		} else {
			formInputs[1].classList.add('validation_failed');
		}
	}
}

function closeSuccessPopup() {
	successPopup.classList.add('form__closed');
}

function openModal() {
	formOverlay.classList.remove('form__closed');
	messageForm.classList.remove('form__closed');
	document.body.style = 'overflow: hidden';
}

function closeModal() {
	formOverlay.classList.add('form__closed');
	messageForm.classList.add('form__closed');
	document.body.style = 'overflow: auto';
	cleanInputs();
}

async function postData (url, data) {
	let result = await fetch(url, {
		method: 'POST',
		body: data
	});
	return await result.text();
}