import React, { Component } from 'react'

export default class CardForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }
    //откправка формы
    submitHandle = (e) => {
        e.preventDefault();
        e.persist();

        let inputs = e.target.elements;

        this.setState({
            id: inputs.id.value,
            height: inputs['height'].value,
            weight: inputs['weight'].value,
            bloodGroup: inputs['blood-group'].value,
            rh: inputs['rh'].value,
            publicationDate: inputs['date'].value
        }, sendCard);

        function sendCard() {
            //проверка на заполненные поля
            if (!this.state.id || !this.state.height || !this.state.weight || !this.state.bloodGroup || !this.state.rh || !this.state.publicationDate) {
                let alrt = document.querySelector('.new-card .alert');
                alrt.classList.remove('hidden');
                setTimeout(() => { alrt.classList.add('hidden'); }, 3000);
            } else {
                fetch('http://localhost:4000/api/patient', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(this.state)
                })
                    .then(res => res.json())
                    .then(result => {
                        //обновление таблицы после отправки формы
                        this.props.updateTable();

                        e.target.reset();
                        e.target.classList.add('hidden');
                        document.querySelector('.view-form.hidden').classList.remove('hidden');
                        document.querySelector('.new-card').classList.remove('active');
                        this.setState({});

                        //уведомление о создании записи
                        let alrt = document.querySelector('#root .alert');
                        alrt.classList.remove('hidden');
                        setTimeout(() => { alrt.classList.add('hidden'); }, 3000);
                    })
            }
        }


    }

    render() {
        return (
            <form onSubmit={this.submitHandle} className='hidden'>
                <h2>Данные осмотра пациента</h2>
                <fieldset>
                    <label htmlFor='id'>ID:</label>
                    <input type='text' name='id' id='id' />
                </fieldset>
                <fieldset>
                    <label htmlFor='height'>Рост:</label>
                    <input type='number' name='height' id='height' />
                </fieldset>
                <fieldset>
                    <label htmlFor='weight'>Вес:</label>
                    <input type='number' name='weight' id='weight' />
                </fieldset>
                <fieldset>
                    <label htmlFor='blood-group'>Группа крови:</label>
                    <select name='blood-group' id='blood-group'>
                        <option value='0'>0(I)</option>
                        <option value='А'>А(II)</option>
                        <option value='В'>В(III)</option>
                        <option value='АВ'>АВ(IV)</option>
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor='rh'>Резус-фактор:</label>
                    <select name='rh' id='rh'>
                        <option value='+'>Rh(+)</option>
                        <option value='–'>Rh(–)</option>
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor='date'>Дата:</label>
                    <input type='date' name='date' id='date' />
                </fieldset>
                <input type='submit' value='Сохранить данные' />
            </form>
        )
    }
}
