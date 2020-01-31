import React, { Component } from 'react'
import CardSearch from './CardSearch'
import CardsTable from './CardsTable'
//рендер отображения записей
export default class CardsView extends Component {
    render() {
        return (
            <div>
                <CardSearch updateTable={this.props.updateTable}></CardSearch>
                <CardsTable updateTable={this.props.updateTable} cards={this.props.cards}></CardsTable>
            </div>
        )
    }
}
