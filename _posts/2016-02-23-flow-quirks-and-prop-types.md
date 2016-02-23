---
layout: post
title: "Quirks and prop types in Flow"
date: 2016-02-23 15:10
comments: true
---

## Notes on prop types in Flow

Here are some notes on current quirks in [Flow](http://flowtype.org/) (using version 0.22.0) on typing React props.

### Prop types, and `import`

Currently code like this:

```javascript
/* @flow */

import React from 'react'
import ReactDOM from 'react-dom'

class Foo extends React.Component {
  props: {
    num: number
  };

  render () {
    return (
      <div>
        wahoo
      </div>
    )
  }
}

ReactDOM.render(<div><Foo num={4}/></div>, document.getElementById('app'))
```

Flow will throw an error that num does not exist on props.

There are three ways to get around this right now:

#### 1

Extract the type of props, and add it as a parameter to the Component class:

```javascript
/* @flow */

import React from 'react'
import ReactDOM from 'react-dom'

type Props = {
  num: number
}

// The three types here that can be specified are:
// <defaultProps, props, state>
class Foo extends React.Component<any, Props, any> {
  props: Props;

  render () {
    return (
      <div>
        wahoo
      </div>
    )
  }
}

ReactDOM.render(<div><Foo num={4}/></div>, document.getElementById('app'))
```

#### 2

Use `require` instead of `import`

```javascript
/* @flow */

var React = require('react')
import ReactDOM from 'react-dom'

class Foo extends React.Component {
  props: {
    num: number
  };

  render () {
    return (
      <div>
        wahoo
      </div>
    )
  }
}

ReactDOM.render(<div><Foo num={4}/></div>, document.getElementById('app'))
```

#### 3

Don't use the component in the same file where it's defined. That simple :)

### Default props

When replacing React.PropTypes with Flow types, it makes sense to represent props that don't end with `.isRequired` as nullable types:

```javascript
== PropTypes ==

propTypes: {
  foo: React.PropTypes.number
}

== Flow ==

props: {
  foo: ?number
}
```

What might not be immediately obvious, is that if you are specifying default props, and don't actually want to treat those props as nullable in your code, you should remove the nullability from the type:

```javascript
props: {
  foo: number // No longer needs to be nullable because the default value is set below
}

defaultProps: {
  foo: 0
}
```

That's all for now!
