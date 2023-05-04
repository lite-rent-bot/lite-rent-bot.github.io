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

	const ShowScanQR = () => {
		//params = ;
		tg.showScanQrPopup({
                  text: 'Привет друг',
                });
	}
    return {
        onClose,
        onToggleButton,
		ShowScanQR,
        tg,
        version: tg.version,		
        user: tg.initDataUnsafe?.user,
        queryId: tg.initDataUnsafe?.query_id,
    }
}
