'use strict';

const worker = document.getElementById('worker');
const saveBtn = document.getElementById('save_btn');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const hobbi = document.getElementById('hobbie');
const checkbox = document.getElementById('checkbox');
const table = document.querySelector('table');
let selected = 'start';
let selectedValue;
let childsCheck;
let workers = localStorage.getItem('workers') ? JSON.parse(localStorage.getItem('workers')) : [];

class Worker {
    constructor() {
        this.hands = 2;
        this.legs = 2;
        this.head = 1;
    }

    goToWork() {
        console.log('Ходить на работу');
    }

    work() {
        console.log('Работать');
    }

    goToHome() {
        console.log('Возвращаться домой');
    }
}

class Driver extends Worker {
    constructor(name, age, job) {
        super();
        this.name = name;
        this.age = age;
        this._childs = '';
        this.job = job;
    }

    get childs() {
        return this._childs;
    }

    set childs(str) {
        this._childs = str;
    }

}

class Locksmith extends Worker {
    constructor(name, age, job) {
        super();
        this.name = name;
        this.age = age;
        this._childs = '';
        this.job = job;
    }

    get childs() {
        return this._childs;
    }

    set childs(str) {
        this._childs = str;
    }
}

worker.addEventListener('change', (event) => {
    switch (event.target.value) {
        case 'driver':
            selected = 'driver';
            selectedValue = 'Водитель';
            break;
        case 'locksmith':
            selected = 'locksmith';
            selectedValue = 'Слесарь';
            break;
        case 'start':
            selected = 'start';
            break;
    }
});

saveBtn.addEventListener('click', () => {
    switch (selected) {
        case 'driver':
            addWorker(selected);
            break;
        case 'locksmith':
            addWorker(selected);
            break;
        case 'start':
            alert('Выберите профессию');
            break;
    }
});

const addWorker = (newWorker) => {
    if (nameInput.value.trim() == '' || ageInput.value.trim() == '') {
        alert('Нельзя добавить пустоту');
        nameInput.value = '';
        ageInput.value = '';
    } else {
        if (checkbox.checked) {
            childsCheck = 'Есть';
        } else {
            childsCheck = 'Нет';
        }

        switch (newWorker) {
            case 'driver':
                const driver = new Driver(nameInput.value, ageInput.value, selectedValue);
                driver.childs = childsCheck;
                workers.push(driver);
                break;
            case 'locksmith':
                const locksmith = new Locksmith(nameInput.value, ageInput.value, selectedValue);
                locksmith.childs = childsCheck;
                workers.push(locksmith);
                break;
        }
        nameInput.value = '';
        ageInput.value = '';
        render();
    }
};

const render = function () {
    table.innerHTML = `
            <caption><h3>Информация о рабочих</h3></caption>
        <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Профессия</th>
            <th>Дети</th>
            <th>Удалить</th>
        </tr>`;

    localStorage.setItem('workers', JSON.stringify(workers));

    workers.forEach(function (item, index) {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.age}</td>
            <td>${item.job}</td>
            <td>${item._childs}</td>
            <td><button class="tr_remove">Удалить</button></td>`;

        table.append(tr);

        tr.querySelector('.tr_remove').addEventListener('click', function () {
            workers.splice(index, 1);
            render();
        });
    });
};

render();
