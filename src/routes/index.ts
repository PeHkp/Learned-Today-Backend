import { Router } from 'express';

import usersRoute from './users.routes'
import sessionsRoute from './sessions.routes'
import postsRoute from './posts.routes';
import feedRoute from './feed.routes';

const routes = Router();

routes.use('/users', usersRoute);
routes.use('/sessions', sessionsRoute);
routes.use('/post', postsRoute);
routes.use('/feed', feedRoute);

export default routes;