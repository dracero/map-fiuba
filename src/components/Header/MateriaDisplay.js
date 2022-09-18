import {
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { GraphContext } from "../../Contexts";
import useWindowSize from "../useWindowSize";
import MateriaControl from "./MateriaControl";
import MateriaStatus from "./MateriaStatus";

const MateriaMenu = () => {
  const { getNode, aprobar, displayedNode, desaprobar, cursando, getCurrentCuatri } =
    React.useContext(GraphContext);
  const { isMobile } = useWindowSize();

  const flechitas = React.useCallback(
    (event) => {
      const node = getNode(displayedNode)
      if (event.key === "ArrowLeft") {
        if (getNode(displayedNode).categoria === "*CBC") return
        const prevCuatri = node.cuatrimestre ? node.cuatrimestre - 0.5 : getCurrentCuatri();
        cursando(displayedNode, prevCuatri);
      }
      if (event.key === "ArrowRight") {
        if (getNode(displayedNode).categoria === "*CBC") return
        const nextCuatri = node.cuatrimestre ? node.cuatrimestre + 0.5 : getCurrentCuatri();
        cursando(displayedNode, nextCuatri);
      }
      if (event.key === "ArrowUp") {
        let nextNota = node.nota + 1;
        if (node.nota === 0) nextNota = 4;
        if (node.nota === 10) {
          desaprobar(displayedNode)
          return
        };
        aprobar(displayedNode, nextNota)
      }
      if (event.key === "ArrowDown") {
        let prevNota = node.nota - 1;
        if (node.nota === 4) prevNota = 0;
        if (node.nota === -2) prevNota = 10;
        if (node.nota === -1) {
          desaprobar(displayedNode)
          return
        };
        aprobar(displayedNode, prevNota)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [displayedNode]
  );

  const numeros = React.useCallback(
    (event) => {
      const n = parseInt(event.key)
      if (n >= 4 && n <= 9) {
        aprobar(displayedNode, n);
      }
      if (n === 0) {
        aprobar(displayedNode, 10);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [displayedNode]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", flechitas, false);
    document.addEventListener("keydown", numeros, false);

    return () => {
      document.removeEventListener("keydown", flechitas, false);
      document.removeEventListener("keydown", numeros, false);
    };
  }, [flechitas, numeros]);



  return (
    <Flex width={isMobile ? "100%" : "undefined"} alignItems="center" justifyContent="space-around" flexWrap="wrap">
      <MateriaStatus />
      <MateriaControl />
    </Flex>
  );
};

export default MateriaMenu;