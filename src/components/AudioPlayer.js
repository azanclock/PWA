import React, { useContext, useRef, useEffect } from 'react'
import { AppContext } from '../AppContext';
import { Audios, QuranAudios } from '../data/Audios';
import { FontAwesome } from '../data/FontAwesome';

export default function AudioPlayer() {

    const { time, locationSettings, dol, setIsAudioPlaying } = useContext(AppContext)
    const playerDiv = useRef(null)
    const audioTitle = useRef(null)
    const playButtonDiv = useRef(null)
    const audioPlayer = useRef(null)
    const pauseButton = useRef(null)
    const endButton = useRef(null)

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
                    audioTitle.current.innerHTML = audio.name;
                    let promise = audioPlayer.current.play();
                    if (promise) {
                        promise.then(_ => {
                            // autoplay started!
                            dol('Adhan called: ' + locationSettings.address);
                            playerDiv.current.style.visibility = 'visible';
                            playButtonDiv.current.style.visibility = 'hidden';
                        }).catch(error => {
                            dol(error);
                            playerDiv.current.style.visibility = 'hidden';
                            playButtonDiv.current.style.visibility = 'visible';
                            audioTitle.current.innerHTML = '';
                        });
                    }
                }
            }
            else {
                localStorage.removeItem("AAA");
                playButtonDiv.current.style.visibility = 'hidden';
                audioTitle.current.innerHTML = '';
            }

        }


        let QA = JSON.parse(localStorage.getItem("QuranAudio"));
        if (QA) {
            localStorage.removeItem("QuranAudio");
            let audio = QuranAudios.find(a => a.id === QA.id);
            audioPlayer.current.src = audio.mp3;
            audioTitle.current.innerHTML = 'Surah ' + audio.name;
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
                    audioTitle.current.innerHTML = '';
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
        endButton.current.style.visibility = 'hidden';
        audioTitle.current.innerHTML = '';
    }

    const togglePause = () => {
        if (audioPlayer.current.paused)
            playAudio();
        else
            audioPlayer.current.pause();
    }

    const audioPaused = () => {
        setIsAudioPlaying(false);
        pauseButton.current.innerHTML = 'Continue';
        endButton.current.style.visibility = 'visible';
    }

    const audioPlayed = () => {
        setIsAudioPlaying(true)
        pauseButton.current.innerHTML = 'Pause';
        endButton.current.style.visibility = 'hidden';
    }

    const playAudio = () => {
        audioPlayer.current.play();
        playerDiv.current.style.visibility = 'visible';
        playButtonDiv.current.style.visibility = 'hidden';
    }

    return (
        <>
            <div ref={playerDiv} className="audioButtonDiv">
                <div className='d-flex flex-row justify-content-start p-3'>
                    <div className='d-flex flex-column align-items-center gap-3'>
                        <div className="text-light text-center" ref={audioTitle}></div>
                        <div>
                            <audio controls id="audioPlayer" src='' ref={audioPlayer} onPlay={audioPlayed} onPause={audioPaused} onEnded={stopAudio} />
                        </div>
                        <div><button ref={pauseButton} className='btn btn-lg btn-light px-5' onClick={togglePause}></button></div>
                        <div><button ref={endButton} className='btn btn-lg btn-danger px-5' onClick={stopAudio}>End</button></div>
                    </div>
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
