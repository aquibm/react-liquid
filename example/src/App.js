import React, { Component } from 'react'

import { ReactLiquid } from 'react-liquid'

export default class App extends Component {
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
            </div>
        )
    }
}
