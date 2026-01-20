import React from "react";
import '../../assets/css/components/primaryBtn/primaryBtn.css';

const PrimaryButton = ({clickFn, btnClass, btnText}) => {
    return(<>
        <button
            onClick={clickFn ? clickFn : () => {console.log('button clicked!')}}
            className={btnClass || 'my-btn my-btn-primary'}
        >{btnText || "I am a button"}</button>
    </>)
}

export default PrimaryButton