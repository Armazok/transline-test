declare module '*.png' {
	const source: string;
	export default source;
}

declare module '*.jpg' {
	const source: string;
	export default source;
}

declare module '*.jpeg' {
	const source: string;
	export default source;
}

declare module '*.webp' {
	const source: string;
	export default source;
}

declare module '*.svg' {
	const src: string;
	export default src;
}

declare module '*.svg?react' {
	import type { FC, SVGProps } from 'react';

	const ReactComponent: FC<SVGProps<SVGSVGElement>>;
	export default ReactComponent;
}
