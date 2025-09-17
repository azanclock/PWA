import React, { useContext } from 'react'
import { AppContext } from '../AppContext';

export default function Options(props) {

    const { updateSettings, calculationSettings, azanSettings, deviceSettings, offsetSettings } = useContext(AppContext)

    function updateValue(v) {
        let settingName = props.name.split('.')[0];
        let fieldName = props.name.split('.')[1];
        let newSetting = {};
        newSetting[fieldName] = v;
        let finalSettings = {};
        finalSettings[settingName] = { ...eval(settingName), ...newSetting };
        updateSettings({ ...finalSettings });
    }

    return (
        <>
            <div className="btn-group col-12" role="group">
                {props.values.map(o => (
                    <button title={o.description} className={'btn btn-sm ' + (o.id === props.selectedValue ? "btn-primary" : "btn-light")}
                        onClick={() => { updateValue(o.id); document.activeElement.blur(); }} key={o.id}>{o.name}</button>
                ))}
            </div>
        </>
    )

}
