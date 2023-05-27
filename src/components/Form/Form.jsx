import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [item, setItem] = useState('');
	const [test, setTest] = useState('');
	const [scooter, setScooter] = useState([]);
	const [scooter1, setScooter1] = useState('');	
    const [subject, setSubject] = useState('physical');
    const {tg, queryId} = useTelegram();
	
    const onSendData = useCallback(() => {
        //const data = {
        //    item,
        //    subject, 
		//	scooter
        //}
		let frefix = "/+";
		if (subject=='outbound') {frefix = "/- ";} 	else {frefix = "/+ ";};
		let command = frefix+scooter.join(" ");
		let data = {
            command: command
        };
		
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
        if(scooter==[]) {
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

    const onScooterScanned = async (tg_event) => {
		let num = tg_event.slice(-5).match(/\d+/)[0];
		//let isnum = /^\d+$/.test(num);
		if (num.length==4) {
			//setScooter(num);
			await setScooter((prevScArray) => [...prevScArray, num]);			
		} else {
			//	setScooter(num);
			//console.log("scooter:"+JSON.stringify(scooter));
			setScooter("ошибка");
		}		
		//setScooter(num);
		setTest("length: "+JSON.stringify(scooter)+", item: "+item);
		if (scooter.length==item) {	return true};		
	}
	
    const onScooter1Scanned = async (tg_event) => {
		let num = tg_event.slice(-5).match(/\d+/)[0];
		//let isnum = /^\d+$/.test(num);
		if (num.length==4) {
			//setScooter(num);
			await setScooter((prevScArray) => [...prevScArray, num]);			
		} else {
			//	setScooter(num);
			//console.log("scooter:"+JSON.stringify(scooter));
			setScooter("ошибка");
		}		

		return true		
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
    const onScooter1ScannerClick = () => {
		tg.showScanQrPopup({text: 'Отсканируй 1 самокат'}, onScooter1Scanned);
	}	

    return (
	   <div className={"form"}>
			<h3>Вид операции</h3>   
			<div>		  
				<label for="radio" class="l-radio"> 
					<input type="radio" name="subject" value="inboud" id="inbound" tabindex="1" onChange={onChangeSubject}/> 
					<span>Поступление     </span>
				</label> 
				<label for="radio" class="l-radio"> 
					<input type="radio" name="subject" value="outbound" id="outbound" tabindex="2"  onChange={onChangeSubject}/>
					<span> Отгрузка</span>
				</label> 		   		   
			</div>
           <h3>Режим сканирования по 1 самокату:</h3>			
 		   <input
                class="simplebutton"
                type="text"
                placeholder={'Номера самокатов'}
                value={scooter}
                onChange={onChangeScooter}
            />
			<Button onClick={onScooter1ScannerClick}>Сканировать 1 самокат</Button>			
        </div>
    );
};

export default Form;

//				className={'input'}

//		   <select value={subject} onChange={onChangeSubject} className={'select'}>
//                <option value={'inboud'}>Поступление на склад</option>
//                <option value={'outbound'}>Отгрузка со склада</option>
//           </select>

//			  <h3>Режим массового сканирования:</h3>
//			   <input
//					className={'input'}
//					type="number"
//					placeholder={5}
//					value={item}
//					onChange={onChangeItem}
//				/>
//				<Button onClick={onScooterScannerClick}>Сканировать сразу все</Button>
//
//			   <input
//					className={'input'}
//					type="text"
//					placeholder={'...'}
//					value={test}
//			   />	
	