import React from 'react';
import { REGISTRATION_YES } from '../../utils/constants';

function Tooltip({ isOpen, onClose }) {

    return (

        <div className={`tooltip  ${isOpen ? 'tooltip_opened' : ''}`}>
            <div className="tooltip__container">
                <button type="button" className="tooltip__close" onClick={onClose}></button>
                <div className={"tooltip__info tooltip__info_type_yes"}
                ></div>
                <h2 className="tooltip__title">{REGISTRATION_YES}</h2>
            </div>
        </div>
    );
}

export default Tooltip;