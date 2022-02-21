import { outline } from './outline'

export const inputContainer = `
	position: relative;
	display: inline-flex;

	input {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		opacity: 0;
	}

	span, svg {
		box-sizing: border-box;
	}

	span {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1rem;
		height: 1rem;
		margin: 0;
		border: 1px solid #767676;
		border-radius: 0.2rem;
		pointer-events: none;
	}

	svg {
		width: 100%;
		padding: 0.1rem;
		fill: #ffffff;
		opacity: 0;
	}

	input:disabled + span {
		background-color: #f8f8f8;
		border-color: #d1d1d1;
	}

	input:checked:not(:disabled) + span {
		background-color: #0277f6;
		background-color: -webkit-focus-ring-color;
		border-color: #0277f6;
		border-color: -webkit-focus-ring-color;
	}

	input:checked:disabled + span {
		background-color: #d1d1d1;
	}

	input:checked + span svg {
		opacity: 1;
	}

	input:focus-visible + span {
		${outline}
		outline-offset: 3px;
	}

	input:hover:not(:disabled) + span {
		border-color: #4f4f4f;
	}

	input:checked:hover:not(:disabled) + span {
		background-color: #225ec1;
		border-color: #225ec1;
	}

	input:active + span {
		border-color: #8d8d8d;
	}

	input:checked:active + span {
		background-color: #4e94f7;
		border-color: #4e94f7;
	}
`
