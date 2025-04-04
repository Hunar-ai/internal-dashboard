import { JSXElementConstructor, ReactPortal } from 'react';

type Key = string | number;

export interface ReactElement<
    P = unknown,
    T extends string | JSXElementConstructor<unknown> =
        | string
        | JSXElementConstructor<unknown>
> {
    type: T;
    props: P;
    key: Key | null;
}

type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

type ReactNodeArray = Array<ReactNode>;
type ReactFragment = ReactNodeArray;

type ReactNode =
    | ReactChild
    | ReactFragment
    | ReactPortal
    | boolean
    | null
    | undefined;
