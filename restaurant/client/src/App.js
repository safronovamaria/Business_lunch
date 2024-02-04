import { useState, useEffect } from 'react';
import { CCard, CContainer, CRow, CCol, CCardBody, CCardHeader } from '@coreui/react';
import './App.css';
import Menu from './Menu';
import CreateMenu from './CreateMenu';

const App = () => {
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        loadMenus();
    }, []);

    const loadMenus = () => {
        fetch('http://localhost:8080/api/menu', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setMenus(data);
            });
    };

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>Варианты меню</CCardHeader>
                            <CCardBody>
                                {!!menus.length &&
                                    menus.map((item) => {
                                        return (
                                            <Menu
                                                key={item.id}
                                                loadMenus={() => loadMenus()}
                                                item={item}
                                                menus={menus}
                                            />
                                        );
                                    })}
                                <CreateMenu loadMenus={() => loadMenus()} />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

export default App;
