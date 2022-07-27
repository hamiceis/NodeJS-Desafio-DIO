import express from "express";
import errorHandler from "./middlewares/error-handler.middleware";
import { statusRoute } from "./routes/status.route";
import { usersRoute } from "./routes/users.route";

const app = express();

//configurando aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurações de Rotas
app.use(statusRoute);
app.use(usersRoute);

//configuração errorHandler
app.use(errorHandler)

// Inicialização do servidor
app.listen(3000, () => {
  return console.log(`server is running: port 3000`);
});
