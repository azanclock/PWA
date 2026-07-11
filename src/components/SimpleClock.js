import React, { useContext } from 'react'
import { AppContext } from '../AppContext';

export default function SimpleClock() {

    const { todaysDate, hijriDate, vakits, currentVakit, nextVakit,
        displayTime, elapsed, nextText, dim, clockOpacity } = useContext(AppContext)

    return (
        <div id="simpleClock" className={dim === 1 ? 'dim' : ''} style={{ opacity: clockOpacity }}>

            {dim !== 1 &&
                <div className="sc-dates">{todaysDate} <span className="sc-dot">·</span> {hijriDate}</div>}

            <div className="sc-time">{displayTime}</div>

            <div className="sc-next">{nextVakit.name} in {nextText}</div>

            <div className="sc-elapsed">Elapsed {elapsed}</div>

            {dim !== 1 &&
                <div className="sc-vakits">
                    {vakits.map(v => (
                        <div key={v.name}
                            className={'sc-vakit-item' + (v.name === currentVakit.name ? ' current' : '')}
                            style={{ borderTopColor: v.name === currentVakit.name ? v.color : 'transparent' }}>
                            <div className="sc-vakit-name">{v.name}</div>
                            <div className="sc-vakit-time">{v.displayTime}</div>
                        </div>
                    ))}
                </div>}

        </div>
    )
}
