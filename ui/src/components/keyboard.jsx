import React from 'react'
import "./keyboard.css"

const Keyboard = ({firstRow,secondRow,thirdRow,fourthRow,enteredValue,handleSubmit,clickedButtonRef}) => {
  return (
    <div className='container'>
        <input className='text' type="text" value={enteredValue.join("")}></input>
        <div className='keyboard_wrap'>
            <div className='keyboard_keys'>
                <div className='row'>
                    {firstRow.map((letter,index)=>(
                        <div 
                            className={`keys ${(letter.text) === 'Backspace' ? 'backspace_key' : ''}
                            ${(letter.active)? "active": ""}`}                             
                            onClick={handleSubmit}>
                                {letter.text}
                        </div>
                    ))}
                </div>

                <div className='row'>
                    {secondRow.map((letter,index)=>(
                        <div 
                            className={`keys ${(letter.text) === '\\' ? 'slash_key' : ''} ${(letter.text) === 'Tab' ? 'tab_key' : ''}
                            ${(letter.active)? "active": ""}`}
                            onClick={handleSubmit}>
                                {letter.text}
                        </div>
                    ))}
                </div>

                <div className='row'>
                    {thirdRow.map((letter,index)=>(
                        <div 
                            className={`keys ${(letter.text) === 'CapsLock' ? 'caps_key' : ''} ${(letter.text) === 'Enter' ? 'enter_key' : ''} 
                            ${(letter.text) === '\'' ? 'quote_key' : ''} ${(letter.text) === ';' ? 'semi_colon_key' : ''} 
                            ${(letter.active)? "active": ""}`}  
                            onClick={handleSubmit}>
                                {letter.text}
                        </div>
                    ))}
                </div>

                <div className='row'>
                    {fourthRow.map((letter,index)=>(
                        <div 
                            className={`keys ${(letter.text) === 'Shift_l' ? 'shift_key shift_l' : ''} ${(letter.text) === 'Shift_r' ? 'shift_key shift_r' : ''} 
                            ${(letter.active)? "active": ""}`}  
                            onClick={handleSubmit}>
                                {letter.text}
                        </div>
                    ))}
                </div>

                <div className='row'>
                    <div className='keys ctrl_key ctrl_left' onClick={handleSubmit}>Ctrl</div>
                    <div className='keys win_key' onClick={handleSubmit}>Win</div>
                    <div className='keys alt_key alt_left' onClick={handleSubmit}>Alt</div>
                    <div className={`keys space_key ${clickedButtonRef === ' ' ? 'active' : ''}`} onClick={handleSubmit}> </div>
                    <div className='keys alt_key alt_right' onClick={handleSubmit}>Alt</div>
                    <div className='keys ' onClick={handleSubmit}>Fn</div>
                    <div className='keys ctrl_key ctrl_right' onClick={handleSubmit}>Ctrl</div>                    
                </div>

            </div>
        </div>
        <input className='configButton' value='CONFIG' type="button"/>
    </div>
  )
}

export default Keyboard;
