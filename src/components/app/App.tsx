import { CSSProperties, FormEvent, useState } from 'react';
import clsx from 'clsx';
import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import { defaultArticleState, OptionType } from 'src/constants/articleProps';
import 'src/styles/index.scss';
import styles from 'src/styles/index.module.scss';

export const App = () => {
	const [fonts, setFonts] = useState(defaultArticleState.fontFamilyOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backColor, setBackColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [width, setWidth] = useState(defaultArticleState.contentWidth);
	const [fontSize, setfontSize] = useState(defaultArticleState.fontSizeOption);
	const [style, setStyle] = useState({
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	} as CSSProperties);

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
		setStyle({
			'--font-family': fonts.value,
			'--font-size': fontSize.value,
			'--font-color': fontColor.value,
			'--container-width': width.value,
			'--bg-color': backColor.value,
		} as CSSProperties);
	};

	function reset() {
		setStyle({
			'--font-family': defaultArticleState.fontFamilyOption.value,
			'--font-size': defaultArticleState.fontSizeOption.value,
			'--font-color': defaultArticleState.fontColor.value,
			'--container-width': defaultArticleState.contentWidth.value,
			'--bg-color': defaultArticleState.backgroundColor.value,
		} as CSSProperties);
		setFonts(defaultArticleState.fontFamilyOption);
		setfontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setWidth(defaultArticleState.contentWidth);
		setBackColor(defaultArticleState.backgroundColor);
	}

	return (
		<main className={clsx(styles.main)} style={style}>
			<ArticleParamsForm
				applyStyles={applyStyles}
				reset={reset}
				fonts={fonts}
				changeFont={changeFont}
				fontSize={fontSize}
				changeSize={changeSize}
				changeFontColor={changeFontColor}
				fontColor={fontColor}
				changeBackColor={changeBackColor}
				backColor={backColor}
				changeWidth={changeWidth}
				width={width}></ArticleParamsForm>
			<Article />
		</main>
	);
};
