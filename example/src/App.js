import React, { Component } from 'react'

import ReactLiquid, { ReactLiquidConfig } from 'react-liquid'

export default class App extends Component {
    render() {
        return (
            <div>
                <ReactLiquid />
                <ReactLiquidConfig />
            </div>
        )
    }
}
