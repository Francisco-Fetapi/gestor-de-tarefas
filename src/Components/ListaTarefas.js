import React, { useState } from "react";

import Slide from "@material-ui/core/Slide";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionActions from "@material-ui/core/AccordionActions";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import ExpandMore from "@material-ui/icons/ExpandMore";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Done from "@material-ui/icons/Done";
import Save from "@material-ui/icons/Save";
import Close from "@material-ui/icons/Close";

import DialogFiltrar from "./DialogFiltrar";

const Transition = React.forwardRef(function (props, ref) {
  return <Slide ref={ref} direction="up" {...props} />;
});
function ListaTarefas({
  tarefas,
  setTarefas,
  ocultarMenu,
  setarTarefas,
  getTarefas,
  setarMensagem,
  modalFiltros,
  fecharModalFiltros,
}) {
  const Tarefas = getTarefas();
  const [modalConfirmacao, setModalConfirmacao] = useState({
    estado: false,
    pergunta: "Tem certeza disso?",
    mensagem: "",
  });

  const [tarefaSelecionada, setTarefaSelecionada] = useState(-1);
  const tarefa_selecionada = tarefas[tarefaSelecionada || 0];
  const [tEditar, setTEditar] = useState({
    titulo: tarefa_selecionada ? tarefa_selecionada.titulo : "",
    descricao: tarefa_selecionada ? tarefa_selecionada.descricao : "",
  });
  const [acao, setAcao] = useState("");
  const [tituloTarefaSelecionada, setTituloTarefaSelecionada] = useState("");

  React.useEffect(() => {
    if (tarefaSelecionada > -1 && tarefas[tarefaSelecionada]) {
      setTEditar({
        titulo: tarefas[tarefaSelecionada].titulo,
        descricao: tarefas[tarefaSelecionada].descricao,
      });
    }
  }, [tarefaSelecionada]);
  const [modalEditar, setModalEditar] = useState(false);
  function mudarCampos(e) {
    const elem = e.target;
    const elem_id = elem.getAttribute("id");
    const elem_value = elem.value;
    setTEditar({ ...tEditar, [elem_id]: elem_value });
  }
  function fecharModal() {
    setModalConfirmacao({ ...modalConfirmacao, estado: false });
  }
  function fecharModalEditar() {
    setModalEditar(false);
  }
  function abrirModalEditar() {
    setModalEditar(true);
  }

  function apagarTarefa(key, titulo) {
    selecionarTarefa(key);
    setAcao("apagar");

    const mensagem = (
      <Typography variant="body2">
        Queres apagar a tarefa <b>"{titulo}"</b> ?
      </Typography>
    );
    setModalConfirmacao({ ...modalConfirmacao, estado: true, mensagem });
    setTituloTarefaSelecionada(titulo);
  }
  function selecionarTarefa(key) {
    setTarefaSelecionada(key);
  }
  function editar(key, titulo) {
    selecionarTarefa(key);
    setTituloTarefaSelecionada(titulo);
    abrirModalEditar();
  }
  function concluir(key, titulo) {
    selecionarTarefa(key);
    setTituloTarefaSelecionada(titulo);
    setAcao("concluir");

    const mensagem = (
      <Typography variant="body2">
        Concluir a tarefa <b>"{titulo}"</b>?<br />
        <b>ATENÇÃO: </b> O processo é irreversivel!
      </Typography>
    );
    setModalConfirmacao({ ...modalConfirmacao, estado: true, mensagem });
  }
  function salvarTarefaEditada() {
    const filtrou = Tarefas.length !== tarefas.length;
    const tarefa_ja_existe = Tarefas.some(
      (tarefa, key) =>
        tarefa.titulo === tEditar.titulo && key !== tarefaSelecionada
    );
    const { titulo, descricao } = tEditar;

    const tarefa_selecionada = tarefas[tarefaSelecionada];

    const titulo2 = tarefa_selecionada.titulo;
    const descricao2 = tarefa_selecionada.descricao;

    if (titulo === titulo2 && descricao === descricao2) {
      setarMensagem("Nenhum campo foi alterado", 3, "warning");
    } else if (!/\w+/.test(titulo) || !/\w+/.test(descricao)) {
      setarMensagem("Campos incorretos", 3, "error");
    } else if (tarefa_ja_existe) {
      setarMensagem("A tarefa já existe, escolha um outro titulo", 4, "error");
    } else {
      const tarefa_editada = tarefas[tarefaSelecionada];
      Tarefas.forEach((tarefa, k, tarefas) => {
        if (tarefa.titulo === tituloTarefaSelecionada) {
          tarefas[k].descricao = descricao;
          tarefas[k].titulo = titulo;
        }
      });

      fecharModalEditar();
      function agir() {
        setarTarefas(Tarefas);
        setarMensagem("Tarefa editada com sucesso", 3, "success");
      }

      if (filtrou) {
        // se filtrou
        setarMensagem(
          <Typography>
            O <b>Filtro será desfeito</b>
          </Typography>,
          3,
          "info"
        );
        setTimeout(agir, 3500);
      } else {
        agir();
      }
    }
  }
  function confirmar() {
    const filtrou = Tarefas.length !== tarefas.length;

    function agir() {
      if (acao === "apagar") {
        //apagar a tarefa selecionada
        const novasTarefas = Tarefas.filter(
          (tarefa, key) => tarefa.titulo !== tituloTarefaSelecionada
        );
        setarTarefas(novasTarefas);
        setarMensagem(
          <span>
            A tarefa <b>"{tituloTarefaSelecionada}"</b> foi eliminada
          </span>,
          3,
          "success"
        );
      }
      if (acao === "concluir") {
        Tarefas.forEach((tarefa, k, tarefas) => {
          if (tarefa.titulo === tituloTarefaSelecionada) {
            tarefas[k].status = true;
          }
        });

        setarTarefas(Tarefas);
        setarMensagem(
          <Typography>
            Concluiste a tarefa <b>{tituloTarefaSelecionada}</b>
          </Typography>,
          3,
          "success"
        );
      }
    }
    if (filtrou && acao.length > 0) {
      // se filtrou e se realizou alguma acao com as tarefas
      setarMensagem(
        <Typography>
          O <b>Filtro será desfeito</b>
        </Typography>,
        3,
        "info"
      );
      setTimeout(agir, 3500);
    } else {
      agir();
    }
    fecharModal();
  }
  function foiConcluida(tarefa) {
    return tarefa.status;
  }
  return (
    <Box>
      {tarefas.length === 0 && (
        <Box marginTop={3}>
          <Typography align="center" variant="h6" color="textSecondary">
            Lista de tarefas vazia!
          </Typography>
        </Box>
      )}
      {tarefas.map((tarefa, key) => {
        let Data = new Date(tarefa.data);

        let dia = Data.getDate();
        let mes = Data.getMonth() + 1;
        mes = mes <= 9 ? `0${mes}` : mes;
        let ano = Data.getFullYear();

        let hora = Data.getHours();
        let minutos = Data.getMinutes();
        minutos = minutos <= 9 ? `0${minutos}` : minutos;

        let dia_da_semana = Data.getDay();
        const semanas = [
          "Domingo",
          "Segunda-feira",
          "Terça-feira",
          "Quarta-feira",
          "Quinta-feira",
          "Sexta-feira",
          "Sábado",
        ];
        dia_da_semana = semanas[dia_da_semana];

        const data = `${dia}/${mes}/${ano}`;
        const data_hora = `${hora}:${minutos}`;
        const Status = tarefa.status ? "Sim" : "Não";
        return (
          <Accordion key={key}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6" className="tarefa_titulo">
                {tarefa.titulo}
              </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails style={{ width: "100%" }}>
              <Box
                display="flex"
                style={{ width: "100%" }}
                flexDirection="column"
              >
                <Detalhes titulo="Descrição" desc={tarefa.descricao} quebra />
                <br />
                <Detalhes
                  titulo="Data"
                  desc={
                    <Tooltip title={dia_da_semana} arrow>
                      <span>{data}</span>
                    </Tooltip>
                  }
                />
                <Detalhes titulo="Hora" desc={data_hora} />
                <Detalhes titulo="Concluida" desc={Status} />
              </Box>
            </AccordionDetails>
            <Divider />
            <AccordionActions>
              <Tooltip arrow title="Eliminar tarefa">
                <IconButton onClick={() => apagarTarefa(key, tarefa.titulo)}>
                  <Delete />
                </IconButton>
              </Tooltip>
              {!foiConcluida(tarefa) && (
                <Tooltip arrow title="Editar tarefa">
                  <IconButton onClick={() => editar(key, tarefa.titulo)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
              )}
              {!foiConcluida(tarefa) && (
                <Tooltip arrow title="Marcar como concluida">
                  <IconButton onClick={() => concluir(key, tarefa.titulo)}>
                    <Done />
                  </IconButton>
                </Tooltip>
              )}
            </AccordionActions>
          </Accordion>
        );
      })}

      <Dialog open={modalConfirmacao.estado} onClose={fecharModal}>
        <DialogTitle>{modalConfirmacao.pergunta}</DialogTitle>
        <DialogContent>{modalConfirmacao.mensagem}</DialogContent>
        <DialogActions>
          <Button
            onClick={() => confirmar(acao)}
            className="btn_success"
            variant="contained"
          >
            Sim
          </Button>
          <Button
            onClick={fecharModal}
            className="btn_error"
            variant="contained"
          >
            Não
          </Button>
        </DialogActions>
      </Dialog>

      {tarefaSelecionada > -1 && (
        <Dialog fullWidth open={modalEditar} onClose={fecharModalEditar}>
          <DialogTitle className="modal_title">
            <Box display="flex" justifyContent="center" alignItems="center">
              <Edit />
              <Typography variant="h6" style={{ marginLeft: 5 }}>
                Editar Tarefa
              </Typography>
            </Box>
            <Box position="absolute" top="2px" right="2px">
              <IconButton size="small" onClick={fecharModalEditar}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column">
              <TextField
                color="primary"
                value={tEditar.titulo}
                id="titulo"
                onChange={mudarCampos}
                variant="outlined"
                label="Titulo da tarefa"
                InputLabelProps={{ shrink: true }}
              />
              <br />
              <TextField
                color="primary"
                value={tEditar.descricao}
                id="descricao"
                onChange={mudarCampos}
                multiline
                rows={5}
                variant="outlined"
                label="Descrição da tarefa"
                InputLabelProps={{ shrink: true }}
              />
              <br />
              <Button
                className="form_button"
                onClick={salvarTarefaEditada}
                color="primary"
                startIcon={<Save />}
                variant="contained"
              >
                Salvar
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={modalFiltros} fullScreen TransitionComponent={Transition}>
        <DialogContent>
          <DialogFiltrar
            ocultarMenu={ocultarMenu}
            setarMensagem={setarMensagem}
            getTarefas={getTarefas}
            setTarefas={setTarefas}
            fecharModalFiltros={fecharModalFiltros}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

function Detalhes({ titulo, desc, quebra }) {
  let descricao = desc;
  if (quebra) {
    descricao = desc.replace(/\n/g, "<br />");
    descricao = descricao.replace(
      /\|((\s*\w+[.,çãáàéèúùíìóòúùõ!@#$%&*()^?;'><"-+=]*\s*)+)\|/g,
      "<b>$1</b>"
    );
    // descricao = descricao.replace(/\|((\s*\w+\S*\s*)+)\|/g,"<b>$1</b>");
  }

  return (
    <Box
      display="flex"
      className="accordion-desc"
      flexDirection={quebra ? "column" : "row"}
      style={{ width: "100%" }}
    >
      <Typography align="center" variant="body1">
        {titulo}
      </Typography>
      {!quebra && <div style={{ flexGrow: 3 }} />}
      <Typography variant="body2" color="textSecondary">
        {quebra && (
          <span
            className="descricao"
            dangerouslySetInnerHTML={{ __html: descricao }}
          ></span>
        )}
        {!quebra && descricao}
      </Typography>
    </Box>
  );
}

export default ListaTarefas;
