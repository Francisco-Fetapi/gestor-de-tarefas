import React, { useState } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import TextField from "@material-ui/core/TextField";

import ArrowBack from "@material-ui/icons/ArrowBack";
import FilterList from "@material-ui/icons/FilterList";

function DialogFiltrar({
  fecharModalFiltros,
  ocultarMenu,
  setarMensagem,
  getTarefas,
  setTarefas,
}) {
  const dataAtual = new Date();
  const [filtroInfo, setFiltroInfo] = useState({
    dia: dataAtual.getDate(),
    mes: dataAtual.getMonth(),
    ano: dataAtual.getFullYear(),
  });
  const [filtros, setFiltros] = useState({
    dia: false,
    mes: false,
    ano: false,

    tipo: "1",
  });

  function handleChange(e, nv) {
    const elem = e.target;
    const prop = elem.name;
    const value = elem.value;

    setFiltroInfo({ ...filtroInfo, [prop]: value });
  }
  function handleChangeFiltros(e) {
    const elem = e.target;
    const prop = elem.getAttribute("name");
    const checked = elem.checked;

    if (prop === "tipo") {
      const value = elem.value;
      setFiltros({ ...filtros, [prop]: value });
      return;
    }

    setFiltros({ ...filtros, [prop]: checked });
  }

  function filtrar() {
    const tarefas = getTarefas();
    // recolhendo infos do filtro
    const { dia, mes, ano } = filtroInfo;

    const filtrar_dia = filtros.dia;
    const filtrar_mes = filtros.mes;
    const filtrar_ano = filtros.ano;

    const tipo_tarefa = filtros.tipo;

    function obterInfoData(data) {
      let Data = new Date(data);

      let dia = Data.getDate();
      let mes = Data.getMonth();
      let ano = Data.getFullYear();

      return { dia, mes, ano };
    }
    function filtrar_pelo_dia(dia_do_filtro, Tarefas) {
      const tarefas_filtradas = Tarefas.filter((tarefa) => {
        const { dia } = obterInfoData(tarefa.data);
        if (dia_do_filtro == dia) return true;
        return false;
      });

      return tarefas_filtradas;
    }
    function filtrar_pelo_mes(mes_do_filtro, Tarefas) {
      const tarefas_filtradas = Tarefas.filter((tarefa) => {
        const { mes } = obterInfoData(tarefa.data);
        if (mes_do_filtro == mes) return true;
        return false;
      });

      return tarefas_filtradas;
    }
    function filtrar_pelo_ano(ano_do_filtro, Tarefas) {
      const tarefas_filtradas = Tarefas.filter((tarefa) => {
        const { ano } = obterInfoData(tarefa.data);
        if (ano_do_filtro == ano) return true;
        return false;
      });

      return tarefas_filtradas;
    }
    function filtrar_as_concluidas() {
      const tarefas_filtradas = tarefas.filter((tarefa) => {
        if (tarefa.status === true) return true;
      });

      return tarefas_filtradas;
    }
    function filtrar_as_nao_concluidas() {
      const tarefas_filtradas = tarefas.filter((tarefa) => {
        if (tarefa.status === false) return true;
      });

      return tarefas_filtradas;
    }

    let tarefas_filtradas = tarefas;
    // Aqui comeca o filtro
    // if(tipo_tarefa === '1') tarefas_filtradas = tarefas;
    if (tipo_tarefa === "2") tarefas_filtradas = filtrar_as_concluidas();
    if (tipo_tarefa === "3") tarefas_filtradas = filtrar_as_nao_concluidas();

    if (filtrar_dia) {
      tarefas_filtradas = filtrar_pelo_dia(dia, tarefas_filtradas);
    }
    if (filtrar_mes) {
      tarefas_filtradas = filtrar_pelo_mes(mes, tarefas_filtradas);
    }
    if (filtrar_ano) {
      tarefas_filtradas = filtrar_pelo_ano(ano, tarefas_filtradas);
    }

    let mensagem;
    if (tarefas_filtradas.length > 0) {
      setTarefas(tarefas_filtradas);
      mensagem = (
        <Typography variant="body2"> Filtro realizado com sucesso!</Typography>
      );
      setarMensagem(mensagem, 4, "success");
      fecharModalFiltros();
      ocultarMenu();
    } else {
      mensagem = (
        <Typography variant="body2">
          {" "}
          Nenhuma tarefa corresponde ao filtro especificado!
        </Typography>
      );
      setarMensagem(mensagem, 4, "warning");
    }
  }
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  return (
    <div>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Box display="flex" alignItems="center">
            <IconButton onClick={() => fecharModalFiltros()}>
              <ArrowBack />
            </IconButton>
            <Box marginLeft={1}>
              <Typography variant="h6">Formas de Filtro</Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Box>
        <Typography variant="h6">Por data</Typography>
        <Box marginTop={2}>
          <FormGroup row>
            <FormControlLabel
              label="Dia"
              name="dia"
              checked={filtros.dia}
              control={<Checkbox />}
              onChange={handleChangeFiltros}
            />
            <FormControlLabel
              label="Mes"
              name="mes"
              checked={filtros.mes}
              control={<Checkbox />}
              onChange={handleChangeFiltros}
            />
            <FormControlLabel
              label="Ano"
              name="ano"
              checked={filtros.ano}
              control={<Checkbox />}
              onChange={handleChangeFiltros}
            />
          </FormGroup>
        </Box>
        <Box marginTop={2} width={0.8} display="flex" flexDirection="column">
          {filtros.dia && (
            <>
              <TextField
                type="number"
                name="dia"
                value={filtroInfo.dia}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: 0, max: 31 }}
                color="secondary"
                variant="outlined"
                label="Dia"
              />
              <br />
            </>
          )}
          {filtros.mes && (
            <>
              <TextField
                select
                value={filtroInfo.mes}
                name="mes"
                onChange={handleChange}
                color="secondary"
                variant="outlined"
                label="Mes"
              >
                {meses.map((mes, key) => (
                  <MenuItem value={key} key={key}>
                    {mes}
                  </MenuItem>
                ))}
              </TextField>
              <br />
            </>
          )}
          {filtros.ano && (
            <TextField
              type="number"
              name="ano"
              value={filtroInfo.ano}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              color="secondary"
              variant="outlined"
              label="Ano"
            />
          )}
        </Box>
        <Box marginTop={2}>
          <Typography variant="h6">Por Conclusao</Typography>
          <Box marginTop={1}>
            <RadioGroup
              row
              name="tipo"
              value={filtros.tipo}
              onChange={handleChangeFiltros}
            >
              <FormControlLabel value="1" label="Todas" control={<Radio />} />
              <FormControlLabel
                value="2"
                label="Concluidas"
                control={<Radio />}
              />
              <FormControlLabel
                value="3"
                label="Não concluidas"
                control={<Radio />}
              />
            </RadioGroup>
          </Box>
        </Box>
      </Box>

      <Box className="fab_filtrar">
        <Tooltip title="Filtrar" arrow>
          <Fab color="primary" onClick={filtrar}>
            <FilterList />
          </Fab>
        </Tooltip>
      </Box>
    </div>
  );
}

export default DialogFiltrar;
