import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

import { useEffect, useRef, useState } from 'react';
import { Text } from 'src/ui/text';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
type TForms = {
	applyStyles: (event: any) => void;
	reset: () => void;
	fonts: OptionType;
	changeFont: (option: OptionType) => void;
	fontSize: OptionType;
	changeSize: (option: OptionType) => void;
	changeFontColor: (option: OptionType) => void;
	fontColor: OptionType;
	changeBackColor: (option: OptionType) => void;
	backColor: OptionType;
	changeWidth: (option: OptionType) => void;
	width: OptionType;
};

export const ArticleParamsForm = (props: TForms) => {
	const [asideOpen, setAsideOpen] = useState(false);
	const aside = useRef<HTMLElement>(null);

	function clickOutside(e: MouseEvent) {
		if (
			asideOpen &&
			aside.current &&
			!aside.current.contains(e.target as HTMLElement)
		) {
			setAsideOpen(false);
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', clickOutside);
		return () => {
			document.removeEventListener('mousedown', clickOutside);
		};
	}, [asideOpen]);
	function clickArrow() {
		setAsideOpen((prev) => !prev);
	}

	return (
		<>
			<ArrowButton
				isOpen={asideOpen}
				onClick={() => {
					clickArrow();
				}}
			/>
			<aside
				ref={aside}
				className={clsx(styles.container, asideOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={props.applyStyles}
					onReset={props.reset}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						onChange={props.changeFont}
						options={fontFamilyOptions}
						selected={props.fonts}
					/>
					<RadioGroup
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={props.fontSize}
						title='Размер шрифта'
						onChange={props.changeSize}
					/>
					<Select
						title='Цвет шрифта'
						onChange={props.changeFontColor}
						options={fontColors}
						selected={props.fontColor}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						onChange={props.changeBackColor}
						options={backgroundColors}
						selected={props.backColor}
					/>
					<Select
						title='Ширина контента'
						onChange={props.changeWidth}
						options={contentWidthArr}
						selected={props.width}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
