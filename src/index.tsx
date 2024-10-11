import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from './constants/articleProps';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
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
	const applyStyles = (event: any) => {
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
			<ArticleParamsForm applyStyles={applyStyles} reset={reset}>
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
			</ArticleParamsForm>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
