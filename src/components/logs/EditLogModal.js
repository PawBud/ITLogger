import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';
import { updateLog } from '../../actions/logActions'
import PropTypes from 'prop-types';
import TechSelectOptions from '../techs/TechSelectOptions';

const EditLogModal = ({ current, updateLog }) => {
    const [message, setMessage] = useState('');
    const [attention, setAttention] = useState(false);
    const [tech,setTech] = useState('');

    useEffect(() => {
        if(current){
            setMessage(current.message);
            setAttention(current.attention);
            setTech(current.tech);
        }
    })

    const onSubmit = () => {
        if(message === '' || tech === ''){
            M.toast({ html: 'Please enter a message and tech' });
        }
        else{
            const updLog = {
                id: current.id,
                message,
                attention,
                tech,
                date: new Date()
            }

            updateLog(updLog);
            M.toast({ html: `log updated by ${tech}` })

            //Clear Fields
            setMessage('');
            setTech('');
            setAttention(false);
        }
    }

    return (
        <div id='edit-log-modal' className="modal" style={modalStyle}>
            <div className="modal-container">
                <h4>Enter System log</h4>
                <div className="row">
                    <div className="input-field">
                        <input type="text" name='message' value={message} onChange={e => setMessage(e.target.value)} />
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

const modalStyle = {
    width: '75%',
    height: '75%' 
};

EditLogModal.propTypes = {
    current: PropTypes.object,
    updateLog: PropTypes.func.isRequired
}

const mapsStateToProps = state => ({
    current: state.log.current
})

export default connect(mapsStateToProps, { updateLog })(EditLogModal);
