import React from "react";
import dynamic from 'next/dynamic'
import Unity, { UnityContext } from "react-unity-webgl";
import Head from "next/dist/shared/lib/head";

function getUnityContext(){
    const unityContext = new UnityContext({
        loaderUrl: "../../" + process.env.NEXT_PUBLIC_ASSET_PREFIX + "Build/Release.loader.js",
        dataUrl: "../../" + process.env.NEXT_PUBLIC_ASSET_PREFIX + "Build/Release.data",
        frameworkUrl: "../../" + process.env.NEXT_PUBLIC_ASSET_PREFIX + "Build/Release.framework.js",
        codeUrl: "../../" + process.env.NEXT_PUBLIC_ASSET_PREFIX + "Build/Release.wasm",
    });
    
    return unityContext;
}

export default function Home() {
    const unityContext = getUnityContext(); 

    return(
    <div>
        <Head>
            <title>リバーシ</title>
            <meta name="description" content="リバーシングユニバース" />
            <link rel="icon" href={process.env.NEXT_PUBLIC_ASSET_PREFIX + "/favicon.ico"} />
        </Head>
        <Unity unityContext={unityContext} style={{width:960, height:600}}/>;
    </div>
    );
}