import React from "react";

import makeStyles from "@material-ui/styles/makeStyles";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import ArrowBack from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  sobre_des: {
    background:
      theme.palette.type === "dark"
        ? "rgba(0, 0, 0, 0.493)"
        : "rgba(0, 0, 0, 0.893)",
    color: "white",
  },
}));

function DialogSobre({ fecharModalSobre }) {
  const classes = useStyles();
  return (
    <Box>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Box display="flex" alignItems="center">
            <IconButton onClick={() => fecharModalSobre()}>
              <ArrowBack />
            </IconButton>
            <Box marginLeft={1}>
              <Typography variant="h6">Sobre</Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Grid container>
        <Grid item xs={12}>
          <Paper className="desc_titulo">
            <Typography component="h6" variant="h6">
              Sobre a Aplicação
            </Typography>
            <Typography align="center" component="p">
              Esta aplicaçao é um gerenciador de tarefas básico. Serve
              basicamente para <b>cadastrar</b>, <b>consultar</b> e{" "}
              <b>manipular</b> suas tarefas.
              <br />
              Ela foi desenvolvida com o objetivo de exercitar, mas enquanto eu
              a construía fui chegando a conclusão que ela pode servir de grande
              ajuda para mim, inclusive <i>"eu usei ele para lhe construir"</i>,
              já que programar é uma daquelas tarefas que pode ser dividida em
              sub-tarefas, então eu fui cadastrando tarefas do tipo{" "}
              <i>"Adicionar uma pagina de SOBRE na aplicação"</i> então boa
              parte do que você ver nessa aplicação foi antes uma tarefa que no
              principio eu anotei no <i>"bloco de notas"</i> do <i>Windows</i>{" "}
              ,mas que depois da aplicação ter ganhado consistencia eu fui
              cadastrando nela mesma as funções que eu queria que ela tivesse, e
              é exatamente esse tipo de situação que essa aplicação atende,
              evitar criar um monte de arquivos no <i>bloco de notas</i> para
              lembretes!
            </Typography>
            <div className="separador" />
            <Box className="sobre_info">
              <Typography variant="body2">Desenvolvido por: </Typography>
              <Typography component="p" color="textSecondary">
                Francisco Fetapi
              </Typography>
              <Typography variant="body2">Comecei em: </Typography>
              <Typography component="p" color="textSecondary">
                24/02/2021
              </Typography>
              <Typography variant="body2">Terminei em: </Typography>
              <Typography component="p" color="textSecondary">
                27/02/2021
              </Typography>
              <Typography variant="body2">Tecnologias usadas: </Typography>
              <Typography component="p" color="textSecondary">
                React + Material-UI
              </Typography>
            </Box>
            <Box className="lista_img">
              <figure>
                <div>
                  {[1, 2, 4, 5].map((img) => (
                    <img src={`./img/${img}.png`} key={img} />
                  ))}
                </div>
                <figcaption className={classes.sobre_des}>
                  Era assim que eu anotava tarefas
                </figcaption>
              </figure>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DialogSobre;
