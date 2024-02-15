import React, { useRef } from "react";

import { KeyboardReact } from "react-simple-keyboard";

import { useWordleContext, SET_GUESS, CHECK_WORD } from "../util/WordleStateProvider";

import "react-simple-keyboard/build/css/index.css";

export default function Keyboard() {
  const [state, dispatch] = useWordleContext();

  const keyboard = useRef();

  React.useEffect(() => {
    keyboard?.current.setInput(state.rows[state.rowIndex].guessString);
  }, [state.rows, state.rowIndex]);


  const onChange = input => {
    dispatch({ type: SET_GUESS, payload: input });
  };

  const onKeyPress = button => {
    if (button === '{enter}') {
        dispatch({ type: CHECK_WORD });
    }
  };

  const layout = {
        'default': [
          'Q W E R T Y U I O P',
          'A S D F G H J K L',
          '{enter} Z X C V B N M {bksp}'
        ]
  };

  const display = {
        '{bksp}': '\u232B',
        '{enter}': 'ENTER',
  }

  const activeButton = state.rows[state.rowIndex].guessString[state.rows[state.rowIndex]?.guessString.length-1] || '';

  const buttonTheme = [
    {
        class: 'keyboard-button',
        buttons: 'Q W E R T Y U I O P A S D F G H J K L {enter} Z X C V B N M {bksp}'
    },
  ];

  if (activeButton) {
    buttonTheme.push(
    {
      class: 'glow',
      buttons: activeButton
    })
  }


  return (
      <KeyboardReact
        maxLength={5}
        display={display}
        theme="hg-theme-default hg-layout-default keyboard-theme"
        buttonTheme={buttonTheme}
        layout={layout}
        keyboardRef={r => (keyboard.current = r)}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
  );
}
