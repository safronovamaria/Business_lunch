import { useState } from 'react';
import { CCard, CCardBody, CFormInput, CButton, CCardHeader, CFormSelect } from '@coreui/react';

const CreateMenu = ({ loadMenus }) => {
    const [day, setDay] = useState('');

    const createMenu = () => {
        const data = {
            day: day,
        };
        fetch('http://localhost:8080/api/menu', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            loadMenus();
        });
        setDay('');
    };

    return (
        <CCard>
            <CCardHeader>Создание меню</CCardHeader>
            <CCardBody className="d-flex">
                <CFormInput placeholder="Название меню" value={day} onChange={(e) => setDay(e.target.value)} />
                <CButton className="ms-3" onClick={createMenu}>
                    Создать
                </CButton>
            </CCardBody>
        </CCard>
    );
};

export default CreateMenu;
