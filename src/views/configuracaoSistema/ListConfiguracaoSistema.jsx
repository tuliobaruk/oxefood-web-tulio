import axios from 'axios';
import React, { useEffect, useState } from "react";
import {Modal} from 'semantic-ui-react';
import {Header} from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListConfiguracaoSistema() {

    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openModalDetalhes, setOpenModalDetalhes] = useState(false);
    const [idRemover, setIdRemover] = useState();

    const [idDetalhes, setIdDetalhes] = useState();
    const [nomeEmpresaDetalhes, setNomeEmpresaDetalhes] = useState();
    const [cnpjDetalhes, setCnpjDetalhes] = useState();
    const [siteDetalhes, setSiteDetalhes] = useState();
    const [emailContatoDetalhes, setEmailContatoDetalhes] = useState();
    const [tempoMinimoAgendamentoPedidosDetalhes, setTempoMinimoAgendamentoPedidosDetalhes] = useState();
    const [ligarAceitePedidosDetalhes, setLigarAceitePedidosDetalhes] = useState();
    const [dataEntradaSistemaDetalhes, setDataEntradaSistemaDetalhes] = useState();




    useEffect(() => {
        carregarLista();
    }, [])

    function carregarLista() {

        axios.get("http://localhost:8080/api/configuracaoSistema")
            .then((response) => {
                setLista(response.data)
            })
    }

    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }

    function modalDeDetalhes(id,nomeEmpresaDetalhes,cnpjDetalhes, siteDetalhes,emailContatoDetalhes, tempoMinimoAgendamentoPedidosDetalhes, ligarAceitePedidosDetalhes, dataEntradaSistemaDetalhes) {
        setOpenModalDetalhes(true)
        setIdDetalhes(id)
        setNomeEmpresaDetalhes(nomeEmpresaDetalhes)
        setCnpjDetalhes(cnpjDetalhes)
        setSiteDetalhes(siteDetalhes)
        setEmailContatoDetalhes(emailContatoDetalhes)
        setTempoMinimoAgendamentoPedidosDetalhes(tempoMinimoAgendamentoPedidosDetalhes)
        if(ligarAceitePedidosDetalhes){
            setLigarAceitePedidosDetalhes("Sim")
        } else{
            setLigarAceitePedidosDetalhes("Não")
        }
        setDataEntradaSistemaDetalhes(dataEntradaSistemaDetalhes)
    }

    async function remover() {
        await axios.delete('http://localhost:8080/api/configuracaoSistema/' + idRemover)
            .then((response) => {
                console.log('Configuração do sistema removida com sucesso.')
                axios.get("http://localhost:8080/api/configuracaoSistema")
                    .then((response) => {
                        setLista(response.data)
                    })
            })
            .catch((error) => {
                console.log('Erro ao remover uma Configuração do sistema.')
            })
        setOpenModal(false)
    }

    return (
        <div>
            <MenuSistema tela={'ConfiguracaoSistema'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Configuração Sistema </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-configuracaoSistema'
                        />

                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>id</Table.HeaderCell>
                                    <Table.HeaderCell>nomeEmpresa</Table.HeaderCell>
                                    <Table.HeaderCell>CNPJ</Table.HeaderCell>
                                    <Table.HeaderCell>emailContato</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map(configuracaoSistema => (

                                    <Table.Row key={configuracaoSistema.id}>
                                        <Table.Cell>{configuracaoSistema.id}</Table.Cell>
                                        <Table.Cell>{configuracaoSistema.nomeEmpresa}</Table.Cell>
                                        <Table.Cell>{configuracaoSistema.cnpj}</Table.Cell>
                                        <Table.Cell>{configuracaoSistema.emailContato}</Table.Cell>
                                        <Table.Cell textAlign='center'>

                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados desta configuração do sistema'
                                                icon>
                                                <Link to="/form-configuracaoSistema" state={{ id: configuracaoSistema.id }} style={{ color: 'green' }}>
                                                    <Icon name='edit' />
                                                </Link>
                                            </Button> &nbsp;

                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover esta configuraçãoSistema'
                                                icon
                                                onClick={e => confirmaRemover(configuracaoSistema.id)}>
                                                <Icon name='trash' />
                                            </Button>&nbsp;

                                            <Button
                                                inverted
                                                circular
                                                color='brown'
                                                title='Clique aqui para ver os detalhes desta configuraçãoSistema'
                                                icon
                                                onClick={e => modalDeDetalhes(configuracaoSistema.id, configuracaoSistema.nomeEmpresa, configuracaoSistema.cnpj, configuracaoSistema.site, configuracaoSistema.emailContato,configuracaoSistema.tempoMinimoAgendamentoPedidos, configuracaoSistema.ligarAceitePedidos, formatarData(configuracaoSistema.dataEntradaSistema))}
                                                >
                                                <Icon name='zoom' />
                                            </Button>

                                        </Table.Cell>
                                    </Table.Row>
                                ))}

                            </Table.Body>
                        </Table>
                    </div>
                </Container>
            </div>
            <Modal
                basic
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                open={openModal}
            >
                <Header icon>
                    <Icon name='trash' />
                    <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                        <Icon name='remove' /> Não
                    </Button>
                    <Button color='green' inverted onClick={() => remover()}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>

            <Modal
                basic
                onClose={() => setOpenModalDetalhes(false)}
                onOpen={() => setOpenModalDetalhes(true)}
                open={openModalDetalhes}
            >
                <Header icon>
                    <Icon name='zoom' />
                    <div style={{ marginTop: '5%' }}> Detalhes </div>
                </Header>
                Id: {idDetalhes}<br></br>
                nomeEmpresa: {nomeEmpresaDetalhes}<br></br>
                cnpj: {cnpjDetalhes}<br></br>
                site: {siteDetalhes}<br></br>
                emailContato: {emailContatoDetalhes}<br></br>
                tempoMinimoAgendamentoPedidos: {tempoMinimoAgendamentoPedidosDetalhes}<br></br>
                ligarAceitePedidosDetalhes: {ligarAceitePedidosDetalhes}<br></br>
                dataEntradaSistema: {dataEntradaSistemaDetalhes}<br></br>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenModalDetalhes(false)}>
                        <Icon name='reply' /> Voltar
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}
