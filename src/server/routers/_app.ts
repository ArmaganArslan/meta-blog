import { router } from '../trpc';
import { postRouter } from './post';
import { authRouter } from './auth';
import { categoryRouter } from './category';
import { newsletterRouter } from './newsletter';

export const appRouter = router({
  post: postRouter,
  auth: authRouter,
  category: categoryRouter,
  newsletter: newsletterRouter,
});

export type AppRouter = typeof appRouter; 