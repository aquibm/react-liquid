# react-liquid

> Liquid templating language component for React

[![NPM](https://img.shields.io/npm/v/react-liquid.svg)](https://www.npmjs.com/package/react-liquid)

-   [Install](#install)
-   [Basic Usage](#basic-usage)
-   [Extending the Liquid Engine](#extending-the-liquid-engine)
-   [Rendering HTML](#rendering-html)
-   [Custom rendering via render prop](#custom-rendering-via-render-prop)
-   [useLiquid hook](#useliquid-hook)
-   [License](#license)

## Install

```bash
npm install --save react-liquid
```

or

```bash
yarn add react-liquid
```

## Basic Usage

The component will automatically update when template or data are updated via state or props.

```jsx
import React, { Component } from 'react'

import { ReactLiquid } from 'react-liquid'

class Example extends Component {
    render() {
        const template = 'Hello, {{ name }}'
        const data = {
            name: 'aquibm',
        }

        return <ReactLiquid template={template} data={data} />
    }
}
```

## Extending the Liquid Engine

You can add your own filters and tags to the liquid engine, [more information here.](https://github.com/harttle/liquidjs#register-filters)

```jsx
import React, { Component } from 'react'

import { ReactLiquid, liquidEngine } from 'react-liquid'

class Example extends Component {
    constructor(props) {
        super(props)

        liquidEngine.registerFilter('add', (initial, arg1, arg2) => {
            return initial + arg1 + arg2
        })
    }

    render() {
        return <ReactLiquid template="{{ 1 | add: 2, 3 }}" />
    }
}
```

## Rendering HTML

HTML can be dangerously injected by supplying the `html` prop

```jsx
import React, { Component } from 'react'

import { ReactLiquid } from 'react-liquid'

class Example extends Component {
    render() {
        const template = '<p style="color: tomato;">{{ name }}</p>'
        const data = {
            name: 'aquibm',
        }

        return <ReactLiquid template={template} data={data} html />
    }
}
```

## Custom rendering via render prop

You can render however you'd like by passing through a render prop

```jsx
import React, { Component } from 'react'
import { ReactLiquid } from 'react-liquid'

class Example extends Component {
    render() {
        const template = '<p style="color: tomato;">{{ name }}</p>'
        const data = {
            name: 'aquibm',
        }

        return (
            <ReactLiquid
                template={template}
                data={data}
                render={(renderedTemplate) => {
                    console.log('Woohoo! New Render!')
                    return <span dangerouslySetInnerHTML={renderedTemplate} />
                }}
            />
        )
    }
}
```

## useLiquid hook

From version 2.x onwards, you can render markdown using the useLiquid hook.

> At the moment, we use `JSON.stringify( data )` between render cycles to determine whether we need to re-render the markdown. This is inherently slow and should only be used when data is small and not overly nested.

```jsx
import React from 'react'
import { useLiquid, RENDER_STATUS } from 'react-liquid'

const MyAwesomeComponent = ({ template, data }) => {
    const { status, markup } = useLiquid(template, data)

    return (
        <div>
            {status === RENDER_STATUS.rendering && <div>Rendering...</div>}
            <div dangerouslySetInnerHTML={{ __html: markup }} />
        </div>
    )
}
```

## License

[MIT](LICENSE.md) © Aquib Master
