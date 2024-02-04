import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormSelect } from '@coreui/react';
import { useState } from 'react';

const CreateDish = ({ menuId, loadDishes, dishes }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('Салат');
    const [error, setError] = useState(false);

    const createDish = () => {
        if (dishes.find((el) => el.type === type)) {
            setError(true);
            return;
        }
        const data = {
            name: name,
            type: type,
            menu_id: menuId,
        };
        fetch('http://localhost:8080/api/dish', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            loadDishes();
        });
        setName('');
    };

    return (
        <CCol xs={4}>
            <CCard>
                <CCardHeader>Добавление блюда</CCardHeader>
                <CCardBody>
                    <CFormInput
                        className="mb-2"
                        placeholder="Наименование"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <CFormSelect
                        className="mb-2"
                        placeholder="Тип"
                        value={type}
                        onChange={(e) => {
                            setType(e.target.value);
                            setError(false);
                        }}
                    >
                        <option value="Салат">Салат</option>
                        <option value="Первое">Первое</option>
                        <option value="Второе">Второе</option>
                        <option value="Напиток">Напиток</option>
                        <option value="Десерт">Десерт</option>
                    </CFormSelect>
                    {error && <div className="text-danger pb-1">Блюдо с таким типом уже существует</div>}
                    <CButton className="text-center" size="sm" onClick={createDish}>
                        Создать
                    </CButton>
                </CCardBody>
            </CCard>
        </CCol>
    );
};

export default CreateDish;
