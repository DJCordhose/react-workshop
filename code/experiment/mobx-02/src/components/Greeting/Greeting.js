import React from 'react';
import {inject, observer} from 'mobx-react';

import GreetingMaster from './GreetingMaster';
import GreetingDetail from './GreetingDetail';
import {MODE_MASTER} from '../../store';


const Greeting = ({mode}) => mode === MODE_MASTER ? <GreetingMaster /> : <GreetingDetail />;
export default inject(stores => ({mode: stores.store.mode}))(Greeting);

