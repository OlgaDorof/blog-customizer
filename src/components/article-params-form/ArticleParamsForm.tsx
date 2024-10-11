import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { ReactNode, useEffect, useRef, useState } from 'react';

type TForms = {
	applyStyles: (event: any) => void;
	reset: () => void;
	children: ReactNode;
};

export const ArticleParamsForm = (props: TForms) => {
	const [asideOpen, setAsideOpen] = useState(false);
	const aside = useRef<HTMLElement>(null);

	function clickOutside(e: MouseEvent) {
		if (aside.current && !aside.current.contains(e.target as HTMLElement)) {
			setAsideOpen(false);
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', clickOutside);
		return () => {
			document.removeEventListener('mousedown', clickOutside);
		};
	}, []);
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
			{asideOpen && (
				<aside
					ref={aside}
					className={clsx(styles.container, {
						[styles.container_open]: asideOpen,
					})}>
					<form className={styles.form} onSubmit={props.applyStyles}>
						{props.children}
						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={props.reset}
							/>
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
