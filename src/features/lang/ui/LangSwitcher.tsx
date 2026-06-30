import { memo } from 'react';

import classNames from 'classnames';

import ChevronDownIcon from '@/shared/assets/icons/ui/chevron-down.svg?react';
import { LANG_LABELS, SUPPORTED_LANGS } from '@/shared/config';
import { Button, BUTTON_VARIANT } from '@/shared/ui';

import { useLangSwitcher } from '../model/hooks/useLangSwitcher';

import cls from './LangSwitcher.module.scss';

export const LangSwitcher = memo(() => {
	const { currentLang, open, ref, toggle, handleSelect } = useLangSwitcher();

	return (
		<div ref={ref} className={cls.LangSwitcher}>
			<Button
				variant={BUTTON_VARIANT.CLEAR}
				type="button"
				className={cls.LangSwitcher__trigger}
				onClick={toggle}
			>
				<span className={cls.LangSwitcher__label}>{currentLang.toUpperCase()}</span>
				<ChevronDownIcon
					className={classNames(cls.LangSwitcher__chevron, {
						[cls.LangSwitcher__chevron_up]: open,
					})}
				/>
			</Button>

			{open && (
				<div className={cls.LangSwitcher__dropdown}>
					{SUPPORTED_LANGS.map((lang) => (
						<Button
							key={lang}
							variant={BUTTON_VARIANT.CLEAR}
							type="button"
							className={classNames(cls.LangSwitcher__option, {
								[cls.LangSwitcher__option_active]: lang === currentLang,
							})}
							onClick={() => handleSelect(lang)}
						>
							{LANG_LABELS[lang]}
						</Button>
					))}
				</div>
			)}
		</div>
	);
});

LangSwitcher.displayName = 'LangSwitcher';
