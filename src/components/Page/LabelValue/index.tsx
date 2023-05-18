import { _cs } from '@togglecorp/fujs';
import styles from './styles.module.css';

interface Props {
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
    } = props;

    return (
        <div className={styles.labelValue}>
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
