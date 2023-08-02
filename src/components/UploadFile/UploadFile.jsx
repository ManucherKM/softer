// Components
import { Spinner } from '../Spinner/Spinner'

// Styles
import classes from './UploadFile.module.scss'

// Utils
import { useEffect, useState } from 'react'
import { useStore } from '@/store'
import clsx from 'clsx'

export const UploadFile = props => {
	// State in which files are stored
	const [files, setFiles] = useState([])

	// Status to loading.
	const [loading, setLoading] = useState(false)

	// The state by which we determine whether the user is dragging and dropping files.
	const [isDrag, setIsDrag] = useState(false)

	// Status for the error list.
	const [error, setError] = useState([])

	// The function with which we send files to Yandex disk.
	const sendFiles = useStore(state => state.sendFiles)

	// Handler function for the "drag over" event.
	function dragOverHandler(e) {
		// Prevent browser events by default.
		e.preventDefault()

		// Change the "isDrag" state to true.
		setIsDrag(true)
	}

	// Handler function for the "drag leave" event.
	function dragLeaveHandler() {
		// Change the "isDrag" state to false.
		setIsDrag(false)
	}

	// Handler function for the "drop" event.
	function dropHandler(e) {
		// Prevent browser events by default.
		e.preventDefault()

		// The message that will be sent when the number of files is exceeded.
		const msg = 'Превышен лимит количества файлов'

		// Files that the user has transferred.
		const currentFiles = e.dataTransfer.files

		// Add an error if there are more than 100 files.
		if (currentFiles.length > 100) {
			// We add our error to the list of errors first.
			setError(p => [msg, ...p])

			// Change the "isDrag" state to false.
			setIsDrag(false)

			return
		}

		// If there are less than 100 files, we check if there is an error with the text from "msg" in the array with errors.
		if (error[0] === msg) {
			const updateError = [...error]

			// Remove the first error from the array.
			updateError.pop()

			// Change the "error" state
			setError(updateError)
		}

		// Change the state of "files".
		setFiles(currentFiles)

		// Change the "isDrag" state to false.
		setIsDrag(false)
	}

	function changeHandler(e) {
		// The message that will be sent when the number of files is exceeded.
		const msg = 'Превышен лимит количества файлов'

		// The files the user has selected.
		const currentFiles = e.target.files

		// Add an error if there are more than 100 files.
		if (currentFiles.length > 100) {
			// We add our error to the list of errors first.
			setError(p => [msg, ...p])

			return
		}

		// If there are less than 100 files, we check if there is an error with the text from "msg" in the array with errors.
		if (error[0] === msg) {
			const updateError = [...error]

			// Remove the first error from the array.
			updateError.pop()

			// Change the "error" state
			setError(updateError)
		}

		// Change the state of "files".
		setFiles(currentFiles)
	}

	// Each time the files are changed, we send them to Yandex disk.
	useEffect(() => {
		if (files.length !== 0) {
			const fetchFiles = async () => {
				// Changing the loading state.
				setLoading(true)

				// Send files
				await sendFiles(files)

				// Changing the loading state.
				setLoading(false)
			}

			fetchFiles()
		}
	}, [files])

	// We take out the used styles in a variable.
	const styles = clsx([
		classes.label,
		isDrag && classes.active,
		error.length && classes.error,
	])
	return (
		<label
			className={styles}
			title="Нажми чтобы выбрать файлы или перетяни их в этот блок."
			onDragLeave={dragLeaveHandler}
			onDragOver={dragOverHandler}
			onDrop={dropHandler}
		>
			{loading ? (
				<Spinner />
			) : (
				<>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="40"
						viewBox="0 0 32 40"
						fill="none"
					>
						<path
							d="M18 14V3L29 14M4 0C1.78 0 0 1.78 0 4V36C0 37.0609 0.421427 38.0783 1.17157 38.8284C1.92172 39.5786 2.93913 40 4 40H28C29.0609 40 30.0783 39.5786 30.8284 38.8284C31.5786 38.0783 32 37.0609 32 36V12L20 0H4Z"
							fill="#BC98EA"
						/>
					</svg>
					<span>
						{error.length !== 0
							? error[0]
							: `Загружено файлов: ${files.length}`}
					</span>
					<input
						type="file"
						multiple
						onChange={changeHandler}
						min={1}
						max={100}
						{...props}
					/>
				</>
			)}
		</label>
	)
}
