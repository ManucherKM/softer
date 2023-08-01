import { useState } from 'react'
import classes from './UploadFile.module.scss'

export const UploadFile = () => {
	const [files, setFiles] = useState([])
	const [isDrag, setIsDrag] = useState(false)
	const styles = [classes.label, isDrag && classes.active].join(' ')

	function dragOverHandler(e) {
		e.preventDefault()
		setFiles(e.dataTransfer.files)
	}

	function dragLeaveHandler() {
		setIsDrag()
	}

	function dropHandler(e) {
		e.preventDefault()
	}

	return (
		<label
			className={styles}
			title='Нажми чтобы выбрать файлы или перетяни их в этот блок.'
			onDragLeave={dragLeaveHandler}
			onDragOver={dragOverHandler}
			onDrop={dropHandler}
		>
			<span>Загружено файлов: {files.length}</span>
			<input type='file' />
		</label>
	)
}
