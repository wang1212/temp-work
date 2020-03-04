/* App entry file */

// @flow

// enable global async functions
import 'regenerator-runtime/runtime'

// base style
import './app.scss'

// Import F7 Bundle
import Framework7 from 'framework7/framework7.esm.bundle.js'
// Import F7-React Plugin
import Framework7React from 'framework7-react'
// Init F7-React Plugin
Framework7.use(Framework7React)

import React from 'react'
import { render } from 'react-dom'
import App from 'components/App.jsx'

const AppRootDOM = document.getElementById('App')

/* Render to dom */
if (AppRootDOM) {
	render(<App />, AppRootDOM)
}
