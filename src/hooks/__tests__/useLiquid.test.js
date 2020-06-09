import { renderHook, act } from '@testing-library/react-hooks'
import { useLiquid, RENDER_STATUS } from '../useLiquid'

describe('useLiquid() tests', () => {
    it('should be idle on mount', () => {
        const { result } = renderHook(() => useLiquid())

        expect(result.current.status).toBe(RENDER_STATUS.Idle)
    })

    it('should be able to render markup', async () => {
        const template = 'Hello {{ name }}'
        const data = { name: 'Aquib' }

        const { result, waitForNextUpdate } = renderHook(() =>
            useLiquid(template, data),
        )

        await waitForNextUpdate()

        expect(result.current.status).toBe(RENDER_STATUS.Idle)
        expect(result.current.markup).toBe('Hello Aquib')
    })

    it('should re-render when template changes', async () => {
        let template = 'Hello {{ name }}'
        const data = { name: 'Aquib' }

        const { result, waitForNextUpdate, rerender } = renderHook(() =>
            useLiquid(template, data),
        )

        await waitForNextUpdate()

        expect(result.current.markup).toBe('Hello Aquib')

        template = 'Hola {{ name }}'
        rerender()

        expect(result.current.status).toBe(RENDER_STATUS.Rendering)
        expect(result.current.markup).toBe('Hello Aquib')

        await waitForNextUpdate()

        expect(result.current.status).toBe(RENDER_STATUS.Idle)
        expect(result.current.markup).toBe('Hola Aquib')
    })

    it('should re-render when data changes', async () => {
        const template = 'Hello {{ name }}'
        let data = { name: 'Aquib' }

        const { result, waitForNextUpdate, rerender } = renderHook(() =>
            useLiquid(template, data),
        )

        await waitForNextUpdate()

        expect(result.current.markup).toBe('Hello Aquib')

        data = { name: 'aquibm' }
        rerender()

        await waitForNextUpdate()

        expect(result.current.status).toBe(RENDER_STATUS.Idle)
        expect(result.current.markup).toBe('Hello aquibm')
    })

    it('should support data mutations', async () => {
        const template = 'Hello {{ name }}'
        const data = { name: 'Aquib' }

        const { result, waitForNextUpdate, rerender } = renderHook(() =>
            useLiquid(template, data),
        )

        await waitForNextUpdate()

        expect(result.current.markup).toBe('Hello Aquib')

        data.name = 'aquibm'
        rerender()

        await waitForNextUpdate()

        expect(result.current.status).toBe(RENDER_STATUS.Idle)
        expect(result.current.markup).toBe('Hello aquibm')
    })

    it('should perform a deep-equal on data', async () => {
        const template = 'Hello {{ user.name }}'
        const data = {
            user: {
                name: 'Aquib',
            },
        }

        const { result, waitForNextUpdate, rerender } = renderHook(() =>
            useLiquid(template, data),
        )

        await waitForNextUpdate()

        expect(result.current.markup).toBe('Hello Aquib')

        data.user.name = 'aquibm'
        rerender()

        await waitForNextUpdate()

        expect(result.current.status).toBe(RENDER_STATUS.Idle)
        expect(result.current.markup).toBe('Hello aquibm')
    })

    it('should return empty string when template is empty string', () => {
        const template = ''
        const data = {}

        const { result } = renderHook(() => useLiquid(template, data))

        expect(result.current.status).toBe(RENDER_STATUS.Idle)
        expect(result.current.markup).toBe('')
    })

    it('should be able to handle template/data mismatches', async () => {
        const template = 'Hello {{ name }}'
        const data = { firstName: 'Aquib' }

        const { result, waitForNextUpdate } = renderHook(() =>
            useLiquid(template, data),
        )

        await waitForNextUpdate()

        expect(result.current.markup).toBe('Hello ')
    })

    it('should be able to handle an empty data object', async () => {
        const template = 'Hello {{ name }}'
        const data = {}

        const { result, waitForNextUpdate } = renderHook(() =>
            useLiquid(template, data),
        )

        await waitForNextUpdate()

        expect(result.current.markup).toBe('Hello ')
    })

    it('should throw if template is not a string', () => {
        const template = { boom: true }
        const data = { name: 'Aquib' }

        const { result, waitForNextUpdate } = renderHook(() =>
            useLiquid(template, data),
        )

        expect(waitForNextUpdate()).rejects.toThrow(Error)
    })
})
