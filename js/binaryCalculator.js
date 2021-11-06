const res = document.getElementById('res')
const btn0 = document.getElementById('btn0')
const btn1 = document.getElementById('btn1')
const btnClr = document.getElementById('btnClr')
const btnEql = document.getElementById('btnEql')
const btnSum = document.getElementById('btnSum')
const btnSub = document.getElementById('btnSub')
const btnMul = document.getElementById('btnMul')
const btnDiv = document.getElementById('btnDiv')
let btns = [btn0, btn1, btnSum, btnSub, btnMul, btnDiv]
let reset = false

btns.forEach(btn => {
	btn.addEventListener('click', printInRes)
})

btnClr.addEventListener('click', clearRes)
btnEql.addEventListener('click', operateRes)

function clearRes() {
	res.innerText = ''
}

function printInRes() {
	const text = res.innerText
	const isSign = ["+", "-", "/", "*"].some(v => this.innerText.includes(v))
	const isThereASignAlready = ["+", "-", "/", "*"].some(v => text.includes(v))
	if (isSign) {
		if (!isThereASignAlready && text.length >= 1 && !reset) {
			reset ? res.innerText = this.innerText : res.innerText += this.innerText
			if(reset) reset = false
		}
	}else if (text.length <= 23) {
		reset ? res.innerText = this.innerText : res.innerText += this.innerText
		if(reset) reset = false
	}
}

function checkOperator(text) {
	if(text.includes('+')) return '+'
	if(text.includes('-')) return '-'
	if(text.includes('*')) return '*'
	if (text.includes('/')) return '/'
	
	return undefined
}

function fromBinaryToDecimal(binaryNumbers) {
	let first = binaryNumbers[0]
	let second = binaryNumbers[1]
	let convertedFirst = 0
	let convertedSecond = 0
	// First
	for (let i = 0; i < first.length; i++) {
		convertedFirst += 2**(first.length - i - 1) * first[i]
	}
	// First
	for (let i = 0; i < second.length; i++) {
		convertedSecond += 2**(second.length - i - 1) * second[i]
	}
	return [convertedFirst, convertedSecond]
}

function fromDecimalToBinary(decimalNumber) {
	let binary = ''
	while (decimalNumber > 0) {
		binary += decimalNumber % 2
		decimalNumber = Math.floor(decimalNumber / 2)
	}
	return binary.split('').reverse().join('')
}

function operateRes() {
	const text = res.innerText
	let operator = checkOperator(text)
	reset = true
	// Check if it is valid
	if (text.length < 1 && !operator) return 0 
	// Supose it is valid
	let binaryNumbers = text.split(operator)
	let numbers = fromBinaryToDecimal(binaryNumbers)
	
	let result = 0
	if (operator == '+') {
		result = numbers[0] + numbers[1]
	}
	if (operator == '-') {
		result = numbers[0] - numbers[1]
	}
	if (operator == '*') {
		result = numbers[0] * numbers[1]
	}
	if (operator == '/') {
		result = numbers[0] / numbers[1]
	}

	if (result === 0) {
		res.innerText = 0
	} else {
		res.innerText = fromDecimalToBinary(result)
	}
}
