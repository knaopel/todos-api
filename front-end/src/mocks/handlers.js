import { rest } from 'msw';
import { todoHandlers } from './todoHandlers';
import { userHandlers } from './userHandlers';

export const handlers = [...userHandlers, ...todoHandlers];
