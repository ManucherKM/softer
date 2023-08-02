// Styles
import classes from './Input.module.scss'

export const Input = props => {
	return <input type="text" className={classes.input} {...props} />
}
