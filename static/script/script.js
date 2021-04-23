let overlay = document.querySelector('.overlay');

document.querySelector('.widget__button').addEventListener('click', ev => {
	ev.preventDefault();
	overlay.classList.add('flex')
	document.querySelector('.widget').innerHTML = calc(
			calcData.name,
			calcData.startPrice,
			calcData.time,
			calcData.area,
			calcData.people
		)
})

function countCost() {
	let elem = document.querySelector('.sum')
	let sum = 0
	costs.forEach(item => sum += item)
	sum += calcData.startPrice
	elem.innerText = sum
}

function changeValue(where, to, cost, costclass, arrIndex) { // Gets value from 'where', and prints it in 'to'
	let value = document.querySelector('.' + where).value
	document.querySelector('.' + to).innerText = value
	costs[arrIndex] = parseInt(value) * cost
	let costelem = document.querySelector('.' + costclass)
	costelem.innerText = '+' + parseInt(value) * cost + ' руб.'
	countCost()
}

function changeSelectValue(where, costArray, to, arrIndex) {
	let value = document.querySelector('.' + where).value
	let costelem = document.querySelector('.' + to)
	costs[arrIndex] = costArray[value]
	costelem.innerText = '+' + costArray[value] + ' руб.'
	countCost()
}

function makeOrder() {
    let people = parseInt(document.querySelector('.people__amount').innerText)
    let time = parseInt(document.querySelector('.time__amount').innerText)
    let area = document.querySelector('.area__select').value
    location = `/make_order?text=Здравствуйте, хочу организовать событие "${calcData.name}". Количество человек: ${people}, количество часов: ${time}, площадка: ${area}`
}