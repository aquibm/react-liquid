import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ReactLiquid extends Component {
    static propTypes = {
        template: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
    }

    render() {
        return <div>react-liquid</div>
    }
}
