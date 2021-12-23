import "./App.css";
import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Fab from "@material-ui/core/Fab";

import Menu from "@material-ui/core/Menu";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuItem from "@material-ui/core/MenuItem";

import Tab from "@material-ui/core/Tab";
import Snackbar from "@material-ui/core/Snackbar";
import Switch from "@material-ui/core/Switch";

import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import Alert from "@material-ui/lab/Alert";

import List from "@material-ui/icons/List";
import PlaylistAdd from "@material-ui/icons/PlaylistAdd";
import MoreVert from "@material-ui/icons/MoreVert";
import Palette from "@material-ui/icons/Palette";
import FilterList from "@material-ui/icons/FilterList";
import Info from "@material-ui/icons/Info";

import CadastrarTarefa from "./Components/CadastrarTarefa";
import ListaTarefas from "./Components/ListaTarefas";
import DialogSobre from "./Components/DialogSobre";

const Transition = React.forwardRef(function (props, ref) {
  return <Slide ref={ref} direction="up" {...props} />;
});

function App() {
  const [tab, setTab] = React.useState("1");
  const [tarefas, setTarefas] = React.useState(getTarefas());
  const [mensagem, setMensagem] = React.useState({
    estado: false,
    conteudo: "Aqui aparecerao as mensagens",
    tipo: "info",
    duracao: 3000,
  });
  const [menu, setMenu] = React.useState(null);
  const [modoEscuro, setModoEscuro] = React.useState(getTema());
  const [modalFiltros, setModalFiltros] = React.useState(false);
  const [modalSobre, setModalSobre] = React.useState(false);
  var timeout;

  const theme = createMuiTheme({
    palette: {
      type: modoEscuro ? "dark" : "light",
    },
  });

  function mudarTema() {
    setModoEscuro(!modoEscuro);
    localStorage.setItem("modoEscuro", JSON.stringify(!modoEscuro));
  }
  function getTema() {
    return JSON.parse(localStorage.getItem("modoEscuro"));
  }
  function abrirModalFiltros() {
    setModalFiltros(true);
  }
  function fecharModalFiltros() {
    setModalFiltros(false);
  }
  function fecharModalSobre() {
    setModalSobre(false);
  }
  function abrirModalSobre() {
    setModalSobre(true);
  }
  function atualizarTarefas() {
    setTarefas(getTarefas());
  }

  function fecharSnackbar() {
    setMensagem({ ...mensagem, estado: false });
  }
  function setarMensagem(conteudo, duracao, tipo) {
    const configs = { ...mensagem, estado: true, conteudo, duracao, tipo };
    console.log(configs);
    setMensagem(configs);

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fecharSnackbar();
    }, duracao * 1000);
  }
  function mudarTab(event, nv) {
    setTab(nv);
  }

  function setTarefa(info) {
    const tarefa_ja_existe = tarefas.some(
      (tarefa) => tarefa.titulo === info.titulo
    );
    if (!/\w+/.test(info.titulo) || !/\w+/.test(info.descricao)) {
      //Campos preenchidos incorretamente
      setarMensagem("Campos incorretos!", 3, "error");
    } else if (tarefa_ja_existe) {
      setarMensagem("A tarefa inserida já existe", 4, "error");
    } else {
      const tarefas = getTarefas();
      const tarefaAt = info;
      tarefas.unshift(tarefaAt); //unshift

      const tarefasStringificada = JSON.stringify(tarefas);
      localStorage.setItem("tarefas", tarefasStringificada);

      fecharSnackbar(); // se tiver um aberto!
      clearTimeout(timeout);
      setarMensagem("Tarefa cadastrada!", 3, "success");
      atualizarTarefas();

      return true;
    }
  }
  function setarTarefas(tarefas) {
    const novasTarefas = JSON.stringify(tarefas);
    localStorage.setItem("tarefas", novasTarefas);
    atualizarTarefas();
  }
  function getTarefas() {
    let tarefas = JSON.parse(localStorage.getItem("tarefas"));
    return tarefas || [];
  }

  function mostrarMenu(e) {
    setMenu(e.target);
  }
  function ocultarMenu() {
    setMenu(null);
  }

  return (
    <Box className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TabContext value={tab}>
          <AppBar position="fixed" color="default">
            {/* <Box padding={1}>
              <Typography align="center" variant="h6">Gerenciador de Tarefas</Typography>
              <br />
              <Divider />
            </Box> */}
            <TabList
              indicatorColor="primary"
              className="tabs"
              onChange={mudarTab}
            >
              <Tab
                fullWidth
                icon={<PlaylistAdd />}
                label="Cadastrar Tarefa"
                value="1"
              />
              <Tab
                fullWidth
                icon={<List />}
                label="Lista de Tarefas"
                value="2"
              />
            </TabList>
          </AppBar>
          <Toolbar />
          <br />
          <TabPanel value="1">
            <CadastrarTarefa setTarefa={setTarefa} />
          </TabPanel>
          <TabPanel value="2" className="panel_tarefas">
            <ListaTarefas
              ocultarMenu={ocultarMenu}
              getTarefas={getTarefas}
              modalFiltros={modalFiltros}
              abrirModalFiltros={abrirModalFiltros}
              fecharModalFiltros={fecharModalFiltros}
              setarMensagem={setarMensagem}
              setarTarefas={setarTarefas}
              setTarefas={setTarefas}
              tarefas={tarefas}
              atualizarTarefas={atualizarTarefas}
            />
          </TabPanel>
        </TabContext>

        {mensagem.estado && (
          <Snackbar
            open={mensagem.estado}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            <Alert
              style={{ width: "100%" }}
              severity={mensagem.tipo}
              onClose={fecharSnackbar}
            >
              {mensagem.conteudo}
            </Alert>
          </Snackbar>
        )}

        <Box className="fab_mais">
          <Fab color="primary" onClick={mostrarMenu}>
            <MoreVert />
          </Fab>
        </Box>

        <Menu open={Boolean(menu)} anchorEl={menu} onClose={ocultarMenu}>
          <MenuItem onClick={mudarTema}>
            <ListItemIcon>
              <Palette />
            </ListItemIcon>
            <ListItemText primary="Tema Escuro" />
            <Switch checked={modoEscuro} onChange={mudarTema} />
          </MenuItem>
          {tab === "2" && (
            <MenuItem onClick={abrirModalFiltros}>
              <ListItemIcon>
                <FilterList />
              </ListItemIcon>
              <ListItemText primary="Filtrar Tarefas" />
            </MenuItem>
          )}
          <MenuItem onClick={abrirModalSobre}>
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary="Sobre" />
          </MenuItem>
        </Menu>

        <Dialog open={modalSobre} fullScreen TransitionComponent={Transition}>
          <DialogContent>
            <DialogSobre fecharModalSobre={fecharModalSobre} />
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </Box>
  );
}

export default App;
