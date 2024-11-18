import React from 'react';
import { Route, Routes } from "react-router-dom";

import FormCliente from './views/cliente/FormCliente';
import ListCliente from './views/cliente/ListCliente';
import FormEntregador from './views/entregador/FormEntregador';
import Home from './views/home/Home';
import FormProduto from './views/produto/FormProduto';

import ListConfiguracaoSistema from './views/configuracaoSistema/ListConfiguracaoSistema';
import FormConfiguracaoSistema from './views/configuracaoSistema/FormConfiguracaoSistema';

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="list-cliente" element={ <ListCliente/> } />
                <Route path="form-cliente" element={ <FormCliente/> } />
                <Route path="form-produto" element={ <FormProduto/> } />
                <Route path="form-entregador" element={ <FormEntregador/> } />
                <Route path="list-configuracaoSistema" element={ <ListConfiguracaoSistema/> } />
                <Route path="form-configuracaoSistema" element={ <FormConfiguracaoSistema/>} />
            </Routes>
        </>
    )
}

export default Rotas