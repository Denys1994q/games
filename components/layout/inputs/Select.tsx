import styles from "./selects.module.sass";

import { ISelect } from "./Select.props";

const Select = ({ options, changeAction }: ISelect): JSX.Element => {
    const contentOptions = options.map((item, index) => {
        return (
            <option key={index} value={item}>
                {item}
            </option>
        );
    });

    return (
        <select onChange={e => changeAction?.(e)} className={styles.selectPages}>
            {contentOptions}
        </select>
    );
};

export default Select;
