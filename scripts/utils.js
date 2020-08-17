
/*функция oткрытия popup-ов */
export function openModal(popup) {
    popup.classList.add('popup_open');
    document.addEventListener('keydown', toggleFormEsc);
    document.addEventListener('mousedown', closeOverley);
};

/*функция закрытия popup-ов */
export function closeModal(popup) {
    popup.classList.remove('popup_open');
    document.removeEventListener('keydown', toggleFormEsc);
    document.removeEventListener('mousedown', closeOverley);
};
/*Закрытие popup-ов при нажании на оврлей */
export function closeOverley(evt) {
    if (evt.target.classList.contains('popup_open')) {
        evt.target.classList.remove('popup_open');
    }
};

/*Закрытие popup-ов при нажатии Esc */
export function toggleFormEsc(evt) {
    const openPopup = document.querySelector('.popup_open');
    if (evt.keyCode === 27) {
        closeModal(openPopup);
    }
};
