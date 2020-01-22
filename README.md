# react-liquid

> Liquid templating language component for React

[![NPM](https://img.shields.io/npm/v/react-liquid.svg)](https://www.npmjs.com/package/react-liquid)

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
                render={renderedTemplate => {
                    console.log('Woohoo! New Render!')
                    return <span dangerouslySetInnerHTML={renderedTemplate} />
                }}
            />
        )
    }
}
```

## License

[MIT](LICENSE.md) © Aquib Master
