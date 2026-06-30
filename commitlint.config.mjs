const commitLint = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [
			2,
			'always',
			[
				'feat', // Новая функциональность
				'fix', // Исправление бага
				'docs', // Обновление документации
				'style', // Форматирование, отступы, запятые
				'refactor', // Рефакторинг кода
				'perf', // Оптимизация производительности
				'test', // Добавление тестов
				'chore', // Обновление задач, конфигов, пакетов
				'revert', // Откат изменений
				'build', // Сборка проекта
				'ci', // CI/CD настройки
			],
		],
		'type-case': [2, 'always', 'lowerCase'],
		'type-empty': [2, 'never'],
		'subject-case': [0],
		'subject-empty': [2, 'never'],
		'subject-full-stop': [2, 'never', '.'],
		'header-max-length': [2, 'always', 250],
	},
};

export default commitLint;
