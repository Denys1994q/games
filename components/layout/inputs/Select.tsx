import styles from "./selects.module.sass";

import { ISelect } from "./Select.props";

const Select = ({ options, setGamesPerPage }: ISelect): JSX.Element => {
    const contentOptions = options.map((item, index) => {
        return (
            <option key={index} value={item}>
                {item}
            </option>
        );
    });

    return (
        <select name='pages' onChange={e => setGamesPerPage(+e.target.value)} className={styles.selectPages}>
            {contentOptions}
        </select>
    );
};

export default Select;
