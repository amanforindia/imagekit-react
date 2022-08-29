import ImageKit from 'imagekit-javascript';

import { IKContextType } from '../../interfaces/IKContextType'
import { IKPropsType } from '../../interfaces/types/IKPropsType';
import { IKLQIP } from '../../interfaces/types/IKLQIP';

export const divideUrlAndQueryParams = (url: string) => {
    let queryIndex = url.indexOf("?");

    let urlStr = url.slice(0, queryIndex);

    let queryParamsStr = url.slice(queryIndex, url.length)

    return { urlStr, queryParamsStr }
}

export const getIKElementsCommonOptions = (props: IKPropsType, context: IKContextType) => {
    const options = {
        urlEndpoint: props.urlEndpoint || context.urlEndpoint,
        src: props.src || context.src,
        path: props.path || context.path,
        transformation: props.transformation || context.transformation,
        transformationPosition: props.transformationPosition || context.transformationPosition,
        queryParameters: props.queryParameters || context.queryParameters
    } as const;

    return options
}

export const fetchEffectiveConnection = () => {
    try {
        // return navigator.connection.effectiveType;
        return undefined
    } catch (ex) {
        return "4g";
    }
}

export const getLqipUrl = (options, lqip: IKLQIP, ikClient: ImageKit) => {
    const quality = Math.round(lqip.quality || lqip.threshold || 20);
    const blur = Math.round(lqip.blur || lqip.blur || 6);
    const newTransformation = options.transformation ? [...options.transformation] : [];

    if (lqip.raw && typeof lqip.raw === "string" && lqip.raw.trim() !== "") {
        newTransformation.push({
            raw: lqip.raw.trim()
        });
    } else {
        newTransformation.push({
            quality,
            blur
        })
    }
    return ikClient.url({
        ...options,
        transformation: newTransformation
    });
}

export const getIKElementsUrl = (props: IKPropsType, state) => {
    const {
        intersected,
        originalSrcLoaded,
        originalSrc,
        lqipSrc
    } = state;

    const {
        lqip = null,
        loading
    } = props;

    if (loading !== "lazy" && lqip === null) {
        return originalSrc
    } else if (loading !== "lazy" && lqip && lqip.active) {
        if (originalSrcLoaded) {
            return originalSrc
        } else {
            return originalSrc
        }
    } else if (loading === "lazy" && lqip === null) {
        if (intersected) {
            return originalSrc
        } else {
            return ""
        }
    } else if (loading === "lazy" && lqip && lqip.active) {
        if (intersected && originalSrcLoaded) {
            return originalSrc
        } else {
            return lqipSrc
        }
    } else if (loading === "lazy" && lqip && !lqip.active) {
        return originalSrc
    } else if (loading !== "lazy" && lqip && !lqip.active) {
        return originalSrc
    }
}