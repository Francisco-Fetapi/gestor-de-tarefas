import React, { useState } from 'react'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


function CadastrarTarefa({setTarefa}) {
    const [titulo,setTitulo] = useState('');
    const [descricao,setDescricao] = useState('');


    function cadastrar(){
        const info = {
            titulo,
            descricao,
            data:new Date(),
            status:false
        }
        const setou = setTarefa(info);
        if(setou){
            setTitulo('');
            setDescricao('')
        }
    }

    return (
    
        <Box display="flex" flexDirection="column">
            <TextField color="primary" value={titulo} onChange={(e)=>setTitulo(e.target.value)} variant="outlined" label="Titulo da tarefa" InputLabelProps={{shrink:true}}/>
            <br />
            <TextField color="primary" value={descricao} onChange={(e)=>setDescricao(e.target.value)} multiline rows={8} variant="outlined" label="Descrição da tarefa" InputLabelProps={{shrink:true}}/>
            <br />
            <Button className="form_button" onClick={cadastrar} color="primary" variant="contained">Cadastrar Tarefa</Button>
        </Box>
    )
}

export default CadastrarTarefa
