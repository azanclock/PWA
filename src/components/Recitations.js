import React, { useContext } from 'react'
import { QuranAudios } from '../data/Audios'
import { FontAwesome } from '../data/FontAwesome';
import { AppContext } from '../AppContext';

export default function Recitations() {

    const { reciteQuranAudio, showMsg } = useContext(AppContext)

    return (
        <div>

            <h5>Qur'an Recitations</h5>
            {QuranAudios.map((q) => (<button key={'Q' + q.id} type='button'
                className='btn btn-sm btn-primary my-2 col-12 text-start' onClick={() => {
                    reciteQuranAudio(q.id);
                    showMsg('Recitation by ' + q.reciter + ' will begin in about 10 seconds inshaAllah.');
                    document.activeElement.blur();
                }}>
                <div title={q.reciter} className='d-flex flex-row justify-content-between p-1 gap-3'>
                    <div className='pt-1'>{FontAwesome.Play}</div>
                    <div className='flex-grow-1'>
                        <span className='fs-6'>Surah {q.name}</span>
                        <br />
                        <small>by {q.reciter}</small>
                    </div>
                    <div>{q.id}</div>
                </div>

            </button>))}

            <p></p>

            <a href="https://mp3quran.net/eng/maher" className='btn btn-sm btn-light col-12' target="_blank"><b>mp3Quran.net</b></a>

        </div>
    )
}
