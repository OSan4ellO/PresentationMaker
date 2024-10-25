import styles from './TopPanel.module.css'
import {Button} from '../../store/button/Button'

type TopPanelProps = {
	title: string,
}

function TopPanel({title} : TopPanelProps) {
	return
		<div>
			<div className={styles.topPanel}>
            <input className={styles.title} type="text" defaultValue={title} />
            <div>
                <Button className={styles.button} text={'Добавить слайд'} ></Button>
                <Button className={styles.button} text={'Удалить слайд'} ></Button>
            </div>
        </div>
		</div>
}

export {
	TopPanel,
}