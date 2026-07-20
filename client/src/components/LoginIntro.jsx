import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../styles/loginIntro.css";

import smoke from "../assets/audio/whoosh1.mp3";

function LoginIntro({ show = false, onFinish }) {

    const leftSmoke = useRef(null);
    const rightSmoke = useRef(null);

    const welcome = useRef(null);
    const brand = useRef(null);

    useEffect(() => {

        if (!show) return;

        let audio;

        try {

            audio = new Audio(smoke);
            audio.volume = 0.7;
            audio.play().catch(() => { });

        } catch (err) {

            console.log(err);

        }

        gsap.set(".login-intro", {
            perspective: 1800
        });

        const pulse = gsap.to(".smoke", {

            scale: 1.05,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"

        });

        const tl = gsap.timeline({

            onComplete: () => {

                pulse.kill();

                if (audio) {

                    audio.pause();
                    audio.currentTime = 0;

                }

                onFinish?.();

            }

        });

        // =========================
        // SMOKE MASUK
        // =========================

        tl.fromTo(

            leftSmoke.current,

            {

                x: -900,
                opacity: 0

            },

            {

                x: 320,
                opacity: 1,
                duration: 2.2,
                ease: "power4.out"

            }

        );

        tl.fromTo(

            rightSmoke.current,

            {

                x: 900,
                opacity: 0

            },

            {

                x: -320,
                opacity: 1,
                duration: 2.2,
                ease: "power4.out"

            },

            "<"

        );

        // =========================
        // TABRAKAN ASAP
        // =========================

        tl.to(".smoke", {

            scale: 1.18,
            duration: .25

        });

        tl.to(".smoke", {

            scale: 1,
            duration: .25

        });

        // =========================
        // WELCOME
        // =========================

        tl.fromTo(

            welcome.current,

            {

                x: -500,
                rotateY: -90,
                opacity: 0

            },

            {

                x: 0,
                rotateY: 0,
                opacity: 1,
                duration: 1

            },

            "-=.15"

        );

        // =========================
        // CHROMIXHEART
        // =========================

        tl.fromTo(

            brand.current,

            {

                x: 500,
                rotateY: 90,
                opacity: 0

            },

            {

                x: 0,
                rotateY: 0,
                opacity: 1,
                duration: 1

            },

            "<"

        );

        // Diam sebentar

        tl.to({}, { duration: .9 });

        // =========================
        // WELCOME MASUK KE BELAKANG
        // =========================

        tl.to(

            welcome.current,

            {

                scale: .2,
                z: -900,
                opacity: 0,
                duration: 1,
                ease: "power4.in"

            }

        );

        // =========================
        // BRAND MENGHANTAM KAMERA
        // =========================

        tl.to(

            brand.current,

            {

                scale: 6,
                z: 1600,
                opacity: 0,
                duration: 1,
                ease: "power4.in"

            },

            "<"

        );

        // =========================
        // ASAP MEMUDAR
        // =========================

        tl.to(

            ".smoke",

            {

                opacity: 0,
                scale: 1.3,
                duration: .8

            },

            "-=.6"

        );

        // =========================
        // OVERLAY HILANG
        // =========================

        tl.to(

            ".login-intro",

            {

                opacity: 0,
                duration: .2

            }

        );

        return () => {

            tl.kill();
            pulse.kill();

            if (audio) {

                audio.pause();
                audio.currentTime = 0;

            }

        };

    }, [show, onFinish]);

    if (!show) return null;

    return (

        <div className="login-intro">

            <div
                ref={leftSmoke}
                className="smoke smoke-left"
            />

            <div
                ref={rightSmoke}
                className="smoke smoke-right"
            />

            <div className="intro-text">

                <h3 ref={welcome}>
                    WELCOME TO
                </h3>

                <h1 ref={brand}>
                    CHROMIXHEART
                </h1>

            </div>

        </div>

    );

}

export default LoginIntro;