import { _cs } from '@togglecorp/fujs';
import styles from './styles.module.css';

interface Props {
    className?: string;
    label: React.ReactNode;
    value: React.ReactNode;
    labelClassName?: string;
    valueClassName?: string;
}

function LabelValue(props: Props) {
    const {
        label,
        value,
        labelClassName,
        valueClassName,
        className,
    } = props;

    return (
        <div className={_cs(styles.labelValue, className)}>
            <div className={_cs(styles.label, labelClassName)}>
                {label}
            </div>
            <div className={valueClassName}>
                {value}
            </div>
        </div>
    );
}

export default LabelValue;
