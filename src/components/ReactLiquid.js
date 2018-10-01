import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { ReactLiquidConfigProvider } from './ReactLiquidConfig'

class ReactLiquid extends Component {
    static propTypes = {
        template: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
        liquidEngine: PropTypes.object.isRequired,
    }

    state = {
        currentTemplate: undefined,
        compiledRender: undefined,
    }

    async componentDidMount() {
        await this.parseAndRender()
    }

    async componentWillUpdate() {
        const { template } = this.props
        const { currentTemplate } = this.state

        if (template !== currentTemplate) {
            await this.parseAndRender()
        }
    }

    async parseAndRender() {
        const { template, data, liquidEngine } = this.props

        const compiledRender = await liquidEngine.parseAndRender(template, data)
        this.setState({ compiledRender, currentTemplate: template })
    }

    render() {
        const { compiledRender } = this.state
        return <Fragment>{compiledRender}</Fragment>
    }
}

export default ReactLiquidConfigProvider(ReactLiquid)
