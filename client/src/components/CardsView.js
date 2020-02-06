import React, { Component } from 'react'
import CardSearch from './CardSearch'
import CardsTable from './CardsTable'
//рендер отображения записей
export default class CardsView extends Component {
    render() {
        return (
            <div>
                <CardSearch updateTable={this.props.updateTable} />
                <CardsTable
                    cards={this.props.cards}
                    chooseCard={this.props.chooseCard}
                />
            </div>
        )
    }
}
