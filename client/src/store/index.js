import { proxy } from "valtio";

import { ai, eh } from "../assets";

const isMobile = window.innerWidth < 768;


const state = proxy({
    intro: true,
    color: '#000',
    isLogoTexture: true,
    isFullTexture: false,
    isBackTexture: false,
    logoDecal: eh,
    fullDecal: eh,
    backDecal:eh,
    groupPosition: isMobile ? [0, 0, 0] : [0.5, 0, 0],
    bigMobile:[0, -0.13, 0],
    anglePosition: [2, 3, 6],
    download:false,
    hideInHome: isMobile ? false : true,
    mobileView: window.innerWidth < 768,
    isHeight: window.innerHeight > 740,
    isTablet: window.innerWidth >= 768,
    tabPosition:[0.05, -0.1, 0],
    isDesktop: window.innerWidth > 1280
});

export default state;