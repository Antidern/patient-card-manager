import React, { Component } from 'react'
import CardForm from './CardForm';
import icon from '../document_3530.png';
//контейнер для формы
export default class AddCard extends Component {

    //при нажатии на кнопку появляется форма
    clickHandle = (e) => {
        e.preventDefault(); 

        e.currentTarget.classList.add('hidden')
        let form = document.querySelector('form.hidden');
        form.classList.remove('hidden');
        document.querySelector('.new-card').classList.add('active');
    }

    render() {
        return (
            <div className="new-card">
                <h2 className="alert hidden">Не все поля заполнены</h2>
                <CardForm updateTable={this.props.updateTable}></CardForm>
                <button className="view-form" onClick={this.clickHandle}><img src={icon} alt=""/><span>Добавить новую запись</span></button>
            </div>
        )
    }
}
