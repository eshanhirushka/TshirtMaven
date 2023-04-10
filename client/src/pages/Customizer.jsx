import React, { useState, useEffect} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import config from '../config/config';
import state from '../store';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';

import { AIPicker, ColorPicker, FilePicker, CustomButton, Tab } from '../components';

const Customizer = () => {

  const snap = useSnapshot(state);

  const [file, setFile] = useState('');

  const isMobile = window.innerWidth <= 600;

  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);

  const [fileName, setFileName] = useState('canvas');
  const [filterDownload, setFilterDownload] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({logoShirt: true, stylishShirt: false, download: false,})

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker": return <ColorPicker />
      case "filepicker": return <FilePicker file={file} setFile={setFile} readFile={readFile} />
      case "aipicker": return <AIPicker prompt={prompt} setPrompt={setPrompt} generatingImg={generatingImg} handleSubmit={handleSubmit} />
      case "close": return setActiveEditorTab("")
      default: null;
    }
  }

  const handleSubmit = async (type) => {
    if(!prompt) return alert("Please Enter a Prompt");

    try{
      setGeneratingImg(true);

      const response = await fetch('https://tshirtmaven.onrender.com/api/v1/dalle',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      })

      const data = await response.json();

      handleDecals(type, `data: image/png;base64,${data.photo}`)

    }catch(error){
      alert(error);
    }finally{
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if(!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const downloadImage = () => {
    return (
      <div className='w-30 items-center'>
        <input className='w-fit px-4 py-2.5 font-bold text-sm' type="text" placeholder="Enter a filename" onChange={(e) => setFileName(e.target.value)}/>
        <CustomButton type="filled" title="Download" customStyles="w-fit px-4 py-2.5 font-bold text-sm" handleClick={() => {if(fileName === "png"){setFileName("canvas");downloadCanvasToImage(fileName);} else{ downloadCanvasToImage(fileName)}}} />
      </div>
    );
  }

  const handleActiveFilterTab = (tabName) => {
    switch (tabName){
      case "logoShirt": state.isLogoTexture =!activeFilterTab[tabName];
      break;
      case "stylishShirt": state.isFullTexture =!activeFilterTab[tabName];
      break;
      case "download": downloadImage();
      break;
      default: 
        state.isFullTexture = true;
        state.isLogoTexture = false;
        break;
    }

    setActiveFilterTab((prevState) => {
      return{
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

  const readFile = (type)=> {
    reader(file)
    .then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    })
  }

  const handleClick = () => {
    state.groupPosition = isMobile ? [0, 0, 0] : [0.5, 0, 0];
    state.anglePosition = [2, 3, 6];
    state.intro = true;
    if (state.mobileView) {
      state.hideInHome = false;
    };
    state.bigMobile = [0, -0.13, 0];
    state.tabPosition = [0.05, -0.1, 0];
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div key="custom" className="absolute top-0 left-0 z-10" {...slideAnimation('left')}>
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab key={tab.name} tab={tab} handleClick={() => setActiveEditorTab(tab.name)} />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div className="absolute z-10 top-5 right-5" {...slideAnimation('right')}>
            <CustomButton type="filled" title="Go Back" handleClick={handleClick} customStyles="w-fit px-4 py-2.5 font-bold text-sm" />
          </motion.div>
          <motion.div className="filtertabs-container" {...slideAnimation('up')} >
            {FilterTabs.map((tab) => (
              <Tab key={tab.name} tab={tab} isFilterTab isActiveTab={activeFilterTab[tab.name]} handleClick={() => {
                if(tab.name === "download"){
                  setFilterDownload((prevValue) => !prevValue);
                  handleActiveFilterTab(tab.name);
                }else {
                handleActiveFilterTab(tab.name)
                }
              }} />
            ))}
            {filterDownload == true && downloadImage()}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer
