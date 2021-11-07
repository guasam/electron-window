/**
 * Copyright (c) 2021, Guasam
 *
 * This software is provided "as-is", without any express or implied warranty. In no event
 * will the authors be held liable for any damages arising from the use of this software.
 * Read the LICENSE file for more details.
 *
 * @author  : guasam
 * @project : Electron Window
 * @package : Window Frame (Component)
 */

import React, { useEffect, useRef } from 'react';
import Titlebar from './Titlebar';
import logo from '@assets/images/logo.png';

type Props = {
  title?: string;
  borderColor?: string;
  arch: 'windows' | 'mac';
};

type Context = {
  arch: 'windows' | 'mac';
};

export const WindowContext = React.createContext<Context>({ arch: 'windows' });

const WindowFrame: React.FC<Props> = (props) => {
  const itsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { parentElement } = itsRef.current;
    parentElement.classList.add('has-electron-window');
    parentElement.classList.add('has-border');
    parentElement.style.borderColor = props.borderColor ?? '#c7c7c70d';
  }, []);

  return (
    <WindowContext.Provider value={{ arch: props.arch }}>
      {/* Reference creator */}
      <div className='start-electron-window' ref={itsRef}></div>
      {/* Window Titlebar */}
      <Titlebar
        title={props.title ?? 'Electron Window'}
        mode='centered-title'
        icon={logo}
      />
      {/* Window Children (Application to render) */}
      {props.children}
    </WindowContext.Provider>
  );
};

export default WindowFrame;
