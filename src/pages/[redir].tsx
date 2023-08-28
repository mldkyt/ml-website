import React, {useEffect, useRef, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import load = Simulate.load;
import Head from "next/head";
import {GetServerSidePropsContext} from "next";
import {sql} from "@vercel/postgres";

function renderRedirect(url: string, label: string, redirTime: number) {
    return (
        <>
            <h1 className='text-3xl w-screen'>Redirecting you to {label} in {redirTime} seconds...</h1>
        </>
    )
}

function renderImage(url: string, label: string) {
    return (
        <>
            <h1 className='text-3xl w-screen'>{label}</h1>
            <img src={url} alt={label}/>
        </>
    )
}

function renderFile(url: string, label: string) {
    function f() {
        document.location.href = url
    }

    return (
        <>
            <h1 className='text-3xl w-screen'>{label}</h1>
            <br/>
            <button onClick={f} className='bg-blue-600 rounded-lg px-2 py-1'>
                Download
            </button>
        </>
    )
}

function renderError(label: string) {
    return (
        <>
            <h1 className='text-3xl text-red-500'>Error</h1>
            <h2>{label}</h2>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {redir} = context.params as { redir: string };
    if (!redir) {
        return {
            props: {
                error: true,
                errorMessage: 'No redirect path provided.'
            }
        }
    }

    const data = await sql`SELECT *
                           FROM redirects
                           WHERE id = ${redir}`
    if (data.rowCount === 0) {
        return {
            props: {
                error: true,
                errorMessage: 'No redirect found.'
            }
        }
    }

    await sql`UPDATE redirects SET views = views + 1 WHERE id = ${redir}`

    return {
        props: {
            type: data.rows[0].type,
            url: data.rows[0].url,
            label: data.rows[0].label,
            views: data.rows[0].views
        }
    }
}

type Data = {
    type: 'redirect' | 'image' | 'file';
    url: string;
    label: string;
    views: number;
    error: boolean;
    errorMessage: string;
}
export default function Redirection(props: Data) {
    const [redirectTime, setRedirectTime] = useState(5)
    const [screenHeight, setScreenHeight] = useState(0)

    const [live, setLive] = useState(false);
    const [liveLink, setLiveLink] = useState('');

    const hasRan = useRef(false)
    const countDown = useRef(5)



    function resizeEvent() {
        setScreenHeight(window.innerHeight)
    }

    useEffect(function () {
        window.addEventListener('resize', resizeEvent)

        if (!hasRan.current) {
            hasRan.current = true
            resizeEvent()
            if (props.type == 'redirect') {
                setInterval(function () {
                    if (countDown.current > 1) {
                        countDown.current--
                        setRedirectTime(countDown.current)
                    }
                    else {
                        setRedirectTime(0)
                        document.location.href = props.url
                    }
                }, 1000)
            }


            fetch('/api/live/get').then(x => x.json()).then(x => {
                if (x.live) {
                    setLive(true);
                    setLiveLink(x.link);
                }
            })
        }

        return function () {
            window.removeEventListener('resize', resizeEvent)
        }
    }, [])

    return (
        <>
            <Head>
                {
                    props.type == 'redirect' && (
                        <>
                            <title>Redirect by mldkyt</title>
                            <meta name="title" content="mldkyt has shared a link with you"/>
                            <meta name="description" content={`Redirects to: ${props.label}`}/>
                            <meta name="theme-color" content="#00FFFF"/>
                        </>
                    )
                }
                {
                    props.type == 'image' && (
                        <>
                            <title>Shared image by mldkyt</title>
                            <meta name="title" content="mldkyt has shared an image with you"/>
                            <meta name="description" content={props.label}/>
                            <meta name="theme-color" content="#00FFFF"/>
                            <meta name="og:image" content={props.url}/>
                        </>
                    )
                }
                {
                    props.type == 'file' && (
                        <>
                            <title>File shared by mldkyt</title>
                            <meta name="title" content="mldkyt has shared a file with you"/>
                            <meta name="description" content={props.label}/>
                            <meta name="theme-color" content="#00FFFF"/>
                        </>
                    )
                }
                {
                    props.error && (
                        <>
                            <title>Error</title>
                            <meta name="title" content="Error"/>
                            <meta name="description" content={props.errorMessage}/>
                            <meta name="theme-color" content="#FF0000"/>
                        </>
                    )
                }
            </Head>

            {live && (
                <div className='border-2 border-red-600 rounded-md m-2'>
                    <h3 className='text-2xl m-2'>mldkyt's currently live!</h3>
                    <p className='ml-4'>You can go watch his stream <a className='text-blue-400' href={liveLink}>here</a>.</p>
                </div>
            )}

            <h1 className='text-2xl p-4'>mldkyt has shared something with you:</h1>
            <br/>
            <br/>
            <div className='text-center absolute left-1/2 -translate-x-1/2 -translate-y-1/2' style={{
                top: `${screenHeight / 2}px`
            }}>
                {props.error ? (
                    <>
                        {renderError(props.errorMessage)}
                    </>
                ) : (
                    <>
                        {props.type == 'redirect' && renderRedirect(props.url, props.label, redirectTime)}
                        {props.type == 'image' && renderImage(props.url, props.label)}
                        {props.type == 'file' && renderFile(props.url, props.label)}
                    </>
                )}
            </div>
        </>
    )
}