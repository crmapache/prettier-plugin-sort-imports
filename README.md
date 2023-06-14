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

### Configuration

Place a file called ```sort-plugin.config.js``` in the root of your project

You can set the import priority order of some libraries, as well as specify directly which aliases you use in the project.

If you do not specify the aliases that you use in the project, then all imports that start with ```@``` will automatically be placed in the group of imports with aliases.

```ecmascript 6
module.exports = {
  libs: [
    {
      name: 'somelib1',
      rule: 'exact',
    },
    {
      name: 'somelib2',
      rule: 'starts',
    },
    {
      name: 'somelib3',
      rule: 'includes',
    },
    ...
  ],
  aliases: [
    'components',
    'shared',
    'features',
    ...
  ],
}
```

Rules available for searching the name of the library in the import:

**exact**- exact match of library name with import  
**starts** - library name match with start of import  
**includes** - import includes the name of the library no matter where
