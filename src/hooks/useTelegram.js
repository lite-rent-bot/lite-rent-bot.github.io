const tg = window.Telegram.WebApp;

export function useTelegram() {

    const onClose = () => {
        tg.close()
    }

    const onToggleButton = () => {
        if(tg.MainButton.isVisible) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }

	const onShowScanQR = () => {
		params = {'text':"Scooter"};
		tg.showScanQrPopup(params);
	}
    return {
        onClose,
        onToggleButton,
        tg,
        version: tg.version,		
        user: tg.initDataUnsafe?.user,
        queryId: tg.initDataUnsafe?.query_id,
    }
}
