import styles from './styles.module.css';

interface Props {
    label: React.ReactNode;
    value: React.ReactNode;
}

function LabelValue(props: Props) {
    const {
        label,
        value,
    } = props;

    return (
        <div className={styles.labelValue}>
            <div>
                {label}
            </div>
            <div>
                {value}
            </div>
        </div>
    );
}

export default LabelValue;
