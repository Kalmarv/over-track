import type { AppRouter } from '../pages/api/trpc/[trpc]'
import { createReactQueryHooks } from '@trpc/react'
import type { inferProcedureOutput } from '@trpc/server'

export const trpc = createReactQueryHooks<AppRouter>()
export type TQuery = keyof AppRouter['_def']['queries']
export type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
  AppRouter['_def']['queries'][TRouteKey]
>
export type QuickMatch = InferQueryOutput<'quick-match'>
