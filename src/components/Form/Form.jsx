import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [item, setItem] = useState('');
	 const [test, setTest] = useState('');
	const [scooter, setScooter] = useState([]);
    const [subject, setSubject] = useState('physical');
    const {tg, queryId} = useTelegram();
	
    const onSendData = useCallback(() => {
        const data = {
            item,
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
    }, [item, subject, scooter])

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
        if(!scooter) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [scooter])

    const onChangeItem = (e) => {
        setItem(e.target.value)
    }
	
	const onChangeScooter = (e) => {
		console.log("scanned:"+e.target.value);
	}

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    const onScooterScanned = (tg_event) => {
		let num = tg_event.slice(-5).match(/\d+/)[0];
		//let isnum = /^\d+$/.test(num);
		if (num.length==4) {
			//setScooter(num);
			setScooter((prevScArray) => [...prevScArray, num]);			
		} else {
			//	setScooter(num);
			//console.log("scooter:"+JSON.stringify(scooter));
			setScooter("ошибка");
		}		
		//setScooter(num);
		SetTest("length: "+scooter.length+", item: "+item);
		if (scooter.length.String==item) {	return true};		
	}
 	
	const onItemScanned = (tg_event) => {
		setItem(tg_event);
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
		//console.log("Click mid");
		//window.Telegram.WebApp.sendData("test");
		//console.log("Click after");
	}
	
    const onScooterScannerClick = () => {
		tg.showScanQrPopup({text: 'Отсканируй самокат'}, onScooterScanned);
	}

    return (
	   <div className={"form"}>
            <h3>Сколько самокатов по документам?</h3>
		   <input
                className={'input'}
                type="text"
                placeholder={'10'}
                value={item}
                onChange={onChangeItem}
            />
			<Button onClick={onScooterScannerClick}>Scan scooter</Button>
 		   <input
                className={'input'}
                type="text"
                placeholder={'Номера самокатов'}
                value={scooter}
                onChange={onChangeScooter}
            />
 		   <input
                className={'input'}
                type="text"
                placeholder={'Номера самокатов'}
                value={test}
            />			
        </div>
    );
};

export default Form;
