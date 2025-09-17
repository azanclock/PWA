import React, { useContext } from 'react'
import { AppContext } from '../AppContext';
import { FontAwesome } from '../data/FontAwesome';
import { Audios } from '../data/Audios'

export default function AlarmList() {

    const { alarmSettings, naflAlarmSettings, updateSettings, isWeekDay } = useContext(AppContext)

    function removeAlarm(index) {
        if (alarmSettings) {
            alarmSettings.splice(index, 1)
            updateSettings({ alarmSettings: alarmSettings })
        }
    }

    function removeNaflAlarm(index) {
        if (naflAlarmSettings) {
            naflAlarmSettings.splice(index, 1)
            updateSettings({ naflAlarmSettings: naflAlarmSettings })
        }
    }

    return (
        <div>
            {(alarmSettings) ? alarmSettings.map((a, index) => {

                let audioName = Audios.filter(f => f.id === a.id)[0]?.name

                return (
                    <div key={'ar' + index} className="card border-1 border-secondary mb-3 bg-dark text-light">
                        <div className="card-body">
                            <div className='d-flex flex-row justify-content-between align-items-center'>
                                <div>
                                    <span className={((a.frequency === 'W' && isWeekDay || a.frequency === 'E') ? 'alarm-dot' : 'gray-dot')}></span> <b>{audioName}</b>
                                    <br />
                                    {(a.frequency === 'W' ? 'Weekdays' : 'Everyday')} at {a.hour}:{a.minute}{a.ap}
                                </div>
                                <div><button onClick={() => { removeAlarm(index) }} className='btn btn-sm btn-danger'>{FontAwesome.Close}</button></div>
                            </div>
                        </div>
                    </div>
                )

            }) : null}

            {(naflAlarmSettings) ? naflAlarmSettings.map((a, index) => {

                let audioName = Audios.filter(f => f.id === a.id)[0]?.name

                return (
                    <div key={'nar' + index} className="card border-1 border-secondary mb-3 bg-dark text-light">
                        <div className="card-body">
                            <div className='d-flex flex-row justify-content-between align-items-center'>
                                <div>
                                    <span className='nafl-alarm-dot'></span> <b>{audioName}</b>
                                    <br />
                                    {a.minutes} min{a.minutes > 1 ? 's' : ''} {a.when} {a.vakit}
                                </div>
                                <div><button onClick={() => { removeNaflAlarm(index) }} className='btn btn-sm btn-danger'>{FontAwesome.Close}</button></div>
                            </div>
                        </div>
                    </div>
                )

            }) : null}

        </div>
    )
}
