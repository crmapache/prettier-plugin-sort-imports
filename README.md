# Prettier plugin sort react imports

A prettier plugins for sorting and grouping your imports in react apps.

### Input

```javascript
import { useRouter } from 'next/router'
import { Box, SecondaryButton, Typography } from '@core'
import tabBarBackground from '@assets/svg/tab-bar-background.svg'
import tabBarArrow from '@assets/svg/tab-bar-arrow.svg'
import { useEffect, useState } from 'react'
import userpic from '@assets/images/userpic.png'
import {
  TabBarWrap,
  TabBarItemWrap,
  TabBarUserIconWrap,
  BackButtonWrap,
  UpButtonWrap,
} from './TabBar.elements'
import Image from 'next/image'
import { UP_BUTTON_MIN_SHOW_POSITION } from './TabBar.constants'
import { tabBarTabStyles } from './TabBar.styles'
import { TabBarProps, TabBarTabIndex } from './TabBar.types'
import { UpButton } from '@core/Button/UpButton'
import { throttle } from 'lodash'
```


### Output

```javascript
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { throttle } from 'lodash'

import { Box, SecondaryButton, Typography } from '@core'
import userpic from '@assets/images/userpic.png'
import tabBarArrow from '@assets/svg/tab-bar-arrow.svg'
import tabBarBackground from '@assets/svg/tab-bar-background.svg'
import { UpButton } from '@core/Button/UpButton'

import { UP_BUTTON_MIN_SHOW_POSITION } from './TabBar.constants'
import {
  TabBarWrap,
  TabBarItemWrap,
  TabBarUserIconWrap,
  BackButtonWrap,
  UpButtonWrap,
} from './TabBar.elements'
import { tabBarTabStyles } from './TabBar.styles'
import { TabBarProps, TabBarTabIndex } from './TabBar.types'
```

### Install

```shell script
npm install --save-dev prettier-plugin-sort-react-imports
```

or, using yarn

```shell script
yarn add --dev prettier-plugin-sort-react-imports
```

### Usage
Add plugin in prettier config file.

```ecmascript 6
module.exports = {
  "plugins": ["prettier-plugin-sort-react-imports"]
}
```
