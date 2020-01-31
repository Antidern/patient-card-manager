import React, { Component } from 'react';
import './ExaminationSystem.scss';
import CardsView from './components/CardsView';
import NewCard from './components/NewCard';
import background from './фон_сайта2.jpg';
//основной контейнер приложения
export default class ExaminationSystem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cards: []
        }
    }

    componentDidMount() {
        this.updateTable('http://localhost:4000/api/patient');
    }
    //загрузка данных для таблицы
    updateTable = (url = 'http://localhost:4000/api/patient', id = '') => {
        let urlForSend = new URL(url);

        urlForSend.searchParams.append('id', id);

        fetch(urlForSend)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    cards: result
                });
            });
    }

    render() {
        return (
            <>  
                <img className='background' src={background} alt=""/>
                <h2 className='alert hidden'>Добавлена новая запись</h2>
                <CardsView cards={this.state.cards} updateTable={this.updateTable}></CardsView>
                <NewCard updateTable={this.updateTable}></NewCard>
            </>
        )
    }
}
