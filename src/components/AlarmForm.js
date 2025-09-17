import React, { useContext, useRef } from 'react'
import { AppContext } from '../AppContext';
import { FontAwesome } from '../data/FontAwesome';
import { AlarmSetting, AlarmAudios } from '../data/Audios'
import { Hours, Minutes } from '../data/Common';

export default function AlarmForm() {

    const { alarmSettings, naflAlarmSettings, updateSettings, isWeekDay } = useContext(AppContext)
    const newAlarm = useRef({})

    function saveAlarm() {
        let nar = new AlarmSetting(newAlarm.current.id.value * 1, newAlarm.current.frequency.value, newAlarm.current.hour.value, newAlarm.current.minute.value, newAlarm.current.ap.value);
        let existingIndex = alarmSettings.findIndex(f => f.hour === nar.hour && f.minute === nar.minute && f.ap === nar.ap && f.frequency === nar.frequency)
        if (existingIndex >= 0) {
            alarmSettings.splice(existingIndex, 1)
        }
        alarmSettings.push({ ...nar });
        updateSettings({ alarmSettings: alarmSettings })
        document.activeElement.blur();
    }

    return (

        <div>
            <div>
                <select ref={(element) => newAlarm.current.id = element} className='form-control form-control-sm'>
                    {AlarmAudios.map((q) => (<option key={'au' + q.id} value={q.id}>{q.name}</option>))}
                </select>
            </div>
            <p></p>
            <div className='d-flex flex-row justify-content-start align-items-center gap-1'>
                <div>
                    <select ref={(element) => newAlarm.current.frequency = element} className='form-control form-control-sm'>
                        <option value='W'>Weekdays</option>
                        <option value='E'>Everyday</option>
                    </select>
                </div>
                <div className='small'>at</div>
                <div>
                    <select ref={(element) => newAlarm.current.hour = element} className='form-control form-control-sm'>
                        {Hours.map((each, index) => (<option key={'hour' + index} value={index + 1}>{index + 1}</option>))}
                    </select>
                </div>
                <div className='flex-shrink-1 small'>:</div>
                <div>
                    <select ref={(element) => newAlarm.current.minute = element} className='form-control form-control-sm'>
                        {Minutes.map((each, index) => {
                            let mv = index < 10 ? '0' + index : index;
                            return (<option key={'minute' + mv} value={mv}>{mv}</option>)
                        })}
                    </select>
                </div>
                <div>
                    <select ref={(element) => newAlarm.current.ap = element} className='form-control form-control-sm'>
                        <option>am</option>
                        <option>pm</option>
                    </select>
                </div>
                <div>
                    <button onClick={saveAlarm} className='btn btn-sm btn-warning col-12'>{FontAwesome.Plus}</button>
                </div>
            </div>
        </div>

    )
}
