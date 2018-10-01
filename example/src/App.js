import React, { Component } from 'react'

import { ReactLiquid } from 'react-liquid'

export default class App extends Component {
    render() {
        const template = 'Hello, {{ name }}'
        const data = { name: 'John Cena' }

        return (
            <div>
                <ReactLiquid template={template} data={data} />
            </div>
        )
    }
}
