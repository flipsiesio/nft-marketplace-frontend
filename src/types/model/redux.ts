import type { Dispatch as DispatchReact } from 'react';

export type Action<T, P = void, M = void> = { type: T, payload?: P, meta?: M };
export type Dispatch = DispatchReact<{ type: string }>;
