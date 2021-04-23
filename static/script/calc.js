function calc(name, startPrice, time, area, people) { // time - Цена за количество часов(в виде обьекта), area - Цена за площадку проведения(в виде обьекта), people - Цена за одного человека
	let text = `<div class="widget__header"><i class="fa fa-times close__button" onclick="overlay.classList.remove('flex')"></i><h2 class="name">${name}</h2></div><div class="widget__content">`
	if (people) {
		text += `<div class="head"><div class="left"><h3>Количество человек на мероприятии: <span class="people__amount">0</span></h3></div><div class="right people__cost">+0 руб.</div></div><input type="range" min="${people.min}" max="${people.max}" class="range people" oninput="changeValue('people', 'people__amount', ${people.cost}, 'people__cost', 0)">`
	}
	if (time) {
		text += `<div class="head"><div class="left"><h3>Часов: <span class="time__amount">0</span></h3></div><div class="right hour__cost">+0 руб.</div></div><input type="range" min="${time.min}" max="${time.max}" class="range time" oninput="changeValue('time', 'time__amount', ${time.cost}, 'hour__cost', 1)">`
	}
	if (area) {
		text += '<div class="head"><div class="left"><h3>Площадка для проведения: </h3></div><div class="right area__price">+0 руб.</div></div>'
		text += `<select name="select" class="area__select" oninput='changeSelectValue("area__select", ${JSON.stringify(calcData.area)}, "area__price", 2)'><option disabled selected value hidden></option>`
		Object.keys(calcData.area).forEach(item => {
			text += `<option value="${item}">${item}</option>`
		})
		text += '</select><button onclick="makeOrder()" class="order__button">Перейти к оформлению заказа</button><h2 class="fullcost">Примерная стоимость: <span class="sum">0</span> рублей</h2></div>'
	}
	return text
}