import React, { Component } from 'react'
//Рендер строк таблицы
export default class TableLine extends Component {
    clickHandle = (e) => {
        this.props.chooseCard(this.props.card);
    }

    render() {
        let card = this.props.card;
        
        return (
            <tr onClick={this.clickHandle}>
                <td>{card.id}</td>
                <td>{card.height}</td>
                <td>{card.weight}</td>
                <td>{`${card.bloodGroup}${card.rh}`}</td>
                <td>{card.publicationDate.split('T')[0].split('-').reverse().join('.')}</td>
            </tr>
        )
    }
}
