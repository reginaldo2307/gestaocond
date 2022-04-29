import { tsDeclareFunction, tsImportEqualsDeclaration } from "@babel/types";
import CIcon from "@coreui/icons-react";
import { 
    CButton, 
    CButtonGroup, 
    CCard, 
    CCardBody, 
    CCardHeader, 
    CCol, 
    CDataTable, 
    CModalBody, 
    CModal, 
    CModalHeader, 
    CRow, 
    CModalFooter,
    CFormGroup,
    CLabel,
    CInput,
    CTextarea
} from "@coreui/react";
import React,{ useState, useEffect } from "react";
import useApi from '../services/api'

export default () => {
    const api = useApi();

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [modalTitleField, setModalTitleField] = useState('');
    const [modalBodyField, setModalBodyField] = useState('');
    const [modalId, setModalId] = useState('');

    const fields = [
        {label: 'Título', key: 'title'},
        {label: 'Data de Criação', key: 'datecreated'},
        {label: 'Ações', key: 'actions', _style:{width:'1px'}}
    ];

    useEffect(()=>{
        getList();
    }, []);

    const getList = async () => {
        setLoading(true);
        const result = await api.getWall();
        setLoading(false);
        if(result.error === '') {
            setList(result.list);
        }else {
            alert(result.error);
        }
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleEditButton = (id) => {
        let index = list.findIndex(v=>v.id===id);
        setModalId(list[index]['id']);
        setModalTitleField(list[index]['title']);
        setModalBodyField(list[index]['body']);
        setShowModal(true);
    }

    const handleRemoveButton = async (id) => {
        if(window.confirm('Tem certeza que deseja excluir?')) {
            const result = await api.removeWall(id);
            if(result.error === '') {
                getList();
            }else {
                alert(result.error);
            }
        }
    }

    const handleNewButton = () => {
        setModalId('');
        setModalTitleField('');
        setModalBodyField('');
        setShowModal(true);
    }

    const handleModalSave = async () => {
        if(modalTitleField && modalBodyField) {
            setModalLoading(true);
            let result;
            let data = {
                title: modalTitleField,
                body: modalBodyField
            };
            if(modalId === '') {
                result = await api.addWall(data); 
            }else {
                result = await api.updateWall(modalId, data);
            }
            setModalLoading(false);
            if(result.error === '') {
                setShowModal(false);
                getList();
            }else {
                alert(result.error);
            }
        }else {
            alert('Preencha os campos!');
        }
    }

    return (
        <>
            <CRow>
                <CCol>
                    <h2>Mural de Avisos</h2>

                    <CCard>
                        <CCardHeader>
                            <CButton color="primary" onClick={handleNewButton}>
                                <CIcon name="cil-check"/> Novo Aviso
                            </CButton>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={list}
                                fields={fields}
                                loading={loading}
                                noItemsViewSlot=" "
                                hover
                                striped
                                bordered
                                pagination
                                itemsPerPage={5}
                                scopedSlots={{
                                    'actions': (item)=>(
                                        <td>
                                            <CButtonGroup>
                                                <CButton color="info" onClick={()=>handleEditButton(item.id)}>Editar</CButton>
                                                <CButton color="danger" onClick={()=>handleRemoveButton(item.id)}>Excluir</CButton>
                                            </CButtonGroup>
                                        </td>
                                    )
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CModal show={showModal} onClose={handleCloseModal}>
                <CModalHeader closeButton>{modalId===''?'Novo':'Editar'} Aviso</CModalHeader>
                <CModalBody>
                    <CFormGroup>
                        <CLabel htmlFor="modal-title">Título do Aviso</CLabel>
                        <CInput
                            type="text"
                            id="modal-title"
                            placeholder="Digite um título para o aviso"
                            value={modalTitleField}
                            onChange={e=>setModalTitleField(e.target.value)}
                            disabled={modalLoading}
                        />
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel htmlFor="modal-body">Corpo do Aviso</CLabel>
                        <CTextarea
                            id="modal-body"
                            placeholder="Digite uma mensagem para o aviso"
                            value={modalBodyField}
                            onChange={e=>setModalBodyField(e.target.value)}
                            disabled={modalLoading}
                        />
                    </CFormGroup>
                </CModalBody>
                <CModalFooter>
                    <CButton 
                        color="primary" 
                        onClick={handleModalSave} 
                        disabled={modalLoading}
                    >
                        {modalLoading ? 'Aguarde...' : 'Salvar'}
                    </CButton>
                    <CButton 
                        color="secondary" 
                        onClick={handleCloseModal}
                        disabled={modalLoading}
                    >
                        {modalLoading ? 'Aguarde...' : 'Cancelar'}
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    );
}