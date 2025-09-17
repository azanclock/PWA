import React, { useContext, useRef } from 'react'
import { AppContext } from '../AppContext';
import { FontAwesome } from '../data/FontAwesome';
import { Audios, NaflAlarmSetting, AlarmAudios } from '../data/Audios'
import { Minutes } from '../data/Common';

export default function NaflAlarmForm() {

    const { alarmSettings, naflAlarmSettings, updateSettings, isWeekDay } = useContext(AppContext)

    const newNaflAlarm = useRef({})

    function saveNaflAlarm() {
        let nar = new NaflAlarmSetting(newNaflAlarm.current.id.value * 1, newNaflAlarm.current.minutes.value, newNaflAlarm.current.when.value, newNaflAlarm.current.vakit.value);
        let existingIndex = naflAlarmSettings.findIndex(f => f.minutes === nar.minutes && f.when === nar.when && f.vakit === nar.vakit)
        if (existingIndex >= 0) {
            naflAlarmSettings.splice(existingIndex, 1)
        }
        naflAlarmSettings.push({ ...nar });
        updateSettings({ naflAlarmSettings: naflAlarmSettings })
        document.activeElement.blur();
    }


    return (

        <div>
            <select ref={(element) => newNaflAlarm.current.id = element} className='form-control form-control-sm'>
                {AlarmAudios.map((q) => (<option key={'aaid' + q.id} value={q.id}>{q.name}</option>))}
                {Audios.filter(f => !f.isAlarm).map((q) => (<option key={'aaid' + q.id} value={q.id}>{q.name}</option>))}
            </select>
            <p></p>
            <div className='d-flex flex-row justify-content-between'>
                <div className='flex-shrink-1 small pt-1'>
                    Everyday
                </div>
                <div>
                    <select ref={(element) => newNaflAlarm.current.minutes = element} className='form-control form-control-sm'>
                        {Minutes.map((each, index) => {
                            let tm = index + 1;
                            return (<option key={'minute' + tm} value={tm}>{tm} min{(tm > 1 ? 's' : '')}</option>)
                        })}
                    </select>
                </div>
                <div>
                    <select ref={(element) => newNaflAlarm.current.when = element} className='form-control form-control-sm'>
                        <option>before</option>
                        <option>after</option>
                    </select>
                </div>
                <div>
                    <select ref={(element) => newNaflAlarm.current.vakit = element} className='form-control form-control-sm'>
                        <option>Fajr</option>
                        <option>Sunrise</option>
                        <option>Dhuhr</option>
                        <option>Asr</option>
                        <option>Maghrib</option>
                        <option>Isha</option>
                        <option>1/3 of Night</option>
                        <option>Midnight</option>
                        <option>2/3 of Night</option>
                    </select>
                </div>
                <div>
                    <button onClick={saveNaflAlarm} className='btn btn-sm btn-warning col-12'>{FontAwesome.Plus}</button>
                </div>
            </div>
        </div>

    )
}
