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

	formatDate: function (dateTarget, format) {
		if (dateTarget === null || dateTarget === undefined || dateTarget === "") return;
		moment(dateTarget).format(format);
	},

	formatDateToRequest: function (dateTarget) {
		this.formatDate(dateTarget, "YYYY-MM-DD");
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
