import React, { useContext, useRef, useEffect, useState } from 'react'
import { AppContext } from '../AppContext';
import { Audios, QuranAudios } from '../data/Audios';
import { FontAwesome } from '../data/FontAwesome';

export default function AudioPlayer() {

    const { time, locationSettings, dol, setIsAudioPlaying } = useContext(AppContext)
    const playerDiv = useRef(null)
    const playButtonDiv = useRef(null)
    const audioPlayer = useRef(null)
    const endButton = useRef(null)
    const [isPaused, setIsPaused] = useState(false)

    useEffect(() => {

        if (!audioPlayer.current.paused) {
            dol('Already playing audio.')
            return;
        }

        let AU = JSON.parse(localStorage.getItem("AAA"));
        if (AU) {
            if (AU.time === time) {
                if (!AU.isPlayed) {
                    AU.isPlayed = true;
                    localStorage.setItem("AAA", JSON.stringify({ ...AU }));
                    let audio = Audios.find(a => a.id === AU.id);
                    audioPlayer.current.src = audio.source;

                    let promise = audioPlayer.current.play();
                    if (promise) {
                        promise.then(_ => {
                            // autoplay started!
                            dol('Azan called: ' + locationSettings.address);
                            playerDiv.current.style.visibility = 'visible';
                            playButtonDiv.current.style.visibility = 'hidden';
                        }).catch(error => {
                            dol(error);
                            playerDiv.current.style.visibility = 'hidden';
                            playButtonDiv.current.style.visibility = 'visible';
                                                    });
                    }
                }
            }
            else {
                localStorage.removeItem("AAA");
                playButtonDiv.current.style.visibility = 'hidden';
                            }

        }


        let QA = JSON.parse(localStorage.getItem("QuranAudio"));
        if (QA) {
            localStorage.removeItem("QuranAudio");
            let audio = QuranAudios.find(a => a.id === QA.id);
            audioPlayer.current.src = audio.mp3;

            let promise = audioPlayer.current.play();
            if (promise) {
                promise.then(_ => {
                    // autoplay started!
                    playerDiv.current.style.visibility = 'visible';
                    playButtonDiv.current.style.visibility = 'hidden';
                }).catch(error => {
                    dol(error);
                    playerDiv.current.style.visibility = 'hidden';
                    playButtonDiv.current.style.visibility = 'visible';
                                    });
            }
        }

    })

    const stopAudio = () => {
        setIsAudioPlaying(false);
        audioPlayer.current.pause();
        audioPlayer.current.currentTime = 0;
        playerDiv.current.style.visibility = 'hidden';
        playButtonDiv.current.style.visibility = 'hidden';
        endButton.current.style.display = 'none';
            }

    const togglePause = () => {
        if (audioPlayer.current.paused)
            playAudio();
        else
            audioPlayer.current.pause();
    }

    const audioPaused = () => {
        if (audioPlayer.current.ended) return;
        setIsAudioPlaying(false);
        setIsPaused(true);
        endButton.current.style.display = 'block';
    }

    const audioPlayed = () => {
        setIsAudioPlaying(true)
        setIsPaused(false);
        endButton.current.style.display = 'none';
    }

    const playAudio = () => {
        audioPlayer.current.play();
        playerDiv.current.style.visibility = 'visible';
        playButtonDiv.current.style.visibility = 'hidden';
    }

    return (
        <>
            <audio id="audioPlayer" src='' ref={audioPlayer} onPlay={audioPlayed} onPause={audioPaused} onEnded={stopAudio} style={{ display: 'none' }} />
            <div ref={playerDiv} className="audioPlayerFixed">
                <div className='d-flex flex-row gap-3'>
                    <button className='btn btn-light audioPlayerBtn' onClick={togglePause}>{isPaused ? FontAwesome.Play : FontAwesome.Pause}</button>
                    <button ref={endButton} className='btn btn-danger audioPlayerBtn' onClick={stopAudio}>{FontAwesome.Stop}</button>
                </div>
            </div>
            <div ref={playButtonDiv} onClick={playAudio} className="audioButtonDiv">
                <div className='d-flex h-100 justify-content-start align-items-top'>
                    <div className='fs-4 text-light p-2'>
                        {FontAwesome.Play} Tap screen to play audio
                    </div>
                </div>
            </div>
        </>
    )
}
