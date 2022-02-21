# @novas/components

Minimal and performant React component library built on `styled-components`

## Installation

```bash
yarn add @novas/components styled-components
```

**[`babel-plugin-styled-components`](https://github.com/styled-components/babel-plugin-styled-components) is also required to use the [`css` prop](https://styled-components.com/docs/api#css-prop) (strongly recommended)**

## Basic Components

### Layout

-   `Flex` - `styled.div({ display: 'flex' })`
-   `Stack` - `styled.div({ display: 'flex', flexDirection: 'column' })`
-   `Grid` - `styled.div({ display: 'grid' })`

### Form

-   `Checkbox` - controlled or uncontrolled, native accessibility
-   `Radio` - controlled or uncontrolled, native accessibility
-   `Select` - coming soon
-   `Toggle` - coming soon

### Styles

-   `Global` - has two props, `reset` for applying the CSS reset, and `style` which wraps [`createGlobalStyle`](https://styled-components.com/docs/api#createglobalstyle)
-   `Apply` - use the `css` prop to apply the generated classname to all children (non-recursive) without a wrapping element

## Triggers

-   `Triggers` - a [`SubStateProvider`](https://github.com/codynova/substate) with an api for tracking child `Trigger` binary state

    -   `defaultActiveIds` - array of child `Trigger` ids
    -   `allowMultiActive` - allow multiple active ids, default `true`
    -   `allowNoneActive` - allow zero active ids, default `true`
    -   `children` - standard React children

-   `Trigger`

    -   `id` - string, number, or undefined (substate key)
    -   `children` - standard React children **or** children as a function:

```tsx
type TriggerChildrenFnProps = {
	id?: string | number
	active: boolean
	setActive: React.Dispatch<React.SetStateAction<boolean>>
	toggleActive: React.DispatchWithoutAction
	activeIds: (string | number)[]
	setActiveIds: (ids: (string | number)[]) => void
	setActiveById: (id: string | number, active: boolean) => void
	toggleById: (id: string | number) => void
	getIds: () => (string | number)[]
}

const Example = () => (
	<Triggers>
		<Stack>
			<Trigger id="1">
				{({
					id, // the id of this trigger
					active, // if this id is active
					setActive, // set this id's active state
					toggleActive, // toggle this id's active state
					activeIds, // all active ids
					setActiveIds, // set all active ids
					setActiveById, // set some id's active state
					toggleById, // toggle some id's active state
					getIds, // get all ids regardless of active state
				}) => (
					<button
						css={{ color: active ? 'green' : 'red' }}
						onClick={toggleActive}
					>
						Toggle id "1" active
					</button>
				)}
			</Trigger>
		</Stack>
	</Triggers>
)
```

## Helpers

-   [`media`](https://github.com/codynova/components/blob/master/src/media.ts) - media query object for responsive styles

-   [`reset`](https://github.com/codynova/components/blob/master/src/reset.ts) - CSS reset styles (used by `<Global reset />`)

-   [`outline`](https://github.com/codynova/components/blob/master/src/outline.ts) - element outline styles for accessibility (used in `reset`)

-   [`styled`](https://github.com/codynova/components/blob/master/src/styled.ts) - re-exports [`styled`](https://styled-components.com/docs/api#styled)

-   [`css`](https://github.com/codynova/components/blob/master/src/css.ts) - re-exports [`css`](https://styled-components.com/docs/api#css)

## Motivation

Foregoing a theming library like `styled-system` saves on both runtime performance and bundle size. Relying on [the `css` prop](https://styled-components.com/docs/api#css-prop) provided by `babel-plugin-styled-components` gives us the best of all worlds:

-   Colocate CSS styles inline with components
-   Easily extend and customize existing components
-   Props and theme access
-   Supports all CSS instead of a subset
-   Better runtime performance than style props
-   Smaller bundle size (realistically ~5kb smaller)

CSS custom properties can be used for theming instead of a JavaScript object, which will prevent the need to access the theme via props. Accessing the
theme via props is still supported of course.

## Usage

You should prefer to create new custom elements using the `css` prop or `styled` function syntax.

```jsx
import { Global, Stack, Flex, media, styled } from '@novas/components'

const Heading = styled.h3({
	fontSize: '1.5rem',
	lineHeight: '1.2',
	color: 'var(--color-text)',
})

const Card = (props) => (
	<Stack
		{...props}
		css={{
			padding: '16px',
			borderRadius: '4px',
			boxShadow: '0 2px 3px 0 rgba(0, 0, 0, 0.2)',
			[media.lg]: {
				padding: '24px',
				borderRadius: '8px',
			},
		}}
	/>
)

const App = () => (
	<>
		<Global
			reset
			style={`
                :root {
                    --color-blue: #0000ff;
                    --color-text: #111111;
                }
			`}
		/>
		<Stack>
			<Heading as="h1" css={{ color: 'var(--color-blue)' }}>
				Hello world!
			</Heading>
			<main css={{ marginTop: '16px' }}>
				<Flex as="section" css={{ padding: '8px' }}>
					<Card>
						<Heading>Hello world</Heading>
						<p>Thanks for taking a look!</p>
					</Card>
				</Flex>
			</main>
		</Stack>
	</>
)
```
