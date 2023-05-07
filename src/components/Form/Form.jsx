import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
	const [scooter, setScooter] = useState('');
    const [subject, setSubject] = useState('physical');
    const {tg, queryId} = useTelegram();
	
    const onSendData = useCallback(() => {
        const data = {
            country,
            street,
            subject, 
			scooter
        }
		//setStreet("Send button clicked1");
		let article = {
			type:'article',
			id: "1",
			title:"test",
			input_message_content:{
				"message_text": "test message"			
			}
		};
		let res = "ok";
		//setStreet("Send button clicked2");
		try {
			//tg.answerWebAppQuery(queryId, JSON.stringify(article));
			tg.sendData(JSON.stringify(data));
		} catch (err) {
			let res = err.message;
		};
		//setStreet("Send button clicked3");
        //let res = tg.sendData("test");//JSON.stringify(data));
		//setStreet("Result "+res);
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
        if(!country){ // || !street) {
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
	const onSendBtnClick = () => {
		//let res = tg.sendData("test");
		let article = {
			type:'article',
			id: "1",
			title:"test",
			input_message_content:{
				"message_text": "test message"			
			}
		};		
		console.log("Click before "+queryId+":"+JSON.stringify(article));
		try {
			window.Telegram.WebApp.answerWebAppQuery(queryId, JSON.stringify(article));
		} catch (err) {
			console.log("err: "+JSON.stringify(err));
		}
		console.log("Click mid");
		window.Telegram.WebApp.sendData("test");
		console.log("Click after");
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
			<Button onClick={onSendBtnClick}>Отправить</Button>
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'physical'}>Физ. лицо</option>
                <option value={'legal'}>Юр. лицо</option>
            </select>
        </div>
    );
};

export default Form;
