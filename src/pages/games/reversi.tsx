import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import Head from "next/dist/shared/lib/head";
import CustomBar from "src/components/CustomBar";

export default function Home() {
    const { unityProvider } = useUnityContext({
        loaderUrl: process.env.NEXT_PUBLIC_ASSET_PREFIX + "/Build/Release.loader.js",
        dataUrl: process.env.NEXT_PUBLIC_ASSET_PREFIX + "/Build/Release.data",
        frameworkUrl: process.env.NEXT_PUBLIC_ASSET_PREFIX + "/Build/Release.framework.js",
        codeUrl: process.env.NEXT_PUBLIC_ASSET_PREFIX + "/Build/Release.wasm",
    });

    return (
        <div>
            <Head>
                <title>リバーシ</title>
                <meta name="description" content="リバーシングユニバース" />
                <link rel="icon" href={process.env.NEXT_PUBLIC_ASSET_PREFIX + "/favicon.ico"} />
            </Head>
            <CustomBar />
            <Unity unityProvider={unityProvider} style={{ width: 960, height: 600 }} />
        </div>
    );
}
