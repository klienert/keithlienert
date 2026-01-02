import React from "react";

const PrimaryButton = ({clickFn, btnClass, btnText}) => {
    return(<>
        <button
            onClick={clickFn ? clickFn : () => {console.log('button clicked!')}}
            className={btnClass || 'btn btn-primary'}
        >{btnText || "I am a button"}</button>
    </>)
}

export default PrimaryButton