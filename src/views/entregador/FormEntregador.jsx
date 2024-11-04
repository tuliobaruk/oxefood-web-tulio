import React, { useState } from "react";
import axios from "axios";
import InputMask from 'react-input-mask';
import MenuSistema from "../../MenuSistema";
import { Button, Container, Divider, Form, Icon, Radio} from 'semantic-ui-react';

export default function FormEntregador() {

    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [rg, setRg] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState();
    const [valorFrete, setValorFrete] = useState();
    const [enderecoRua, setenderecoRua] = useState();
    const [enderecoComplemento, setenderecoComplemento] = useState();
    const [enderecoNumero, setenderecoNumero] = useState();
    const [enderecoBairro, setenderecoBairro] = useState();
    const [enderecoCidade, setenderecoCidade] = useState();
    const [enderecoCep, setenderecoCep] = useState();
    const [enderecoUf, setenderecoUf] = useState();
    const [ativo, setAtivo] = useState(true);

    function salvar() {

        let entregadorRequest = {
            nome: nome,
            cpf: cpf,
            rg: rg,
            dataNascimento: dataNascimento,
            foneCelular: foneCelular,
            foneFixo: foneFixo,
            qtdEntregasRealizadas: qtdEntregasRealizadas,
            valorFrete: valorFrete,
            enderecoRua: enderecoRua,
            enderecoComplemento: enderecoComplemento,
            enderecoNumero: enderecoNumero,
            enderecoBairro: enderecoBairro,
            enderecoCidade: enderecoCidade,
            enderecoCep: enderecoCep,
            enderecoUf: enderecoUf,
            ativo: ativo
        }

        axios.post("http://localhost:8080/api/entregador", entregadorRequest)
            .then((response) => {
                console.log('Entregador cadastrado com sucesso.')
            })
            .catch((error) => {
                console.log('Erro ao incluir o entregador.')
            })
    }

    return (

        <div>

            <MenuSistema tela={'entregador'} />


            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='CPF'
                                    width={4}
                                >
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                        value={cpf}
                                        onChange={e => setCpf(e.target.value)}
                                    />
                                </Form.Input>


                                <Form.Input
                                    fluid
                                    label='RG'
                                    width={4}
                                >
                                    <InputMask
                                        mask="9.999.999"
                                        value={cpf}
                                        onChange={e => setRg(e.target.value)}
                                    />
                                </Form.Input>

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Data Nascimento'
                                    width={6}
                                >
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataNascimento}
                                        onChange={e => setDataNascimento(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    label='Fone Celular'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 99999.9999"
                                        value={foneCelular}
                                        onChange={e => setFoneCelular(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                        value={foneFixo}
                                        onChange={e => setFoneFixo(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Qtd Entregas Realizadas'
                                    width={6}>
                                    <InputMask
                                        value={qtdEntregasRealizadas}
                                        onChange={e => setQtdEntregasRealizadas(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Valor Por Frete'
                                    width={6}>
                                    <InputMask
                                        value={valorFrete}
                                        onChange={e => setValorFrete(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Rua'
                                    width={13}
                                    value={enderecoRua}
                                    onChange={e => setenderecoRua(e.target.value)}
                                >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Número'
                                    width={3}
                                    value={enderecoNumero}
                                    onChange={e => setenderecoNumero(e.target.value)}
                                >
                                </Form.Input>
                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Bairro'
                                    width={7}
                                    value={enderecoBairro}
                                    onChange={e => setenderecoBairro(e.target.value)}
                                >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Cidade'
                                    width={6}
                                    value={enderecoCidade}
                                    onChange={e => setenderecoCidade(e.target.value)}
                                >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='CEP'
                                    width={3}
                                    value={enderecoCep}
                                    onChange={e => setenderecoCep(e.target.value)}
                                >
                                </Form.Input>

                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='UF'
                                    width={16}
                                    value={enderecoUf}
                                    onChange={e => setenderecoUf(e.target.value)}
                                >
                                </Form.Input>
                            </Form.Group>

                            
                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Complemento'
                                    width={16}
                                    value={enderecoComplemento}
                                    onChange={e => setenderecoComplemento(e.target.value)}
                                >
                                </Form.Input>
                            </Form.Group>

                            <Form.Group>
                                <Form.Radio
                                toggle
                                label="Ativo"
                                value={ativo}
                                onChange={e => setAtivo(e.target.value)}
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
                            >
                                <Icon name='reply' />
                                Voltar
                            </Button>

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

                        </div>

                    </div>

                </Container>
            </div>
        </div>

    );

}
