import React, { Component } from 'react'

export default class EditCard extends Component {
    //изменения значений в таблице отправляются на сервер
    submitHandle = (e) => {
        e.preventDefault();
        let inputs = e.target.elements;

        let editedCard = {
            _id: this.props.choosenCard._id,
            id: inputs['id'].value,
            height: inputs['height'].value,
            weight: inputs['weight'].value,
            bloodGroup: inputs['blood-group'].value,
            rh: inputs['rh'].value,
            publicationDate: inputs['date'].value
        }

        if (!editedCard.id ||
            !editedCard.height ||
            !editedCard.weight ||
            !editedCard.bloodGroup ||
            !editedCard.rh ||
            !editedCard.publicationDate) {
            let alrt = e.target.previousElementSibling;
            alrt.classList.remove('hidden');
            setTimeout(() => {
                alrt.classList.add('hidden');
            }, 2000);
        } else {
            fetch('http://localhost:4000/api/patient', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(editedCard)
            }).then(() => {
                this.props.updateTable();
                this.props.chooseCard('');
            }).catch(console.log);
        }
    }

    deleteHandle = (e) => {
        e.preventDefault();

        fetch('http://localhost:4000/api/patient', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(this.props.choosenCard)
        }).then(() => {
            this.props.updateTable();
            this.props.chooseCard('');
        }).catch(console.log);
    }

    hideHandle = (e) => {
        if (e.target === e.currentTarget) {
            this.props.chooseCard('');
        }
    }

    render() {
        return (
            <div className='edit-wrapper' onClick={this.hideHandle}>
                <h2 className="alert hidden">Не все поля заполнены</h2>
                <form onSubmit={this.submitHandle}>
                    <label>ID:</label>
                    <input name='id' type='text' defaultValue={this.props.choosenCard.id} />
                    <label>Рост(см):</label>
                    <input name='height' type='number' defaultValue={this.props.choosenCard.height} />
                    <label>Вес(кг):</label>
                    <input name='weight' type='number' defaultValue={this.props.choosenCard.weight} />
                    <label>Группа Крови:</label>
                    <select name='blood-group' defaultValue={this.props.choosenCard.bloodGroup}>
                        <option value='0'>0(I)</option>
                        <option value='А'>А(II)</option>
                        <option value='В'>В(III)</option>
                        <option value='АВ'>АВ(IV)</option>
                    </select>
                    <label>Резус-фактор:</label>
                    <select name='rh' defaultValue={this.props.choosenCard.rh}>
                        <option value='+'>Rh(+)</option>
                        <option value='–'>Rh(–)</option>
                    </select>
                    <label>Дата создания:</label>
                    <input name='date' type='date' defaultValue={this.props.choosenCard.publicationDate.split('T')[0]} />
                    <button type='submit'>Изменить</button>
                    <button className='delete-card' onClick={this.deleteHandle}>Удалить</button>
                </form>
            </div>
        )
    }
}

