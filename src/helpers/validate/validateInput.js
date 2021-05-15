// Libraries
import moment from "moment";
import "moment/locale/pt-br";

export const helpers = {


	scrollTo: function (scrollingElement, to, duration) {
		if (duration <= 0) return;
		var difference = to - scrollingElement.scrollTop;
		var perTick = difference / duration * 10;

		setTimeout(() => {
			scrollingElement.scrollTop = scrollingElement.scrollTop + perTick;
			if (scrollingElement.scrollTop === to) return;
			this.scrollTo(scrollingElement, to, duration - 10);
		}, 10);
	},

	formatDateToView: function(dateTarget) {
		return moment(dateTarget).format("DD/MM/YYYY");
	},
	

	formatDate: function (dateTarget, format) {
		if (dateTarget === null || dateTarget === undefined || dateTarget === "") return;
		return moment(dateTarget, format).format();
	},

	formatDateToRequest: function (dateTarget) {
		return this.formatDate(dateTarget, "YYYY-MM-DD");
	},

	getDate: function () {
		moment.locale("pt-br")
		return moment(new Date(), "YYYY-MM-DDT00:00:00.000Z").format();
	},

	getDateToRequest: function () {
		this.formatDate(new Date(), "YYYY-MM-DD");
	},

	retrieveParentProperty(dataTarget, propUsed, valueUsed, propTarget) {
		if (dataTarget === undefined || dataTarget === null || propUsed === undefined || propUsed === null ||
			propTarget === undefined || propTarget === null) return;
		let contentTarget;
		dataTarget.forEach(actualData => {
			if (actualData[propUsed] === valueUsed) contentTarget = actualData[propTarget];
		});
		return contentTarget;
	},

	insertParenthesisInPhone: function (phone) {
		if (phone === undefined || phone === null || phone === '') return phone;
		let phoneMapped = this.insertInString(phone, 0, "(");
		phoneMapped = this.insertInString(phoneMapped, 3, ")");
		phoneMapped = this.insertInString(phoneMapped, 4, " ");
		return phoneMapped
	},

	dateCompare: function (value) {
    // current Date
    let currentDate = new Date();
    let currentDay = String(currentDate.getDate()).padStart(2, '0');
    let currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    let currentYear = currentDate.getFullYear();
    // inputed date
    let validation = value.split("/");
    let day = validation[0];
    let month = validation[1];
    let year = validation[2];
    currentDate = currentYear + '-' + currentMonth + '-' + currentDay;
    validation = year + '-' + month + '-' + day;
    value = validation < currentDate;
    return value;
  },

	validateCNPJ: function (cnpj) {
		if (cnpj === undefined || cnpj === null) return;
		let tamanho, numeros, soma, i, pos, resultado, digitos = 0;
		cnpj = cnpj.replace(/[^\d]+/g, '');
		if (cnpj === '') return false;
		if (cnpj.length !== 14) return false;
		// Elimina CNPJs invalidos conhecidos
		if (cnpj === "00000000000000" ||
			cnpj === "11111111111111" ||
			cnpj === "22222222222222" ||
			cnpj === "33333333333333" ||
			cnpj === "44444444444444" ||
			cnpj === "55555555555555" ||
			cnpj === "66666666666666" ||
			cnpj === "77777777777777" ||
			cnpj === "88888888888888" ||
			cnpj === "99999999999999")
			return false;

		// Valida DVs
		tamanho = cnpj.length - 2
		numeros = cnpj.substring(0, tamanho);
		digitos = cnpj.substring(tamanho);
		soma = 0;
		pos = tamanho - 7;
		for (i = tamanho; i >= 1; i--) {
			soma += numeros.charAt(tamanho - i) * pos--;
			if (pos < 2) pos = 9;
		}
		resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
		if (resultado != digitos.charAt(0)) return false;

		tamanho = tamanho + 1;
		numeros = cnpj.substring(0, tamanho);
		soma = 0;
		pos = tamanho - 7;
		for (i = tamanho; i >= 1; i--) {
			soma += numeros.charAt(tamanho - i) * pos--;
			if (pos < 2) pos = 9;
		}
		resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
		if (resultado != digitos.charAt(1)) return false;
		return true;
	},

	validateFullName: function (value) {
		let validation = (/[a-zA-Z]{2,}\s+[a-zA-Z]/).test(value)
		return validation
	},

	validateCPF: function (cpf) {
		if (cpf === undefined || cpf === null) return false;
		cpf = cpf.replace(/[^\d]+/g, '');
		if (cpf === "") return false;
		if (cpf.length !== 11 ||
			cpf === "00000000000" ||
			cpf === "11111111111" ||
			cpf === "22222222222" ||
			cpf === "33333333333" ||
			cpf === "44444444444" ||
			cpf === "55555555555" ||
			cpf === "66666666666" ||
			cpf === "77777777777" ||
			cpf === "88888888888" ||
			cpf === "99999999999")
			return false;
		let add = 0, i, rev;
		for (i = 0; i < 9; i++)
			add += parseInt(cpf.charAt(i)) * (10 - i);
		rev = 11 - (add % 11);
		if (rev === 10 || rev === 11)
			rev = 0;
		if (rev !== parseInt(cpf.charAt(9)))
			return false;
		add = 0;
		for (i = 0; i < 10; i++)
			add += parseInt(cpf.charAt(i)) * (11 - i);
		rev = 11 - (add % 11);
		if (rev === 10 || rev === 11)
			rev = 0;
		if (rev !== parseInt(cpf.charAt(10)))
			return false;
		return true;
	},

	validateEmail: function (emailTarget) {
		if (emailTarget === undefined || emailTarget === null) return false;
		/* eslint-disable no-useless-escape */
		const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return regex.test(String(emailTarget).toLowerCase());
	},

	validatePassword: function (passwordTarget) {
		if(passwordTarget === undefined || passwordTarget === null) return false;
		
		let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])(?:([0-9a-zA-Z$*&@#])){8,}$/;
		return regex.test(passwordTarget)
	},

	validatePhone: function (phoneTarget) {
		if (phoneTarget === undefined || phoneTarget === null) return false;
		const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/gi;
		const equalNumbersRegex = /^\D*(\d)(?:\D*|\1)*$/;
		const justNumbers = phoneTarget.replace(/\D/g, "");
		const phoneIsValid = phoneRegex.test(String(phoneTarget).toLowerCase());

		const isEqual = equalNumbersRegex.test(String(justNumbers).toLowerCase());
		
		const validsDDDs = ["11", "12", "13", "14", "15", "16", "17", "18", "19", "21", "22", "24", "27", "28", "31", "32", "33",
		"34", "35", "37", "38", "41", "42", "43", "44", "45", "46", "47", "48", "49", "51", "53", "54", "55", "61", "62", "63", "64",
		"65", "66", "67", "68", "69", "71", "73", "74", "75", "77", "79", "81", "82", "83", "84", "85", "86", "87", "88", "89", "91",
		"92", "93", "94", "95", "96", "97", "98", "99"];
		const dddValue = phoneTarget.substr(1,2);
		const dddIsValid = validsDDDs.includes(dddValue);
		return phoneIsValid && dddIsValid && !isEqual;
	},

	phoneMask: function (value) {
		if (value) {
			return value
				.replace(/\D/g, "")
				.substring(0, 11)
				.replace(/^(\d{2})(\d)/g, "($1) $2")
				.replace(/(\d)(\d{4})$/, "$1-$2");
		}
	},

	getModule: function(modulesReducer, name) {
		if(!modulesReducer.modulesList || !modulesReducer.modulesList.modules) return
		const parameters = modulesReducer.modulesList.modules
		const hasModule = parameters.find( module => (module.module === name))
		return hasModule ? hasModule.enabled : false
	},

	nameValidation: function(value) {
    value = value.replace(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+/g, "").replace(/\s+/g, ' ')
    return value;
  }

}
