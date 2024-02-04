import { CCard, CCardBody, CButton, CFormInput, CContainer, CRow } from '@coreui/react';
import { useState, useEffect } from 'react';
import Dish from './Dish';
import CreateDish from './CreateDish';

const Menu = ({ item, loadMenus, menus }) => {
    const [edit, setEdit] = useState(false);
    const [day, setDay] = useState('');
    const [dishes, setDishes] = useState([]);

    const sortedDishes = ['Салат', 'Первое', 'Второе', 'Напиток', 'Десерт'];

    useEffect(() => {
        loadDishes();
    }, [menus]);

    useEffect(() => {
        setDay(item.day);
    }, [item]);

    const loadDishes = () => {
        fetch(`http://localhost:8080/api/menu_dishes/${item.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setDishes(data);
            });
    };

    const deleteMenu = (id) => {
        fetch(`http://localhost:8080/api/menu/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            loadMenus();
        });
    };

    const editMenu = (id) => {
        const data = { id: id, day: day };
        fetch(`http://localhost:8080/api/menu`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            loadMenus();
            setEdit(false);
        });
    };

    return (
        <CCard className="mb-3" key={item.id}>
            <CCardBody>
                <div className="d-flex">
                    {!edit ? (
                        <span className="pt-1">{item.day}</span>
                    ) : (
                        <>
                            <CFormInput value={day} className="w-25" onChange={(e) => setDay(e.target.value)} />
                        </>
                    )}
                    {!edit ? (
                        <CButton size="sm" className="ms-2" color="warning" onClick={() => setEdit(true)}>
                            Редактировать
                        </CButton>
                    ) : (
                        <CButton size="sm" className="ms-2" color="success" onClick={() => editMenu(item.id)}>
                            Сохранить
                        </CButton>
                    )}
                    <CButton size="sm" className="ms-2" color="danger" onClick={() => deleteMenu(item.id)}>
                        Удалить
                    </CButton>
                </div>
                <hr />
                <CContainer fluid className="p-0 m-0">
                    <CRow>
                        {!!dishes.length &&
                            sortedDishes.map((dish) => {
                                return dishes
                                    .filter((item) => item.type === dish)
                                    .map((item) => {
                                        return (
                                            <Dish
                                                key={item.id}
                                                item={item}
                                                loadDishes={() => loadDishes()}
                                                menus={menus}
                                                loadMenus={() => loadMenus()}
                                            />
                                        );
                                    });
                            })}
                        <CreateDish menuId={item.id} loadDishes={() => loadDishes()} dishes={dishes} />
                    </CRow>
                </CContainer>
            </CCardBody>
        </CCard>
    );
};
export default Menu;
