import React, { Component } from 'react';
import TableLine from './TableLine';
//рендер таблицы
export default class CardsTable extends Component {
    render() {
        return (
            <table className="cards-view">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Рост(см)</th>
                        <th>Вес(кг)</th>
                        <th>Группа Крови</th>
                        <th>Дата создания</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.cards ? this.props.cards.map((card) => (
                        <TableLine
                            key={card._id}
                            card={card}
                            chooseCard={this.props.chooseCard}
                        />
                    )) : null}
                </tbody>
            </table>
        )
    }
}
