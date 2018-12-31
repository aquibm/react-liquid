import React, { Component } from 'react'

import { ReactLiquid, liquidEngine } from 'react-liquid'

export default class App extends Component {
    constructor(props) {
        super(props)

        liquidEngine.registerFilter('add', (initial, arg1, arg2) => {
            return initial + arg1 + arg2
        })
    }

    state = {
        template: 'Hello, {{ name }}',
        data: { name: 'John Cena' },
    }

    _changeTemplate = () => {
        this.setState({
            template: 'Hola, {{ name }}',
        })
    }

    _changeData = () => {
        this.setState({
            data: {
                name: 'Jason Bourne',
            },
        })
    }

    render() {
        const { template, data } = this.state

        return (
            <div>
                <ReactLiquid template={template} data={data} />
                <button onClick={this._changeTemplate}>spanish</button>
                <button onClick={this._changeData}>new name</button>

                <br />
                <ReactLiquid template="{{ 1 | add: 2, 3 }}" />
            </div>
        )
    }
}
