import express from 'express';
import mainPage from './mainPage';
import cityPage from './cityPage';

const route = express();

route.use('/mainPage', mainPage);
route.use('/cityPage', cityPage);

export default route;
