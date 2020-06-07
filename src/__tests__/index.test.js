import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { ReactLiquid } from '../index'

configure({ adapter: new Adapter() })

describe('ReactLiquid tests', () => {
    const wait = () =>
        new Promise((resolve) => {
            setTimeout(() => resolve(), 500)
        })

    it('should be able to render', async () => {
        const wrapper = mount(
            <ReactLiquid
                template="Hello {{ name }}"
                data={{ name: 'Aquib' }}
            />,
        )

        await wait()

        wrapper.update()
        expect(wrapper.text()).toBe('Hello Aquib')
    })

    it('should not render any extra DOM elements', async () => {
        const wrapper = mount(
            <ReactLiquid
                template="Hello {{ name }}"
                data={{ name: 'Aquib' }}
            />,
        )

        await wait()

        expect(wrapper.getDOMNode().nodeName).toEqual('#text')
    })

    it('should re-render when the template changes', async () => {
        let template = 'Hello {{ name }}'
        const data = { name: 'Aquib' }

        const wrapper = mount(<ReactLiquid template={template} data={data} />)

        await wait()

        template = 'Hola {{ name }}'
        wrapper.setProps({ template })

        await wait()

        wrapper.update()
        expect(wrapper.text()).toBe('Hola Aquib')
    })

    it('should re-render when the data changes', async () => {
        const template = 'Hello {{ name }}'
        let data = { name: 'Aquib' }

        const wrapper = mount(<ReactLiquid template={template} data={data} />)

        await wait()

        data = { name: 'Not Aquib' }
        wrapper.setProps({ data })

        await wait()

        wrapper.update()
        expect(wrapper.text()).toBe('Hello Not Aquib')
    })

    it('should support render-prop based renders', async () => {
        const template = 'Hello {{ name }}'
        let data = { name: 'Aquib' }

        const wrapper = mount(
            <ReactLiquid
                template={template}
                data={data}
                render={(renderedTemplate) => (
                    <p dangerouslySetInnerHTML={renderedTemplate}></p>
                )}
            />,
        )

        await wait()

        expect(wrapper.text()).toBe('Hello Aquib')
    })
})
