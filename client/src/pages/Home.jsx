import React from 'react';
import { motion, AnimatePresence} from 'framer-motion';
import { useSnapshot } from 'valtio';

import { CustomButton } from '../components';
import state from '../store';
import { eh, ehemtbg } from '../assets';

import { headContainerAnimation, headContentAnimation, headTextAnimation, slideAnimation } from '../config/motion';

const Home = () => {

    const snap = useSnapshot(state);

    const handleClick = () => {
        state.groupPosition = [0, 0, 0];
        state.anglePosition = [0, 3, 6];
        state.bigMobile = [0, 0, 0];
        state.intro = false;
        state.hideInHome = true;
        state.tabPosition = [0, 0, 0];
    };

    return (
        <AnimatePresence>
            {snap.intro && (
                <motion.section className="home" {...slideAnimation("left")}>
                    <motion.header {...slideAnimation("down")}>
                        <img src={eh} alt='logo' className='w-16 h-16 object-contain' />
                    </motion.header>

                    <motion.div className="home-content" {...headContainerAnimation}>
                        <motion.div {...headTextAnimation}>
                            <h1 className="head-text">
                                LET'S <br className="xl:block hidden" /> DESIGN.
                            </h1>
                        </motion.div>
                        {state.isHeight && state.mobileView && <div style={{ height: "200px" }}></div>}
                        <motion.div {...headContentAnimation} className="flex flex-col gap-5">
                            <p className="max-2-md font-bold text-gray-600 text-base">
                                Create Your Unique and Exclusive Shirt With Our Brand-New 3D Customization Tool.<strong>Unleash Your Imagination</strong>{""} and Define Your Own Style.
                            </p>

                            <CustomButton type="filled" title="Customize It" handleClick={ handleClick } customStyles="w-fit px-4 py-2.5 font-bold text-sm" />
                        </motion.div>
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    )
}

export default Home