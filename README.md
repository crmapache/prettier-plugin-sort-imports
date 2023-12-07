# Prettier plugin sort react imports

A prettier plugins for sorting and grouping your imports in react apps.

### Input

```javascript
import Fuse from 'fuse.js'
import './styles.scss'
import { BlackTransparentMask } from '../../SharedPageMask'
import { ACCORDEON_DATA, TAB_OPTIONS, TABS_TO_SHOW } from './Faq.constants'
import emptySearchResultSadFace from '@assets/svg/empty-search-result-sad-face.svg'
import {
  FaqWrap,
  ShowAllButtonWrap,
  ShowAllButton,
  EmptySearchResultWrap,
  TabsWrap,
} from './Faq.elements'
import Image from 'next/image'
import { ShowAllButtonBackground } from './ShowAllButtonBackground'
import { BackdropWrap, Backdrop } from '../FrontBackdrop'
import {
  SearchInput,
  Tabs,
  Accordeon,
  Typography,
  Box,
  SecondaryButton,
  AccordeonElement,
} from '@core'
import debounce from "lodash/debounce"
import { useMemo, useState } from 'react'
```


### Output

```javascript
import { useMemo, useState } from 'react'
import Image from 'next/image'
import Fuse from 'fuse.js'
import debounce from 'lodash/debounce'

import {
  Box,
  Tabs,
  Accordeon,
  Typography,
  SearchInput,
  SecondaryButton,
  AccordeonElement,
} from '@core'
import emptySearchResultSadFace from '@assets/svg/empty-search-result-sad-face.svg'

import { BlackTransparentMask } from '../../SharedPageMask'
import { Backdrop, BackdropWrap } from '../FrontBackdrop'
import { TAB_OPTIONS, TABS_TO_SHOW, ACCORDEON_DATA } from './Faq.constants'
import {
  FaqWrap,
  TabsWrap,
  ShowAllButton,
  ShowAllButtonWrap,
  EmptySearchResultWrap,
} from './Faq.elements'
import { ShowAllButtonBackground } from './ShowAllButtonBackground'

import './styles.scss'
```

### Install

```shell script
npm install -D prettier-plugin-sort-react-imports
```

or, using yarn

```shell script
yarn add -D prettier-plugin-sort-react-imports
```

### Usage
Add plugin in prettier config file.

```ecmascript 6
module.exports = {
  "plugins": ["prettier-plugin-sort-react-imports"]
}
```

### Ignore
In some special cases, the plugin may be doing something wrong, so you can
turn it off in a specific file by leaving a comment
```
// @imports-sort-ignore
```
