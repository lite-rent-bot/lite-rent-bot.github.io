import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
	const [scooter, setScooter] = useState('');
    const [subject, setSubject] = useState('physical');
    const {tg, ShowScanQR} = useTelegram();
	
    const onSendData = useCallback(() => {
        const data = {
            country,
            street,
            subject, 
			scooter
        }
		setStreet("Send button clicked1");
        let res = tg.sendData("test");//JSON.stringify(data));
		setStreet("Result "+JSON.stringify(res));
    }, [country, street, subject, scooter])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    useEffect(() => {
        if(!street || !country) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [country, street])

    const onChangeCountry = (e) => {
		//console.log("Country was changed");	
		setCountry(e.target.value);
    }

    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    const onQRScanned = (tg_event) => {
		setScooter(tg_event);
		setCountry(tg_event);
		//console.log("Event ");	
		//console.log("Event "+tg_event);	
		return true;		
	}
	
    const onScooterScannerClick = () => {
		console.log("Scanner button was clicked!");
		//ShowScanQR();
		tg.showScanQrPopup({text: 'Отсканируй самокат'}, onQRScanned);
	}


    return (
	   <div className={"form"}>
            <h3>Отсканируй номер самоката</h3>
			<Button onClick={onScooterScannerClick}>Scan scooter</Button>
		   <input
                className={'input'}
                type="text"
                placeholder={'Страна'}
                value={country}
                onChange={onChangeCountry}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Улица'}
                value={street}
                onChange={onChangeStreet}
            />
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'physical'}>Физ. лицо</option>
                <option value={'legal'}>Юр. лицо</option>
            </select>
        </div>
    );
};

export default Form;
