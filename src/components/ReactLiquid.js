import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { ReactLiquidConfigProvider } from './ReactLiquidConfig'

/**
 * Responsible for consuming template + data and rendering the result of
 * the Liquid engine.
 */
class ReactLiquid extends PureComponent {
    static propTypes = {
        template: PropTypes.string.isRequired,
        data: PropTypes.object,
        liquidEngine: PropTypes.object.isRequired,
        html: PropTypes.bool,
    }

    state = {
        template: undefined,
        data: undefined,
        compiledRender: undefined,
        needsRender: true,
    }

    /**
     * Determines whether the rendered value is outdated and needs to be re-rendered.
     * Only re-renders if the template or data change.
     *
     * @param {*} props
     * @param {*} state
     */
    static getDerivedStateFromProps(props, state) {
        if (props.template !== state.template || props.data !== state.data) {
            return {
                template: props.template,
                data: props.data,
                compiledRender: state.compiledRender,
                needsRender: true,
            }
        }

        return null
    }

    async componentDidMount() {
        await this.parseAndRender()
    }

    /**
     * Re-renders the value if required.
     */
    async componentDidUpdate() {
        const { needsRender } = this.state

        if (needsRender) {
            await this.parseAndRender()
        }
    }

    /**
     * Parses and renders the liquid template with the specified data.
     */
    async parseAndRender() {
        const { template, data, liquidEngine } = this.props

        const compiledRender = await liquidEngine.parseAndRender(template, data)
        this.setState({ compiledRender, template, data, needsRender: false })
    }

    _createHtmlRender = () => {
        const { compiledRender } = this.state
        return { __html: compiledRender }
    }

    render() {
        if (this.props.html) {
            return <div dangerouslySetInnerHTML={this._createHtmlRender()} />
        }

        const { compiledRender } = this.state
        return <Fragment>{compiledRender}</Fragment>
    }
}

export default ReactLiquidConfigProvider(ReactLiquid)
