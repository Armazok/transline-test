import type { Config } from 'stylelint';

export default {
	plugins: ['stylelint-scss', 'stylelint-order'],
	customSyntax: 'postcss-scss',

	ignoreFiles: ['node_modules/**', 'dist/**', 'build/**'],

	rules: {
		'at-rule-no-unknown': null,
		'scss/at-rule-no-unknown': true,
		'order/properties-alphabetical-order': null,
		'length-zero-no-unit': [true, { ignore: ['custom-properties'] }],

		'property-no-vendor-prefix': null,
		'custom-property-pattern': null,
		'selector-class-pattern': null,
		'selector-id-pattern': null,

		'no-descending-specificity': null,

		'max-nesting-depth': [1, { ignoreAtRules: ['media', 'supports'] }],

		'order/properties-order': [
			[
				// ===== POSITIONING =====
				{
					groupName: 'position',
					emptyLineBefore: 'always',
					properties: [
						'content',
						'position',
						'top',
						'right',
						'bottom',
						'left',
						'z-index',
					],
				},

				// ===== LAYOUT =====
				{
					groupName: 'layout',
					emptyLineBefore: 'always',
					properties: [
						'display',
						'flex',
						'flex-direction',
						'flex-wrap',
						'align-items',
						'justify-content',
						'gap',
					],
				},

				// ===== SIZE / DIMENSIONS =====
				{
					groupName: 'size',
					emptyLineBefore: 'always',
					properties: [
						'width',
						'min-width',
						'max-width',
						'height',
						'min-height',
						'max-height',
					],
				},

				// ===== SPACING =====
				{
					groupName: 'spacing',
					emptyLineBefore: 'always',
					properties: [
						'margin',
						'margin-top',
						'margin-right',
						'margin-bottom',
						'margin-left',
						'padding',
						'padding-top',
						'padding-right',
						'padding-bottom',
						'padding-left',
					],
				},

				// ===== VISUAL / DECORATION =====
				{
					groupName: 'visual',
					emptyLineBefore: 'always',
					properties: [
						'background',
						'color',
						'text-fill-color',
						'opacity',
						'border',
						'border-radius',
						'box-shadow',
					],
				},

				// ===== TYPOGRAPHY =====
				{
					groupName: 'typography',
					emptyLineBefore: 'always',
					properties: [
						'font-size',
						'font-weight',
						'line-height',
						'letter-spacing',
						'text-align',
						'text-transform',
					],
				},

				// ===== MOTION =====
				{
					groupName: 'motion',
					emptyLineBefore: 'always',
					properties: ['transform', 'transition', 'animation'],
				},
			],
		],
	},
} satisfies Config;
