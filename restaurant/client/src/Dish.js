import { CCol, CCardBody, CCard, CButton, CFormSelect } from '@coreui/react';
import { useState } from 'react';

const Dish = ({ item, loadDishes, menus, loadMenus }) => {
    const [selectedMenu, setSelectedMenu] = useState('');
    const [error, setError] = useState(false);

    const deleteDish = () => {
        fetch(`http://localhost:8080/api/dish/${item.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            loadDishes();
        });
    };

    const editDish = () => {
        fetch(`http://localhost:8080/api/menu_dishes/${selectedMenu}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.find((el) => el.type === item.type)) {
                    setError(true);
                    return;
                }
                const editedData = {
                    id: item.id,
                    name: item.name,
                    type: item.type,
                    menu_id: selectedMenu,
                };
                fetch(`http://localhost:8080/api/dish`, {
                    method: 'PUT',
                    body: JSON.stringify(editedData),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then((result) => {
                    loadMenus();
                });
            });
    };

    return (
        <CCol xs={4} className="pb-3">
            <CCard>
                <CCardBody>
                    <div>Наименование: {item.name}</div>
                    <div>Тип: {item.type}</div>
                    <hr />
                    <CFormSelect
                        label="Куда перенести?"
                        onChange={(e) => {
                            setSelectedMenu(e.target.value);
                            setError(false);
                        }}
                    >
                        <option value=""> </option>
                        {menus
                            .filter((menu) => {
                                return menu.id !== item.menu_id;
                            })
                            .map((menu) => {
                                return (
                                    <option key={menu.id} value={menu.id}>
                                        {menu.day}
                                    </option>
                                );
                            })}
                    </CFormSelect>
                    {error && <div className="text-danger">Блюдо с таким типом уже существует</div>}
                    <CButton className="mt-2 me-2" size="sm" onClick={() => editDish()} disabled={!selectedMenu}>
                        Перенести
                    </CButton>
                    <CButton className="mt-2" size="sm" color="danger" onClick={() => deleteDish()}>
                        Удалить
                    </CButton>
                </CCardBody>
            </CCard>
        </CCol>
    );
};

export default Dish;
