import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
type TForms = {
	setStyle: (properties: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: TForms) => {
	const [asideOpen, setAsideOpen] = useState(false);
	const [fonts, setFonts] = useState(defaultArticleState.fontFamilyOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backColor, setBackColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [width, setWidth] = useState(defaultArticleState.contentWidth);
	const [fontSize, setfontSize] = useState(defaultArticleState.fontSizeOption);
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

	function changeFont(option: OptionType) {
		setFonts(option);
	}
	function changeFontColor(option: OptionType) {
		setFontColor(option);
	}
	function changeBackColor(option: OptionType) {
		setBackColor(option);
	}
	function changeWidth(option: OptionType) {
		setWidth(option);
	}
	function changeSize(option: OptionType) {
		setfontSize(option);
	}
	const applyStyles = (event: FormEvent) => {
		event.preventDefault();
		props.setStyle({
			fontFamilyOption: fonts,
			fontColor: fontColor,
			backgroundColor: backColor,
			contentWidth: width,
			fontSizeOption: fontSize,
		});
	};

	function reset() {
		props.setStyle({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
			fontSizeOption: defaultArticleState.fontSizeOption,
		});
		setFonts(defaultArticleState.fontFamilyOption);
		setfontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setWidth(defaultArticleState.contentWidth);
		setBackColor(defaultArticleState.backgroundColor);
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
				<form className={styles.form} onSubmit={applyStyles} onReset={reset}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						onChange={changeFont}
						options={fontFamilyOptions}
						selected={fonts}
					/>
					<RadioGroup
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={fontSize}
						title='Размер шрифта'
						onChange={changeSize}
					/>
					<Select
						title='Цвет шрифта'
						onChange={changeFontColor}
						options={fontColors}
						selected={fontColor}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						onChange={changeBackColor}
						options={backgroundColors}
						selected={backColor}
					/>
					<Select
						title='Ширина контента'
						onChange={changeWidth}
						options={contentWidthArr}
						selected={width}
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
