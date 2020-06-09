import { useContext, useEffect, useState } from 'react'

import { ReactLiquidConfig } from '../components/ReactLiquidConfig'

export const RENDER_STATUS = Object.freeze({
    Idle: 'idle',
    Rendering: 'rendering',
})

export const useLiquid = (template, data) => {
    const dataComparator = JSON.stringify(data) // Gross.
    const engine = useContext(ReactLiquidConfig)
    const [state, setState] = useState({
        status: RENDER_STATUS.Idle,
        markup: null,
    })

    useEffect(() => {
        const parseAndRender = async () => {
            setState({
                ...state,
                status: RENDER_STATUS.Rendering,
            })

            if (!template) {
                setState({
                    status: RENDER_STATUS.Idle,
                    markup: '',
                })

                return
            }

            if (typeof template !== 'string') {
                throw new Error(
                    `Expected template to be a string but found ${typeof template}`,
                )
            }

            const markup = await engine.parseAndRender(template, data)

            setState({
                status: RENDER_STATUS.Idle,
                markup,
            })
        }

        parseAndRender()
    }, [template, dataComparator])

    return state
}
