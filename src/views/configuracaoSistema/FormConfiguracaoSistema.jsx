import React, { useEffect, useState } from "react";
import axios from "axios";
import InputMask from 'react-input-mask';
import MenuSistema from "../../MenuSistema";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon, Radio } from 'semantic-ui-react';

export default function FormConfiguracaoSistema() {

    const { state } = useLocation();
    const [idConfiguracaoSistema, setIdConfiguracaoSistema] = useState();

    const [nomeEmpresa, setNomeEmpresa] = useState();
    const [cnpj, setCnpj] = useState();
    const [site, setSite] = useState();
    const [emailContato, setEmailContato] = useState();
    const [tempoMinimoAgendamentoPedidos, setTempoMinimoAgendamentoPedidos] = useState();
    const [dataEntradaSistema, setDataEntradaSistema] = useState();
    const [ligarAceitePedidos, setLigarAceitePedidos] = useState(true);

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/configuracaoSistema/" + state.id)
                .then((response) => {
                    console.log(response)
                    setIdConfiguracaoSistema(response.data.id)
                    setNomeEmpresa(response.data.nomeEmpresa)
                    setEmailContato(response.data.emailContato)
                    setSite(response.data.site)
                    setTempoMinimoAgendamentoPedidos(response.data.tempoMinimoAgendamentoPedidos)
                    setCnpj(response.data.cnpj)
                    setDataEntradaSistema(formatarData(response.data.dataEntradaSistema))
                    setLigarAceitePedidos(response.data.ligarAceitePedidos)
                })
        }
    }, [state])

    function salvar() {

        let configuracaoSistemaRequest = {
            nomeEmpresa: nomeEmpresa,
            cnpj: cnpj,
            site: site,
            emailContato: emailContato,
            tempoMinimoAgendamentoPedidos: tempoMinimoAgendamentoPedidos,
            ligarAceitePedidos: ligarAceitePedidos,
            dataEntradaSistema: dataEntradaSistema
        }

        if (idConfiguracaoSistema != null) {
            axios.put("http://localhost:8080/api/configuracaoSistema/" + idConfiguracaoSistema, configuracaoSistemaRequest)
                .then((response) => { console.log('Configuração do sistema alterada com sucesso.') })
                .catch((error) => { console.log('Erro ao alterar a configuração do sistema.') })
        } else {
            axios.post("http://localhost:8080/api/configuracaoSistema", configuracaoSistemaRequest)
                .then((response) => {
                    console.log('Configuração do sistema cadastrada com sucesso.')
                })
                .catch((error) => {
                    console.log('Erro ao incluir a configuração do sistema.')
                })
        }
    }

    function formatarData(data){
        let arrayData = data.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    return (

        <div>

            <MenuSistema tela={'ConfiguracaoSistema'} />


            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    {idConfiguracaoSistema === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Configuração do Sistema &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idConfiguracaoSistema != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Configuração do Sistema &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }
                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome da Empresa'
                                    maxLength="100"
                                    value={nomeEmpresa}
                                    onChange={e => setNomeEmpresa(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='CNPJ'
                                    width={4}
                                >
                                    <InputMask
                                        required
                                        mask="99.999.999/9999-99"
                                        value={cnpj}
                                        onChange={e => setCnpj(e.target.value)}
                                    />
                                </Form.Input>


                                <Form.Input
                                    fluid
                                    label='Site'
                                    width={4}
                                >
                                    <InputMask
                                        value={site}
                                        onChange={e => setSite(e.target.value)}
                                    />
                                </Form.Input>

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Data de Entrada'
                                    width={6}
                                >
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataEntradaSistema}
                                        onChange={e => setDataEntradaSistema(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    label='Email de Contato'
                                    width={6}>
                                    <InputMask
                                        value={emailContato}
                                        placeholder="algumaempresa@gmail.com"
                                        onChange={e => setEmailContato(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Tempo minimo de agendamento de pedidos'
                                    width={6}>
                                    <InputMask
                                        value={tempoMinimoAgendamentoPedidos}
                                        onChange={e => setTempoMinimoAgendamentoPedidos(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>
                            <Form.Group>
                                <Form.Radio
                                    toggle
                                    label="Ligar aceite de pedidos"
                                    value={ligarAceitePedidos}
                                    onChange={e => setLigarAceitePedidos(e.target.value)}
                                ></Form.Radio>
                            </Form.Group>

                        </Form>

                        <div style={{ marginTop: '4%' }}>

                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                                as={Link}
                                to='/list-configuracaoSistema'
                            >
                                <Icon name='reply' />
                                Voltar
                            </Button>


                            <Link to={'/list-configuracaoSistema'}>
                                <Button
                                    inverted
                                    circular
                                    icon
                                    labelPosition='left'
                                    color='blue'
                                    floated='right'
                                    onClick={() => salvar()}
                                >
                                    <Icon name='save' />
                                    Salvar
                                </Button>
                            </Link>

                        </div>

                    </div>

                </Container>
            </div>
        </div>

    );

}
