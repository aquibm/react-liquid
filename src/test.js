import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { ReactLiquid, liquidEngine } from '.'

configure({ adapter: new Adapter() })

describe('ReactLiquid tests', () => {
    let realParseAndRender

    const bindToRenderer = resolve => {
        liquidEngine.parseAndRender = (...args) => {
            return realParseAndRender.apply(liquidEngine, args).then(result => {
                resolve(result)
                return result
            })
        }
    }

    beforeEach(() => {
        realParseAndRender = liquidEngine.parseAndRender
    })

    afterEach(() => {
        liquidEngine.parseAndRender = realParseAndRender
    })

    it('should be able to render', async () => {
        const liquidPromise = new Promise(resolve => bindToRenderer(resolve))
            .then(() => {})
            .then(() => {})

        const wrapper = mount(
            <ReactLiquid
                template="Hello {{ name }}"
                data={{ name: 'Aquib' }}
            />,
        )

        await liquidPromise

        expect(wrapper.text()).toBe('Hello Aquib')
    })

    it('should not render any extra DOM elements', async () => {
        const liquidPromise = new Promise(resolve => bindToRenderer(resolve))
            .then(() => {})
            .then(() => {})

        const wrapper = mount(
            <ReactLiquid
                template="Hello {{ name }}"
                data={{ name: 'Aquib' }}
            />,
        )

        await liquidPromise

        expect(wrapper.getDOMNode().nodeName).toEqual('#text')
    })

    it('should re-render when the template changes', async () => {
        let liquidPromise = new Promise(resolve => bindToRenderer(resolve))
            .then(() => {})
            .then(() => {})
        let template = 'Hello {{ name }}'
        const data = { name: 'Aquib' }

        const wrapper = mount(<ReactLiquid template={template} data={data} />)

        await liquidPromise

        liquidPromise = new Promise(resolve => bindToRenderer(resolve))
            .then(() => {})
            .then(() => {})

        template = 'Hola {{ name }}'
        wrapper.setProps({ template })

        await liquidPromise

        expect(wrapper.text()).toBe('Hola Aquib')
    })

    it('should re-render when the data changes', async () => {
        let liquidPromise = new Promise(resolve => bindToRenderer(resolve))
            .then(() => {})
            .then(() => {})
        const template = 'Hello {{ name }}'
        let data = { name: 'Aquib' }

        const wrapper = mount(<ReactLiquid template={template} data={data} />)

        await liquidPromise

        liquidPromise = new Promise(resolve => bindToRenderer(resolve))
            .then(() => {})
            .then(() => {})

        data = { name: 'Not Aquib' }
        wrapper.setProps({ data })

        await liquidPromise

        expect(wrapper.text()).toBe('Hello Not Aquib')
    })
})
