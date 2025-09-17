import React from 'react'
import { FontAwesome } from '../data/FontAwesome';
import AlarmForm from './AlarmForm';
import NaflAlarmForm from './NaflAlarmForm';
import AlarmList from './AlarmList';

export default function Alarms() {

    return (

        <div className='subMenu'>
            <div className='mb-3'>
                <ul className="nav nav-pills" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link btn-sm rounded-0 rounded-top active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#add-alarm" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                            {FontAwesome.Plus} Alarm
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link btn-sm rounded-0 rounded-top" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#add-nafl-alarm" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                            {FontAwesome.Plus} Nafl Prayer Alarm
                        </button>
                    </li>
                </ul>
                <div className="tab-content bg-primary rounded-bottom rounded-end px-2 py-3" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="add-alarm" role="tabpanel" aria-labelledby="pills-home-tab">
                        <AlarmForm />
                    </div>
                    <div className="tab-pane fade" id="add-nafl-alarm" role="tabpanel" aria-labelledby="pills-profile-tab">
                        <NaflAlarmForm />
                    </div>
                </div>
            </div>


            <AlarmList />


        </div>

    )
}
