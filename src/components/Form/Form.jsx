import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [item, setItem] = useState('');
    const [task, setTask] = useState('');
	const [scooter, setScooter] = useState('');
    const [subject, setSubject] = useState('physical');
    const {tg, queryId} = useTelegram();
	
    const onSendData = useCallback(() => {
        const data = {
            item,
            task,
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
    }, [task, item, subject, scooter])

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
        if(!scooter || !task) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [scooter, task])

    const onChangeTask = (e) => {
		//console.log("Country was changed");	
		setTask(e.target.value);
    }

    const onChangeItem = (e) => {
        setItem(e.target.value)
    }
	
	const onChangeScooter = (e) => {
		setItem(e.target.value)
	}

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    const onScooterScanned = (tg_event) => {
		setScooter(tg_event);
		return true;		
	}
    
	const onTaskScanned = (tg_event) => {
		setTask(tg_event);
		return true;		
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

    const onTaskScannerClick = () => {
		tg.showScanQrPopup({text: 'Отсканируй задачу'}, onTaskScanned);
	}
    const onItemScannerClick = () => {
		tg.showScanQrPopup({text: 'Отсканируй запчасть'}, onItemScanned);
	}

    return (
	   <div className={"form"}>
            <h3>Отсканируй номер самоката</h3>
			<Button onClick={onScooterScannerClick}>Scan scooter</Button>
		   <input
                className={'input'}
                type="text"
                placeholder={'Номер самоката'}
                value={scooter}
                onChange={onChangeScooter}
            />
            <h3>Отсканируй задачу</h3>
			<Button onClick={onTaskScannerClick}>Scan task</Button>
		   <input
                className={'input'}
                type="text"
                placeholder={'Задача'}
                value={task}
                onChange={onChangeTask}
            />
            <h3>Отсканируй запчасть</h3>
			<Button onClick={onItemScannerClick}>Scan item</Button>          
			<input
                className={'input'}
                type="text"
                placeholder={'Запчасть'}
                value={item}
                onChange={onChangeItem}
            />
        </div>
    );
};

export default Form;
