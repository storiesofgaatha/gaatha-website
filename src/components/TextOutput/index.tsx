import { _cs } from '@togglecorp/fujs';
import styles from './styles.module.css';

interface Props {
    className?: string;
    label?: string;
    value: string;
    labelClassName?: string;
    valueClassName?: string;
    multiline?: boolean;
}

function TextOutput(props: Props) {
    const {
        className,
        label,
        labelClassName,
        value,
        valueClassName,
        multiline = false,
    } = props;
    return (
        <div
            className={_cs(
                className,
                styles.textOutput,
                multiline && styles.multiline,
            )}
        >
            <div className={_cs(labelClassName)}>
                {label}
            </div>
            <div className={_cs(styles.value, valueClassName)}>
                {value}
            </div>
        </div>
    );
}

export default TextOutput;
