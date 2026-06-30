import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig, globalIgnores } from 'eslint/config';

import tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

import boundaries from 'eslint-plugin-boundaries';
import importPlugin from 'eslint-plugin-import';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import i18nextPlugin from 'eslint-plugin-i18next';
import storybook from 'eslint-plugin-storybook';
import eslintConfigPrettier from 'eslint-config-prettier';

import globals from 'globals';

const tsconfigRootDirectory = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig([
	// =========================================================
	// GLOBAL IGNORES
	// =========================================================
	globalIgnores(['build/**', 'dist/**', 'node_modules/**']),

	// =========================================================
	// PLUGINS REGISTRATION
	// =========================================================
	{
		plugins: {
			unicorn: eslintPluginUnicorn,
			boundaries,
			import: importPlugin,
			'@typescript-eslint': tseslint,
			react: reactPlugin,
			'react-hooks': reactHooksPlugin,
			i18next: i18nextPlugin,
			storybook,
		},
	},

	// =========================================================
	// FILE TYPE RULE OVERRIDES
	// =========================================================

	// system / config files
	{
		files: ['**/*.config.*', '**/*.d.ts', '**/commitlint.config.*', '**/eslint.config.*'],
		rules: {
			'unicorn/filename-case': 'off',
		},
	},

	// PascalCase: Page*, *Page, *Widget, *Layout async variants
	{
		files: [
			'**/Page*.{ts,tsx}',
			'**/*Page.{ts,tsx}',
			'**/*Widget.{ts,tsx}',
			'**/*Layout.{ts,tsx}',
			'**/*.async.{ts,tsx}',
		],
		rules: {
			'unicorn/filename-case': ['error', { case: 'pascalCase' }],
		},
	},

	// hooks (use*)
	{
		files: ['**/use*.{ts,tsx}'],
		rules: {
			'unicorn/filename-case': ['error', { case: 'camelCase' }],
		},
	},

	// default (everything else)
	{
		files: ['**/*.{ts,tsx,js,jsx}'],
		rules: {
			'unicorn/filename-case': ['error', { case: 'kebabCase' }],
		},
	},

	// =========================================================
	// LANGUAGE OPTIONS + RESOLVERS
	// =========================================================
	{
		files: ['**/*.{js,jsx,ts,tsx}'],

		languageOptions: {
			parser,
			globals: {
				...globals.browser,
				...globals.es2020,
			},

			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module',
				ecmaFeatures: { jsx: true },
			},
		},

		settings: {
			react: {
				version: 'detect',
			},

			'import/resolver': {
				typescript: {
					project: './tsconfig.json',
					tsconfigRootDir: tsconfigRootDirectory,
					alwaysTryTypes: true,
				},
				node: {
					extensions: ['.js', '.jsx', '.ts', '.tsx'],
				},
			},

			// =====================================================
			// FSD BOUNDARIES MAPPING
			// =====================================================
			'boundaries/elements': [
				{ type: 'shared', pattern: 'src/shared/**/*' },
				{ type: 'entities', pattern: 'src/entities/**/*' },
				{ type: 'features', pattern: 'src/features/**/*' },
				{ type: 'widgets', pattern: 'src/widgets/**/*' },
				{ type: 'pages', pattern: 'src/pages/**/*' },
				{ type: 'app', pattern: 'src/app/**/*' },
			],
		},

		rules: {
			// ================= BASE =================
			'no-empty-pattern': 'off',
			'no-console': ['warn', { allow: ['warn', 'error'] }],
			'no-debugger': 'warn',

			'no-unused-vars': 'off',

			// ================= TYPESCRIPT =================
			'@typescript-eslint/no-empty-interface': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/ban-ts-comment': 'warn',
			'@typescript-eslint/no-non-null-assertion': 'warn',
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{
					prefer: 'type-imports',
					disallowTypeAnnotations: true,
				},
			],

			// ================= REACT =================
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			'react/display-name': 'off',
			'react-hooks/exhaustive-deps': 'warn',
			'react-hooks/rules-of-hooks': 'error',

			// ================= IMPORT =================
			'import/newline-after-import': 'error',
			'import/no-anonymous-default-export': 'warn',

			'import/no-relative-parent-imports': 'off',
			'import/no-internal-modules': 'off',

			'import/no-cycle': ['error', { maxDepth: Infinity, ignoreExternal: true }],
			'import/no-duplicates': 'error',
			'import/first': 'error',
			'import/no-relative-packages': 'error',

			'import/order': [
				'error',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						['parent', 'sibling', 'index'],
						'type',
					],
					pathGroups: [
						{ pattern: 'react', group: 'builtin', position: 'before' },
						{ pattern: '@/app/**', group: 'internal', position: 'after' },
						{ pattern: '@/pages/**', group: 'internal', position: 'after' },
						{ pattern: '@/widgets/**', group: 'internal', position: 'after' },
						{ pattern: '@/features/**', group: 'internal', position: 'after' },
						{ pattern: '@/entities/**', group: 'internal', position: 'after' },
						{ pattern: '@/shared/**', group: 'internal', position: 'after' },
						{ pattern: './*.scss', group: 'index', position: 'after' },
						{ pattern: './*.css', group: 'index', position: 'after' },
					],
					pathGroupsExcludedImportTypes: ['builtin', 'object'],
					'newlines-between': 'always',
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
				},
			],

			// ================= SVG =================
			'no-restricted-syntax': [
				'error',
				{
					selector:
						"ImportDeclaration[source.value=/\\.svg$/] > ImportDefaultSpecifier[local.name=/^[A-Z]/]",
					message:
						"❌ SVG-компонент должен импортироваться с суффиксом '?react'. Используй: import X from './icon.svg?react'",
				},
				{
					selector: "TSQualifiedName[left.name='React']",
					message:
						"❌ Не используй React.X в типах. Импортируй напрямую: import { ReactNode } from 'react'",
				},
			],

			// ================= REACT NAMESPACE =================
			'no-restricted-imports': [
				'error',
				{
					name: 'react',
					importNames: ['default'],
					message:
						"❌ Не импортируй React namespace (import React from 'react'). Используй именованные импорты: import { memo, ReactNode } from 'react'",
				},
			],

			// ================= UNICORN =================
			'unicorn/filename-case': 'off',
			'unicorn/no-empty-file': 'error',
			'unicorn/prefer-export-from': 'error',
			'unicorn/prefer-node-protocol': 'error',

			// ================= FSD BOUNDARIES =================
			'boundaries/no-unknown': 'error',

			'boundaries/dependencies': [
				2,
				{
					default: 'allow',
					rules: [
						{
							from: { type: ['shared'] },
							disallow: {
								to: {
									type: ['entities', 'features', 'widgets', 'pages', 'app'],
								},
							},
							message:
								"❌ Нарушение FSD: слой 'shared' может импортировать только shared. Попытка импорта из '{{to.type}}'",
						},
						{
							from: { type: ['entities'] },
							disallow: { to: { type: ['features', 'widgets', 'pages', 'app'] } },
							message:
								"❌ Нарушение FSD: слой 'entities' может импортировать: shared, entities. Попытка импорта из '{{to.type}}'",
						},
						{
							from: { type: ['features'] },
							disallow: { to: { type: ['widgets', 'pages', 'app'] } },
							message:
								"❌ Нарушение FSD: слой 'features' может импортировать: shared, entities, features. Попытка импорта из '{{to.type}}'",
						},
						{
							from: { type: ['widgets'] },
							disallow: { to: { type: ['pages', 'app'] } },
							message:
								"❌ Нарушение FSD: слой 'widgets' может импортировать: shared, entities, features, widgets. Попытка импорта из '{{to.type}}'",
						},
						{
							from: { type: ['pages'] },
							disallow: { to: { type: ['app'] } },
							message:
								"❌ Нарушение FSD: слой 'pages' может импортировать: shared, entities, features, widgets, pages. Попытка импорта из '{{to.type}}'",
						},
					],
				},
			],
		},
	},

	// =========================================================
	// NO-RESTRICTED-IMPORTS: barrel imports enforcement
	// =========================================================
	{
		files: ['src/**/*.{ts,tsx}'],
		ignores: ['src/shared/api/**', 'src/shared/d/**', 'src/entities/*/model/**'],
		rules: {
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: ['@/shared/ui/*/*', '@/shared/ui/*/**'],
							message:
								"❌ Глубокий импорт shared/ui. Используй barrel '@/shared/ui'.",
						},
						{
							group: ['@/entities/*/*/model/**', '@/entities/*/*/*/model/**'],
							message:
								"❌ Глубокий импорт entities. Внутри своего слайса → '../const/...' (относительный). Снаружи → '@/entities/{domain}/{slice}' (barrel).",
						},
						{
							group: ['@/entities/**/ui/**'],
							message:
								"❌ Глубокий импорт entities/ui. Внутри своего слайса → './Component' (относительный). Снаружи → '@/entities/{domain}/{slice}' (barrel).",
						},
						{
							group: ['@/features/**/model/**', '@/features/**/ui/**'],
							message:
								"❌ Глубокий импорт features. Внутри своего слайса → '../hook/...' (относительный). Снаружи → '@/features/{entity}/{operation}' (barrel).",
						},
						{
							group: ['@/widgets/**/model/**', '@/widgets/**/ui/**'],
							message:
								"❌ Глубокий импорт widgets. Внутри своего слайса → './Widget' (относительный). Снаружи → '@/widgets/{domain}' (barrel).",
						},
					],
				},
			],
		},
	},

	// Flat pages — only widgets and shared, no entities/features
	{
		files: ['src/pages/**/ui/*.{ts,tsx}'],
		rules: {
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: ['@/entities/**'],
							message:
								'❌ Плоские страницы: сущности должны идти через виджеты, не напрямую в страницу.',
						},
						{
							group: ['@/features/**'],
							message:
								'❌ Плоские страницы: фичи должны идти через виджеты, не напрямую в страницу.',
						},
					],
				},
			],
		},
	},

	// IoC: entity hooks — only API wrappers, no UI side-effects
	{
		files: ['src/entities/**/model/hook/*.{ts,tsx}'],
		rules: {
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: ['@/entities/*/*/model/**', '@/entities/*/*/*/model/**'],
							message:
								"❌ Глубокий импорт entities. Используй barrel '@/entities/{domain}/{slice}'.",
						},
						{
							group: ['@/features/**/model/**', '@/features/**/ui/**'],
							message:
								"❌ Глубокий импорт features. Используй barrel '@/features/{entity}/{operation}'.",
						},
						{
							group: ['@/widgets/**/model/**', '@/widgets/**/ui/**'],
							message:
								"❌ Глубокий импорт widgets. Используй barrel '@/widgets/{domain}'.",
						},
					],
				},
			],
		},
	},

	// index files — only relative imports
	{
		files: ['src/**/index.{ts,tsx,js,jsx}'],
		rules: {
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: ['@*'],
							message:
								'В index файлах используйте только относительные импорты (./...)',
						},
					],
				},
			],
		},
	},

	// =========================================================
	// I18N: no untranslated string literals (JSX + callbacks)
	// =========================================================
	{
		files: ['src/**/*.tsx', 'src/**/*.ts'],
		ignores: [
			'src/app/i18n/**',
			'src/shared/config/i18n/**',
			'src/shared/lib/auth/**',
			'src/**/*.stories.{ts,tsx}',
		],
		rules: {
			'i18next/no-literal-string': [
				'error',
				{
					mode: 'all',
					'jsx-attributes': {
						exclude: [
							'className',
							'style',
							'type',
							'as',
							'variant',
							'id',
							'name',
							'key',
							'role',
							'alt',
							'tabIndex',
							'data-testid',
							'htmlFor',
							'aria-label',
							'aria-labelledby',
							'aria-describedby',
							'target',
							'rel',
							'href',
							'src',
							// Framer Motion animation state names
							'mode',
							'initial',
							'animate',
							'exit',
						],
					},
					'object-properties': {
						// значения этих ключей — внутренние идентификаторы, не текст
						exclude: [
							'displayName',
							'fallbackLng',
							'lookupLocalStorage',
							'order',
							'caches',
							'ease',
						],
					},
					callees: {
						// аргументы этих функций не являются пользовательским текстом
						exclude: [
							't',
							'i18n.t',
							'onChange',
							'navigate',
							'useTranslation',
							'register',
							'console.warn',
							'console.error',
							'console.log',
							'document.getElementById',
							'document.addEventListener',
							'document.removeEventListener',
							'mql.addEventListener',
							'mql.removeEventListener',
							'goNext', // внутренние идентификаторы шагов регистрации
							'setAccessToken', // токен сессии — не пользовательский текст
							// RHF internal API — field names, form modes, validation keys
							'useForm',
							'watch',
							'setValue',
							'clearErrors',
							'setError',
							'getError',
							'getFieldError',
							// Browser API — internal identifiers, not user text
							'window.matchMedia',
						],
					},
				},
			],
		},
	},

	// =========================================================
	// STORYBOOK: story-specific rules
	// =========================================================
	{
		files: ['**/*.stories.{ts,tsx}', '**/*.story.{ts,tsx}'],
		rules: {
			'storybook/default-exports': 'error',
			'storybook/no-redundant-story-name': 'warn',
			'storybook/prefer-pascal-case': 'warn',
			'storybook/story-exports': 'error',
			// Stories содержат демо-строки, не пользовательский текст — i18n не нужен
			'i18next/no-literal-string': 'off',
			// FSD boundaries не применимы к story-файлам
			'boundaries/dependencies': 'off',
			'boundaries/no-unknown': 'off',
			// В stories бывают дефолтные экспорты meta-объектов
			'import/no-anonymous-default-export': 'off',
		},
	},

	// Storybook config files — no story rules
	{
		files: ['.storybook/**'],
		rules: {
			'i18next/no-literal-string': 'off',
		},
	},

	// =========================================================
	// PRETTIER (disable conflicting rules — must be last)
	// =========================================================
	eslintConfigPrettier,
]);
