import React, { Component } from 'react'
import Liquid from 'liquidjs/dist/liquid'

export const liquidEngine = Liquid()
export const ReactLiquidConfig = React.createContext(liquidEngine)

/**
 * Higher order component to supply the Liquid engine to the
 * component it composes.
 *
 * @param {Component} WrappedComponent
 */
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
