import React, { Component } from 'react'
import Liquid from 'liquidjs/dist/liquid'

export const liquidEngine = Liquid()
export const ReactLiquidConfig = React.createContext(liquidEngine)

export const ReactLiquidConfigProvider = WrappedComponent =>
    class extends Component {
        render() {
            return (
                <ReactLiquidConfig.Consumer>
                    {engine => (
                        <WrappedComponent
                            liquidEngine={engine}
                            {...this.props}
                        />
                    )}
                </ReactLiquidConfig.Consumer>
            )
        }
    }
