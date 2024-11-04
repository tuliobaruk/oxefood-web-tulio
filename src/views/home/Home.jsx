import React from "react";
import MenuSistema from "../../MenuSistema";
import { Container, Grid, Image } from 'semantic-ui-react';

export default function Home () {

   return(
       <div>
        <MenuSistema tela={"home"}/>
           <div style={{marginTop: '5%'}}>
               <Container>
                   <Grid columns={2} divided>
                       <Grid.Row>
                           <Grid.Column>
                               <Image src='/logo-IFPE.png' size='large' />
                           </Grid.Column>
                           <Grid.Column>
                              
                               Bem vindo ao sistema <strong>OxeFood</strong> ! <br/>
                               Este sistema foi desenvolvido na disciplina de Desenvolvimento para WEB IV. <br/> <br/>
                               Para acessar o código da <strong>API</strong> do sistema, acesse: <a href='https://github.com/tuliobaruk/oxefood-api-tulio' target='_blank'> https://github.com/tuliobaruk/oxefood-api-tulio </a> <br/> <br/>
                               Para acessar o código do <strong>Módulo WEB</strong>, acesse: <a href='https://github.com/tuliobaruk/oxefood-web-tulio' target='_blank'> https://github.com/tuliobaruk/oxefood-web-tulio </a>

                           </Grid.Column>
                       </Grid.Row>
                   </Grid>
               </Container>
           </div>
       </div>
   )
}
