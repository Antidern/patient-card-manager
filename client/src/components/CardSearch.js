import React, { Component } from 'react'

export default class CardSearch extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchId: ''
        }
    }
    //сохранение состояния на основе ввода в input
    changeHandle = (e) => {
        this.setState({
            searchId: e.target.value
        });
    }
    //поиск по id
    searchHandle = (e) => {
        e.preventDefault();
        this.props.updateTable('http://localhost:4000/api/patient', this.state.searchId);
    }
    //сброс фильтра поиска
    resetHandle = (e) => {
        e.preventDefault();
        this.setState({
            searchId: ''
        }, ()=> {
            this.props.updateTable('http://localhost:4000/api/patient', this.state.searchId);
        });
    }

    render() {
        return (
            <form className="card-search" onSubmit={this.searchHandle}>
                <input type="text" placeholder="Введите id пациента" onChange={this.changeHandle} value={this.state.searchId}/>
                <button className="start-search" onClick={this.searchHandle}>Искать</button>
                <button className="clear-input" onClick={this.resetHandle}>Сбросить</button>
            </form>
        )
    }
}
