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
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

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

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    }

    const onTimeUpdate = () => {
        setCurrentTime(audioPlayer.current.currentTime);
    }

    const onLoadedMetadata = () => {
        setDuration(audioPlayer.current.duration);
    }

    const onSliderChange = (e) => {
        const time = parseFloat(e.target.value);
        audioPlayer.current.currentTime = time;
        setCurrentTime(time);
    }

    const rewind5 = () => {
        audioPlayer.current.currentTime = Math.max(0, audioPlayer.current.currentTime - 5);
    }

    const playAudio = () => {
        audioPlayer.current.play();
        playerDiv.current.style.visibility = 'visible';
        playButtonDiv.current.style.visibility = 'hidden';
    }

    return (
        <>
            <audio id="audioPlayer" src='' ref={audioPlayer} onPlay={audioPlayed} onPause={audioPaused} onEnded={stopAudio} onTimeUpdate={onTimeUpdate} onLoadedMetadata={onLoadedMetadata} style={{ display: 'none' }} />
            <div ref={playerDiv} className="audioPlayerFixed">
                <div className='d-flex flex-row gap-3'>
                    <button className='btn btn-light audioPlayerBtn' onClick={togglePause}>{isPaused ? FontAwesome.Play : FontAwesome.Pause}</button>
                    {isPaused && <button className='btn btn-light audioPlayerBtn' onClick={rewind5}>{FontAwesome.Backward} 5s</button>}
                    <button ref={endButton} className='btn btn-light audioPlayerBtn' onClick={stopAudio}>{FontAwesome.Stop}</button>
                </div>
                <div className='d-flex align-items-center gap-2 mt-2 w-100'>
                    <input type='range' className='flex-grow-1' min={0} max={duration} step={0.1} value={currentTime} onChange={onSliderChange} />
                    <span className='text-light' style={{fontSize: '0.85rem', whiteSpace: 'nowrap'}}>{formatTime(currentTime)} / {formatTime(duration)}</span>
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
