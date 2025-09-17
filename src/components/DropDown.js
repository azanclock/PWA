import React, { useContext } from 'react'
import { AppContext } from '../AppContext';

export default function DropDown(props) {

    const { updateSettings, calculationSettings, azanSettings, deviceSettings, offsetSettings } = useContext(AppContext)

    function updateValue(e) {
        let settingName = e.target.name.split('.')[0];
        let fieldName = e.target.name.split('.')[1];
        let newSetting = {};
        let finalSettings = {};
        newSetting[fieldName] = e.target.value;
        finalSettings[settingName] = { ...eval(settingName), ...newSetting };
        document.activeElement.blur();
        updateSettings({ ...finalSettings });
    }

    return (
        <select onChange={updateValue} name={props.name} id={props.name} value={props.selectedValue}
            className='form-control form-control-sm'>
            {props.values.map(o => (
                <option value={o.id} key={o.id}>{o.name}</option>
            ))}
        </select>
    )

}
