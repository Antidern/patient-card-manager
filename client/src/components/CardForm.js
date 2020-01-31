import React, { Component } from 'react'

export default class CardForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            card: {
                "blood-group": "0",
                "rh": "+"
            }
        }
    }
    //откправка формы
    submitHandle = (e) => {
        e.preventDefault();
        e.persist();
        //проверка на заполненные поля
        if (!this.state.card['id'] || !this.state.card['height'] || !this.state.card['weight'] || !this.state.card['blood-group'] || !this.state.card['rh']) {
            let alrt = document.querySelector('.new-card .alert');
            alrt.classList.remove('hidden');
            setTimeout(()=>{alrt.classList.add('hidden');}, 3000);
        } else {
            //формирование даты создания формы
            let date = new Date();
            let month = (date.getMonth() + 1) < 10 ? (`0${(date.getMonth() + 1)}`) : (date.getMonth() + 1);
            let day = `${date.getFullYear()}-${month}-${date.getDate()}`;

            let reqBody = {
                id: this.state.card['id'],
                height: this.state.card['height'],
                weight: this.state.card['weight'],
                bloodGroup: this.state.card['blood-group'] + this.state.card['rh'],
                publicationDate: day
            }

            fetch('http://localhost:4000/api/patient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(reqBody)
            })
                .then(res => res.json())
                .then(result => {
                    //обновление таблицы после отправки формы
                    this.props.updateTable();

                    e.target.reset();
                    e.target.classList.add('hidden');
                    document.querySelector('.view-form.hidden').classList.remove('hidden');
                    document.querySelector('.new-card').classList.remove('active');
                    this.setState({
                        card: {
                            "blood-group": "0",
                            "rh": "+"
                        }
                    });

                    //уведомление о создании записи
                    let alrt = document.querySelector('#root .alert');
                    alrt.classList.remove('hidden');
                    setTimeout(()=>{alrt.classList.add('hidden');}, 3000);
                })
        }
    }

    changeHandle = (e) => {
        e.persist();

        this.setState(oldState => {
            oldState.card[e.target.id] = e.target.value
            return oldState;
        });
    }

    render() {
        return (
            <form onSubmit={this.submitHandle} className="hidden" onChange={this.changeHandle}>
                <h2>Данные осмотра пациента</h2>
                <fieldset>
                    <label htmlFor="id">ID:</label>
                    <input type="text" name="id" id="id" />
                </fieldset>
                <fieldset>
                    <label htmlFor="height">Рост:</label>
                    <input type="number" name="height" id="height" />
                </fieldset>
                <fieldset>
                    <label htmlFor="weight">Вес:</label>
                    <input type="number" name="weight" id="weight" />
                </fieldset>
                <fieldset>
                    <label htmlFor="blood-group">Группа крови:</label>
                    <select name="blood-group" id="blood-group">
                        <option value="0">0(I)</option>
                        <option value="А">А(II)</option>
                        <option value="В">В(III)</option>
                        <option value="АВ">АВ(IV)</option>
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="rh">Резус-фактор:</label>
                    <select name="rh" id="rh">
                        <option value="+">Rh(+)</option>
                        <option value="–">Rh(–)</option>
                    </select>
                </fieldset>
                <input type="submit" value="Сохранить данные" />
            </form>
        )
    }
}
