import React, { useState } from 'react';
import TechSelectOptions from '../techs/TechSelectOptions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLog } from '../../actions/logActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const AddLogModal = ({ addLog }) => {
    const [message, setMessage] = useState('');
    const [attention, setAttention] = useState(false);
    const [tech, setTech] = useState('');
    const onSubmit = () => {
        if(message === '' || tech === ''){
            M.toast({ html: 'Please enter a message and tech' });
        }
        else{
            const newLog = {
                message,
                attention,
                tech,
                date: new Date()
            }
            addLog(newLog);

            M.toast({ html: `log added by ${tech}` });

             //Clear Fields
             setMessage('');
             setTech('');
             setAttention(false);
        }
    }

    return (
        <div id='add-log-modal' className="modal" style={modalStyle}>
            <div className="modal-container">
                <h4>Enter System log</h4>
                <div className="row">
                    <div className="input-field">
                        <input type="text" name='message' value={message} onChange={e => setMessage(e.target.value)} />
                        <label htmlFor="message" className="active">
                            Log Message
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <select onChange={e => setTech(e.target.value)} className="browser-default" name="tech" value={tech}>
                            <option value='' disabled>
                                Select Technician
                            </option>
                            <TechSelectOptions />
                        </select>
                    </div>
                </div> 
                <div className="row">
                    <div className="input-field">
                        <p>
                            <label>
                                <input onChange={e => setAttention(!attention)} type="checkbox" className="filled-in" checked={attention} value={attention}/>
                                <span>Needs Attention</span>    
                            </label>
                        </p>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <a href="#!" onClick={onSubmit} className="modal-close btn blue waves-effect waves-green">
                    Enter
                </a>
            </div>
        </div>
    )
}

AddLogModal.propTypes = {
    addLog:PropTypes.func.isRequired,
}

const modalStyle = {
    width: '75%',
    height: '75%' 
};

export default connect(null, { addLog })(AddLogModal);
