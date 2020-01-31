import React, { Component } from 'react'
//Рендер строк таблицы
export default class TableLine extends Component {
    constructor(props) {
        super(props)

        this.state = {
            card: this.props.card
        }
    }
    //изменения значений в таблице отправляются на сервер
    changeHandle = (e) => {
        e.persist();

        this.setState((state) => {
            let newState = state;
            newState.card[e.target.className] = e.target.value;

            return newState;
        }, () => {
            fetch('http://localhost:4000/api/patient', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.state.card)
            })
                .then(res => res.json())
                .then(result => console.log(result));
        });

    }
    //удаление записи
    deleteHandle = (e) => {
        console.log(this.state.card);
        fetch('http://localhost:4000/api/patient', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.state.card)
            })
                .then(res => res.json())
                .then(result => {
                    this.props.updateTable();
                });
    }

    render() {
        let card = this.state.card;
        let date = new Date(card.publicationDate);
        let month = (date.getMonth() + 1) < 10 ? (`0${(date.getMonth() + 1)}`) : (date.getMonth() + 1);
        let day = `${date.getFullYear()}-${month}-${date.getDate()}`;

        return (
            <tr onChange={this.changeHandle}>
                <td><input className="id" type="text" defaultValue={card.id} /></td>
                <td><input className="height" type="number" defaultValue={card.height} /></td>
                <td><input className="weight" type="number" defaultValue={card.weight} /></td>
                <td><input className="bloodGroup" type="text" defaultValue={card.bloodGroup} /></td>
                <td><input className="publicationDate" type="date" defaultValue={day} /></td>
                <td><div className="delete-card" onClick={this.deleteHandle}>X</div></td>
            </tr>
        )
    }
}
