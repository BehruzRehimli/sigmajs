import "@react-sigma/core/lib/style.css";
import './App.css'
import { SigmaContainer, useRegisterEvents, useSigma } from "@react-sigma/core";
import type { SerializedGraph } from "graphology-types";
import Graph from "graphology";
import { NodeImageProgram } from '@sigma/node-image';
import '@react-sigma/graph-search/lib/style.css';
import { useEffect, useState } from "react";

const sigmaSettings = {
  allowInvalidContainer: true,
  nodeProgramClasses: { image: NodeImageProgram },
  defaultNodeType: 'image',
  defaultEdgeType: 'arrow',
  labelDensity: 0.07,
  labelGridCellSize: 60,
  // labelRenderedSizeThreshold: 15,
  renderEdgeLabels: true,
  labelFont: 'Lato, sans-serif',
  zIndex: true,
};

const GraphEvents: React.FC = () => {
  const registerEvents = useRegisterEvents();
  const sigma = useSigma();
  const [draggedNode, setDraggedNode] = useState<string | null>(null);

  useEffect(() => {
    // Register the events
    registerEvents({
      downNode: (e) => {
        setDraggedNode(e.node);
        sigma.getGraph().setNodeAttribute(e.node, 'highlighted', true);
      },
      // On mouse move, if the drag mode is enabled, we change the position of the draggedNode
      mousemovebody: (e) => {
        if (!draggedNode) return;
        // Get new position of node
        const pos = sigma.viewportToGraph(e);
        sigma.getGraph().setNodeAttribute(draggedNode, 'x', pos.x);
        sigma.getGraph().setNodeAttribute(draggedNode, 'y', pos.y);

        // Prevent sigma to move camera:
        e.preventSigmaDefault();
        e.original.preventDefault();
        e.original.stopPropagation();
      },
      // On mouse up, we reset the autoscale and the dragging mode
      mouseup: () => {
        if (draggedNode) {
          setDraggedNode(null);
          sigma.getGraph().removeNodeAttribute(draggedNode, 'highlighted');
        }
      },
      // Disable the autoscale at the first down interaction
      mousedown: () => {
        if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox());
      },
    });
  }, [registerEvents, sigma, draggedNode]);

  return null;
};

function App() {

  const graph: SerializedGraph = {
    attributes: {}, // opsiyonel genel graph özellikleri
    nodes: [
      {
        key: "n9",
        attributes: {
          label: "Levandovski",
          x: 2,
          y: 5,
          size: 30,
          color: "#FF0000",
          image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS29l8Lxgik6A5KVDTM8Uz3n3dGcrJwDp6plA&s"
        }
      },
      {
        key: "n20",
        attributes:{
          label:"Olmo",
          size:30,
          x:2,
          y:4,
          color:"orange",
          image:"https://s2.dmcdn.net/v/XJLWE1dAYDe60VaKj/x1080"
        }
      },
      {
        key: "n19",
        attributes:{
          label:"Yamal",
          size:30,
          x:4,
          y:4.2,
          color:"orange",
          image:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAKgBKwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAAIDBQYBBwj/xABJEAACAQMCAwYDBAYFCQkBAAABAgMABBEFEiEiMQYTQVFhcRQygSNSkbEHFTNCYqGSwdLh8CRTVnKUlaLR8RY0NkNGc3SCsiX/xAAaAQACAwEBAAAAAAAAAAAAAAABAgADBAUG/8QALREAAgICAQMDAgQHAAAAAAAAAAECEQMhEgQxQSJRcRNhFCMykQUkQoGhseH/2gAMAwEAAhEDEQA/AMRcXLRVWz6o3y1a3ke9KzN9E6PSJJjy0Ke6aWog9RV2rCsnWSr/AEVUesyDVnYX3dUH2GjV7NddzrFDWUv55Xfkos3bXFFW1utJFV3DkyexmXjn/iqMq1aqe0X+GqK+i2GmTsrUrIrWbbR6zVURjnrW9ndMS4mj3pE+7hiTOP5EUs9DqVE2haZf30ZnRolhU9WlA3eg68fQ1olW0aMTxRxwxRkrJI3EZ9skZ8sfgOtB3dybSf4TTYTHFbkHu4lLnBPMSxztx7Z9ap7mW+unEEMzLZ2+eZeAXd4nH91I/uPyZop9ds54fhtNtisjfZyyRy7XkX03N1NNs5oG3xC+laaL/wAq5/ae3HIOPTjVX2esNQN0ZLG5LTL0VG27j5dRxP4VeaukUGL2HvY5sBbizdQpU+i9ONJyV0hkn3BZ4JBEJWbcuQrN04+399MCclVM/aG0RZVtYpFZk27Zmbco64GDj8/eiIr7v7dZA/FhlvSm3Qyd6JLl0SqS7be/JU17O2aEs33yNv8AOrYoVsBulZKHRquNRVUQ+1UAbnq+MStTp2EP40HKKnMlRNS8aGyZFIagqxtFXFAhaISTYKVqyuwu5KqtR2F53Uv1oOaTeaizUUdAs3dtqiGAbutVWq3SuTWejuJVHK3CmSzyOePSlUNjcictveumDPCo4U30fbRZmApmxTtjZ5OKtJNO+xFG2FluXPlRhTHLWeUtmqENGMu7Jkc0A6shrdTWitHzdc8KzmqWeAx8jTRmVTxlKWrm6uyrtNR1aVGwEyulU2olaje5bZQcsrPQUaGcrGYrhFdBpGmFGUgaRqWCLe9AgRaybKO+OdPkqSz0dpaKfQ2RKVtB4WCxXm5OdqBv5Vepbi1a3oCamVC1RyD569D7PTm30p7xN7shCqqqM7j7+OK88jFbbsvd26aZcJeFljC9RxYg8OXPShkj6bLIq0PtfhdSk3GXEruSY8EHrnhngePmRmtBYdm5r61lhdNwJ3jmx+Ixwqq7ORwW9/dwyDfIJc7z0YY4EehFXbdq9F02Zrdp5mYdYraLcc+WeA/nWCcpOfFI1whFR5Nkn6laG1aKa0VmYYLKwyR7eX1oK+nggWO21C8SMEhUNzOAVX3PhV1qGvLP2ee901QkgByZV3ED1x0rz+yRYovi7qzmvLu5f9q8eUTx4k8B/jhQhF3saclVJBPafsokZWWzaMqeIKHKke+eNVOmRyR26xv94/nW87MR3N5bm3u4FigJLxjgf+lVuoWa2uovBazd3FIdxO7APpWn6i42ULE3NIzl5Fhd1Uq3HdSNV7r0qx7lrJyPueroO1ZVkVOg65ud6fNQBWnoaKhjV6vUiloCzSAoueBRQwFFuyIWa7upj03NJQw5zxrlJBv6daJispXIqXQKB1jZ646MtXENmyChb1Nuar5bH46BoZNlGwXSiUGqtqStggjrmmoU9D065V4k9q7NJzmqPRpmwN3XFW0z7U3VllHZthJUPkuNqYrPanOpDD1oq6uG41R3pZyaeCKskgO5fjUFSMtcxVyM4SvPTZYWSpbM89T3BXZRIVddzXH+euZqEO1b6anPVPWo7P23e7KBDUaTGuxeWj7sRbK7a2mxKD1FmWkaGjLZm9aVeas0689aDU5PmqhB3vTQDPuOhj56vdLgyxH0/GquJOdautMPNVs9QGw9yfSoJ7TUngnfMUi4ilC+A8PermY3MSrZ6TYQ92uDLNIh8TxwQOZutE6PGtxMyMkDbV3faLk+4PUGtLp10gRY5l29M+grmZJVI1wx6+xU2NgsKmKGJiLkHcrdT7+AoWIadpk621/d2oTdgJJ8wPlwzkVa9o0e57o2129sobB7pQWcfXp71nrvT9OhM2wSXl0D3mEHeOqjxbyH4VXCPKy2T40am/uobfuZIZVaMcOWspf3Tx3SMjckhJPj+dMt576bel3avbwBeQyYDN7AeFVd8PjNOuYv4d6+eR61Zjj3iyqcv6kZ7tFdB9TnjjffEjYDjoTjjiqtallh2VHit0KrRhk23bOEVLHKyYqNaeRTCkzzb6gPWkDTHNGyDyKjIpCSluqIAfp0KO3NWqtbSLavtWPs7nY1X9lqeQF3Uk7LcbXku2sFKYqk1XS8bj6VeWd0rip7hFeM+1VotklR53Nash+Wj9G04Tybm8DVlqFrxPLXdMm+FO2rbM7RZw6Ysa7qlaHcm2uyagpiAoeS87td1VZFZoxrVgF/BszVLcMpOPKjtSv96H3qjkk3MW86bGq7lM2m9Cm61FmuMa5VghOtOdmpqmuk1CED0ynsabUIdQVtuzXJtrFqK0GkX/dbaVhR6HHJyVW6meRqhtb9XT5qG1W9XZ81JZYoVsy+qyc7UDaDe1LUJ971DbybKsihJO2WYGyjLObnqoM38VT20vPVmR+kbE6Zp4bt4JFlRgrr0BrRXOq2VylvLBdq10ycYlU5THXP+OlYYT1daHY3LTrdpbv3UPM7PwXaffrWOWNSNMJO9F3Mw1JVja4eCPHMsWN7fUjhVtaXFvY2QtdKtQviS2S2fM+tZj4edn+I0wmQf5oNjd+PDNTP2ptbNCl1G0N0vArJGVb6ef0rNxlF0i+4vbJtQR5JXnuW6rVFFKouTGvy4oPUu0U1+dlruEY6s39VFwQxNa21xH+2I5l9fOroRaWyjJJSdIzN2+6dh5HFDkVZ39vDBdSpLbKzFi2RK3NnqvUYP0NTWukDU4y+iyd9Io57OUYlX2wMMPUYrZDE1G0Ym/VRRGu1Y3PZ/WoWcSaVdgp84WLeV99uaAkUwHZOrwN5SIUP8xUDTGGonNTg5HCoJaACPNdFJanjTdxpiEainB2Si0i4VFKnnSXuh3ClZb6NfAyKrN0rVidXhHNXn1o3dPvSrZdRYqBUaByZeThXRqo7wmJuXpRMc7uDQd0ePN1pPJc64nLe4bdU13K3dCq+KXa+KkuJ+SjWxeVKgG5fmqAmnOdzE0ynRUxU2umuUQEgNItTa4TUIJjXFrlSItQI4V1XZK6RTDQC0WlvqjKm16iutQaagBTsUKJbGtXRSxSpgUSIKLsoZriURwRSSuTjCqSR7kdKfoWmyavfpbI+xMbpZW6Rp4/4860d8lvblLfTEdIYjnPi7feOOJrTg6eWb7IWeZY/knm0O30S0Mt8y3d6x5YwdsaDx9WP4D3qwubi4ubKF227SAdvkQMcT7cKzTtI42NIzf8AuMf55/Orm2bvLXYH3q0eM+RA/MVZ1mKOLGlFHR/gkueWTl7Ael6gdG1TZKW+ElO6Nvu+Y9MGtdfxWepW+6SGOZWHXgfwrIzIl1DEZPkmwGf7j+B9/D1ptpFqWnsyWkm5f3oH6e4B/PhXKyYlk2nT/wBmzP008cm4q4v28E0+jW0M+6J3C/dPEVFGjoxjPyq2alu9QIUd/G8EviCp2n2NSm8s305yk2JyOEe05/HpVChlT2mzJLh8FR2njCwwT/uzJ/xD+sj8qp9PZ47iOVJHjdW4OjbSvsa0OsW3xel2YRlIiY713cQfDhVbb2aJ83z+flXZ6OEpL4OXnaTDtK1W+02/lu47iQO3JIxJJx5nNXh7ba0DiSeKRAdoJjAJP0xWagkxdtH+6/MPeu3yc8G3oXIPviuh9OLjtWURzTg/S2g3tFBHqlj+sba3jinTLSokYXvB4k44Ej1FYyQ1urAiSK3A4q2QR7t/dWR1q0NlqM0OcoDuQ+anpXGnSm4r3Oz1OH8uOZeV/kAWiYTUMEe96vtP07eKVyowqNgPNQ7Ft5rXLpHJVbfab3B3UkZJstkmlRVonIKKs4e8JFROVQ0rW67iXJ6VYygt3tMQgr0FU1821sVei/ieD5qoNVZXaloflqgDfz04ux4VGoqVo22iiAiNcpxFcIogGmm5pxFc21CEmKa1SUxxUIMFEJUCCiFqDxE5qImnOa4BUIxyLXWFOSk5qAGgVxqeKa1QbwbPsRaf/wA24kZu6ilfEs23cUUYA4DrliMDxOK1XajstYaMljFNd3ME19yxi+iQx95jOwshJU+HEEevjRX6GGjGj3Mk6xyqR3QhAUvNJxbaAeB4DP0rd3Wrx2XZ/UdX1KC6uoArsR8NxRAcbChYnA25J4A9eHCtP4ieOow0Z/pqTbZ4TeWhtpJIpI+7eNiHXptI69PzpaXPsmMD9JOA9/D61b9sbp73VkvpYUt57q3ikuI0OQJMceOB4Bevt61l7h+6YSL+6fwrozSy4t+UL02V4M6lH3Lu2jLw3NofmD4Tm8eoNHRbrqO2uhyuy7WHn6GhIm26vbSJypLFxHrj++r7TNEvJbRESMpGuSZZOVMZ65rz82oP1M9xDJGrb0ASb0BXqo8W6r6VChtnQb7eLHjhRnNW08NuVcW4e7kjGXmVSIwvnw4n3OBVA3IzbPpzVIy8oL+nPur+QS/iCTkRuiqeK4UZH1JoJykSsobczUTqR3OkgXqMGglTd0+au508uWJPyeJ6/FHH1EorsQyEq6Sp8w4Gp72cmKNkGSG3AeeRUbJwNNK5sM8fsn4496sk6i/gzwXJovQoigtljIZsAIM9TjGfwyaou1sQ/wAmmG4Db3eem4Dx9auklkkiiMYHfSLiNeoiXxJ9aA7U6lPeaZFbyMpjikHdnaA3r0rgqTcrPWdbH+WpLSootMHOPetppiL3YrEWDYbNaewuG7sGhkOLjZoS6oKptWuF24pzzs9V11Gzq1VxVMabsoZpPtG96Zup91Hsc0Ma0Izsk7114K3CuEs1RCp414UQHbdece9GyxLsyKdYQbjmpb5dsZHpVTl6qHrVlO45zTakYVGetWCCNcruKbiiQlFNYU7NIioQYoqTNMxTgKgyY2nqK6FqaNKAbICKaDRMqUORUFHVw0hSNEc9F/RtrlvpF3Et2TGFUtDIASqSEEAtjqpBINbLU/0humm2UEUtpdag7Fp4dPU3Ks27gobG3B+reGM8R5n2UsbTV7yxtHve5N0/dSBPmX0GeHGvddF0PSuz/wBjplgsc5T9ued2PluPH6AAVryRxri3vRl5SVnmtp2K7UdobifUdaaDTI5mMjvdZeZifHYp4DoOJGAB1rCdo7O50fU7uwuu7YwsRujzhlxwYA9Rj8DkeFe/a/rmnaLFnV7oCTr3QO9248OReOPcj1NeT6v2ph1HtLbauNMREtYzEglKl38QxCjAIycDj1OSasxzyz8a8E4wTWw3QNZ0fWNMtbT4FIp7faiuFA5vMMPA+tXUv6w02VIb6bvbEMe72/uZ8yBxrOQLpHaK4kaALZ3L877MAkg8DjoT61dLd3tnmDU4xPaADbcR8TjyYdR71w8183a/sz0WCX5aSdhlrNLp1zJdWK94JBiSEEAP6jwz6eNQazo8Go2I1TSYsM554iNpJ8QR4GmWURidntJd9pJxwOIXP5Cj5tQTT4gzZZH4EL4eo/vqpTdjOck7TBdK0LTZ3fvdFucRBXV55AyKpHHKk8cnOMjh6VT9utOtrIWTWVnBbwvv3GKMLk+GSPSru7nmkijuNOuLbuuInMiFjjwPUVmtW168vtAmhuJ43hVkSPaowWDHOD16etX9Ms34qMovS7qzn9VKOSEm1szDHnqNm2wTL/nD4+dNlfifagp34fSvR5J1FnHx6kWlvqaxWndRh3kPKccOXy/x4UFqczTWp3KoVWB2+VFaXoeo31uJrS23p4EsF3f6vnU9npJ1ST4JZEikdtp3ZBBB4/UcfwriaOvPqM+ZKL7BHYbR4jbza9qaA2dqfsYiOE0g8/Rf5n2q4u0mvJGv7kQxSOoJt87XA8CRj+R40fdXVhpt3p+nspNhaABoxxHDxYe/E0F2qFtYarL3QJW6RJE3PnHnj0qm3O2ClCosCaNRUFwV2U43Ksmar7mbvDtqJWLLQDcx7nNATwYyavorfcPlqu1Re6GK1RRnkyp21KjVEetOFAUPtrjYKV3cb196DBxxro5qHFXY3LVDTUZHGpWWoWFEQIij3imtb8xrsEu0YqXvaAQbNdAptPWiQ7inqldAp4oBGlacppjvTQ1QhKzVE1LNNNEgqa1drjGoOWnZvUpbDUYXtrcS3IlVomLEYYVu9V7d9pb+FoI7i3sVb9p8BlHb03nJ/DHvXmdm/dXcUv3HB/nW3g065v5u6sIg3qeCr7k/l1rViyQUfXWvczzhKUvSUrRfbPI8ReRzlpJSzFj55YnJovT4LWe8SLUZ/h7U/OyLxFa2z7BTMN1/qQX7y2y5/wCJsflRT9k9Gt05kkn/AIpJD+QwKTJ/EYRVJ/sW4+jm3bX7mUfsrp97Nv0jWmjZMsrSqD+BUjFX1laazCywvJY3SYwWE5Dj6lcVlO02mW1sWms17tlz8rH8+tBLrWo2jxCKaSIbRxwTkeuetcyTll3d/J1MMVG1VHpqyMsZEn2M6rzK+OYeXkazt1eM7yb+Vc/L4VWz9qPiY4redopCf3wrIR/VT1Gebdu/nVHBx7lk3ToO025MFxzj7Fhg/wCPGs52ns7ix1Ad87y2z8bd2PKo+6B0B9Kul3fdak1zH3bQ3AWaFuDRsuf+launzcJWY8+LnEyBetj+jbsY3aq6nnkCfB2uFYSA4dzxxj0GDj1qjv8As/KkbT6TvuYBxaMH7SP6fvD1HGvcf0N6YdO7DWjSIUlu2a4bIIJDHl6+mK6GTOpQ0c+ONxlsbqfZC9EES6fNBNIrBcTExKi+Y2gnh5Yq0tOy2m2VvJJPFHNeyR7HumTmx5L4gVpHfZVDrOoJFG/P4eNY1FLZe8kn3Z5FLZxXMGq2FzZsNVhctFIvEyDOAB+WKx+rpqa36/rWF4pzGBHG5Bwg6Ywcf11q+1OvJpur3lxbITPdQBMq3yDzyD1NYxrt7iUPOzMfPd0oqOtB5pu2wyFW7vnpqw7nzToJ1qfvVFNFVss4ub0GxKqwiqnU4lcmlc3+w0BNf76Ck2DLjUF32V00exzTBT5H3uabinMx2nIeIptc6caJAiX5aFen95SiUO/HpSpEI1jZjUncNVzbW8QQEeFJlXcalhKIGpENdtrae6lihtYJZ55G2xxwRl2c9cBRxJ4GrVeynaT/AEc1r/d839miQrxXaOs9F1e9VpLHSNSuVVypaC0kcBx1BKjgw4ZFK60XWLMxi60jUrYzP3cQmtJEMjn91dw5ifIcaASrkpoNXTdlu0h/9Oa1/u+b+zVLMjW0skMytDJGxR45FKsjDgVYHiCCOlQA7NLNRd4v3l/pCkZEz84ohJCaaaaZE++lc3r95f6VQljvbhXqXZC9SXRbWSMLygrJ/rA15ZWt7AXf29zYO/CRe9T3HX+VU5ocoMtwS4zR6obz7NKr9Rufs2qGMMkBz8tD3HPA1c46hi+0NzvLUKipdNAkiblVadrtpOJQyo7c3HaueFO0uGfvl+yl/omtmNJRLeka5O+xY3XZyxkti6qyybeHNWX+Hvbdi0TPtQ4G1v6q9CiRigHpTdG002N78TKkVwoO9Ymyoz4ZqSyxS7mnqceCX/DO2Os3MKCHVINgI6hSGPrxrqMLub/JElf+ELkj8K3d/bx6o3eXsEAUcdqrw+uaElvLSwTurZY1A/dCgCsym3tqjmcH5YV2F7PQTakjatNJFggpCvDvT/Ec/wAq9hZ0iQKgAAHADoBXz9da3cbg8Jw6nKlfA+Felx9q47jQ7W8uJ4o98W5yzAYIHGtWKWqMfVKmmi91bVorZCWbjivPdc1m4uWJgiaQE4yc4/Gsn2m7aSX153dqSbZT85/e9qGse1M8Y2d8y+/MKtsojC9sB7VRybRNL85kJPrkVn0NbLWrxNX0icybROgDqV4bqxsYq6G0JPTCEk28K49ztBFc7uo2WilYyyuKI2ZnqCSpmqCQ8aLVC83J7GU4U00t1KEeTTc03NPjGcVCHCKStsI9DU4jrhSnULBJ0SLeuqkelM+KlNM7um7aKxi8jU/ow/8AH+g//JP/AOGr3LQ11cdsrp5v1h8GWuFdZe87oDchiYbzsxjeAIwDx5ulfNEM89rMs9pLLBPG26OSJijoemQw4g8asE7T9of9IdX/ANum/tVSWHrvY5bw9h9TFj8X3n/aRu8+G7zf3fex7/2ZD425zt40X2qN9+quwh1MSrdLrsIbvjzEZcBj4jIAODzDODxzXi1pq+r2SMlpq+pWqM5dlgvJEBY9SQDxJxxNK61nVboxm61fUZjC/eRGa7kbu3H7y5PAjzHGoQ+lrNLv/tXeNqX6zJ77/IO6Z/he47sZ3BTt3b9+d/N028MV4/2Zluof0kdqjZafcXcrXV0ne2kkSXFsDMeeMScGPgR1wfLrjG7Tdof9IdY/2+X+1VTMxmlaWctJJIS8kkjb2djxJJPEkk9aJD2u41mDsxZ3k+oavNehddAne2tIHe6X4cExONwVem1mXPFfMnA+gXF5PaaJN2Th0+20OW4mfXID3IEQMhIWXdx2iM4GPAe1eMBEHRBXdiPxdONAh7vp95pa6dY6fZuJradNRa103bF3F6que7RnbJXgRt4efHzxupdqdYl/RVZd7fkzz3stlODHGGMAjxsPDI9+vrXnXdx/cFLYAc4GaJDlG6LdtY6rbXK/Kjjf6g9aCNcbiONAh7hbhZIH2tuwMj1HnTzbch9qz3YvVfjNOgDvzKvdS/TofwrRySPsyv7tc6UeMqOpCXKKYG2mbuamLZRJ+/TLq82HnG6g31G4f9iv9FaRtMsVotO7VKjeZUFUs91IOaa42/8A2qk1DWYIsrGe9aio32FlOu5oNQ1JFX7S4IX7sf8AzrN3WqhpdkY4+AHEmhLaK91Zt0H7PxP7o+tW9voNtbR95dN3m3iQeCD/AJ0zUYd+5mnnb7FHrEt5bRRmaTYZDxiRs49z41ViV3VQ8jEA5C7jgH0FFa5eR392HhCiCIbUC/zP1oeRNkMK+YJ/nW6EHwtqmY5TtjlapVpsNpNKMw5J+6BmuLIUfu3BDjqrDBH0pXFhUi909ttpKGbiUb8qpbZcuq+Qqz022nms5Lj5bcggH7xqvibu59vkauh+lleR2GNFhM1Xv1b3qxadTHiquRuLe9NjYjRLbwNOxFK806VUyq8Bxo3SJUVgPWtZDaxSwBfPjTSDE81YMvzLTDWw1zRlUFlWsx8PglfI0lDWDhaJiSpUhxxpzJTqIrkICnbK4gqWnQjZCycKj2US3So8UW2BEZhqIRc9KlWY0E6LXHSlSqAB3ptKlRINNIUqVQg6uGlSqEGGnKlKlUIaDs7cy2U0e35HYh18+lbgapFs5n2tSpUvV448Yz8mjpJu5R8Ak2o28fN3q1Sal2gjVPsZd35UqVYccE3s1Tm6M7c3093x5qhRN3zDdXaVa1FLsDHFN7JoJZbZ90LvE38LEflXNRu7m52ie5kdfuluU/TpSpVbCK5onUxSxsEiG+VB5Gib4ZaFfJT+dKlV8/0s5K/UXHZ8Jkb62DQadeIn6wtobjb8plTOPrXKVUIsYPrV3Alt3UWxUAwEQABR6AVgbj/vDFPE0qVP4FZOFbZQ0kXOaVKlh3Ax0W9OPlV1p2sGDAdqVKrhQi+1VJkPqKo32mTd50qVBBkI1FIaVKmFGI1TqaVKggiPSozSpUWA/9k="
        }
      },
      {
        key: "n11",
        attributes:{
          label:"Raphinha",
          size:30,
          x:0,
          y:4.2,
          color:"orange",
          image:"https://ichef.bbci.co.uk/ace/standard/958/cpsprodpb/6ef6/live/511786a0-fc0f-11ef-beed-093b6e7927e3.jpg"
        }
      },
      {
        key: "n8",
        attributes:{
          label:"Pedri",
          size:30,
          x:1,
          y:3.2,
          color:"orange",
          image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy4dk4KP5xw_iP2fME7Gd5hGtmab1nTO-S4w&s"
        }
      },
      {
        key: "n6",
        attributes:{
          label:"Gavi",
          size:30,
          x:3,
          y:3.2,
          color:"orange",
          image:"https://assets.goal.com/images/v3/blt30f55240a55799e7/GOAL_-_Blank_WEB_-_Facebook_-_2023-10-24T122908.921.png?auto=webp&format=pjpg&width=3840&quality=60"
        }
      },
      {
        key: "n3",
        attributes:{
          label:"Balde",
          size:30,
          x:0,
          y:2.2,
          color:"orange",
          image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-ORdTLVFaLfzrWLPv5R7HAfH-DPpCOD5eDg&s"
        }
      },
      {
        key: "n5",
        attributes:{
          label:"Martinez",
          size:30,
          x:1.3,
          y:2,
          color:"orange",
          image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRD_ZhQen7ToO1ZMJpQh8F7V9eWMj1HTElRw&s"
        }
      },
      {
        key: "n2",
        attributes:{
          label:"Cubarsi",
          size:30,
          x:2.7,
          y:2,
          color:"orange",
          image:"https://cdn.resfu.com/media/img_news/el-defensa-del-fc-barcelona-pau-cubarsi-celebra-su-gol--segundo-del-equipo-blaugrana--durante-el-partido-de-ida-de-las-semifinales-de-la-copa-del-rey-que-fc-barcelona-y-atletico-de-madrid-disputan-este-martes-en-el-estadio-olimpico-lluis-companys--efe.jpg?size=1200x&lossy=1"
        }
      },
      {
        key: "n23",
        attributes:{
          label:"Kounde",
          size:30,
          x:4,
          y:2.2,
          color:"orange",
          image:"https://cdn.vox-cdn.com/thumbor/_IO7LTzt0Tic_ABEmpm4j-IClj4=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/25975090/2212147540.jpg"
        }
      },
      {
        key: "n25",
        attributes:{
          label:"Szczesny",
          size:30,
          x:2,
          y:1.2,
          color:"orange",
          image:"data:image/jpeg;base64,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"
        }
      },
    ],
    edges: [
      {
        key: "e1",
        source: "n9",
        target: "n20",
        attributes: {
          size: 2,
          color: "#000000"
        }
      },
      {
        key: "e2",
        source: "n9",
        target: "n19",
        attributes: {
          size: 2,
          color: "#000000"
        }
      },
      {
        key: "e3",
        source: "n9",
        target: "n11",
        attributes: {
          size: 2,
          color: "#000000"
        }
      },
      {
        key: "e4",
        source: "n20",
        target: "n8",
        attributes: {
          size: 2,
          color: "#000000"
        }
      },
      {
        key: "e5",
        source: "n20",
        target: "n6",
        attributes: {
          size: 2,
          color: "#000000"
        }
      },
      {
        key: "e6",
        source: "n19",
        target: "n8",
        attributes: {
          size: 2,
          color: "#000000"
        }
      },
      {
        key: "e7",
        source: "n19",
        target: "n6",
        attributes: {
          size: 2,
          color: "#000000"
        }
      },
      {
        key: "e8",
        source: "n11",
        target: "n8",
        attributes: {
          size: 2,
          color: "#000000"
        }
      },
      {
        key: "e9",
        source: "n11",
        target: "n6",
        attributes: {
          size: 2,
          color: "#000000"
        }
      },
      {
        key: "e10",
        source: "n8",
        target: "n3",
        attributes: {
          size: 2,
          color: "#000000"
        }
      },
      {
        key: "e11",
        source: "n8",
        target: "n5",
        attributes: {
          size: 2,
          color: "#000000"
        }
      },
      {
        key: "e12",
        source: "n8",
        target: "n2",
        attributes: {
          size: 2,
          color: "#000000"
        }
      },
      {
        key: "e13",
        source: "n8",
        target: "n23",
        attributes: {
          size: 2,
          color: "#000000"
        }
      },
      {
        key: "e14",
        source: "n6",
        target: "n3",
        attributes: {
          size: 2,
          color: "#000000"
        }
      },
      {
        key: "e15",
        source: "n6",
        target: "n5",
        attributes: {
          size: 2,
          color: "#000000"
        }
      },
      {
        key: "e16",
        source: "n6",
        target: "n2",
        attributes: {
          size: 2,
          color: "#000000"
        }
      },
      {
        key: "e17",
        source: "n6",
        target: "n23",
        attributes: {
          size: 2,
          color: "#000000"
        }
      },
      {
        key: "e18",
        source: "n3",
        target: "n25",
        attributes: {
          size: 2,
          color: "#000000"
        }
      },
      {
        key: "e19",
        source: "n5",
        target: "n25",
        attributes: {
          size: 2,
          color: "#000000"
        }
      },
      {
        key: "e20",
        source: "n2",
        target: "n25",
        attributes: {
          size: 2,
          color: "#000000"
        }
      },
      {
        key: "e21",
        source: "n23",
        target: "n25",
        attributes: {
          size: 2,
          color: "#000000"
        }
      },
      {
        key: "e22",
        source: "n3",
        target: "n11",
        attributes: {
          size: 2,
          color: "#000000",
        }
      },
      {
        key: "e23",
        source: "n23",
        target: "n19",
        attributes: {
          size: 2,
          color: "#000000",
        }
      },
      {
        key: "e24",
        source: "n8",
        target: "n6",
        attributes: {
          size: 2,
          color: "#000000",
        }
      },
      {
        key: "e25",
        source: "n5",
        target: "n2",
        attributes: {
          size: 2,
          color: "#000000",
        }
      },
      {
        key: "e26",
        source: "n5",
        target: "n3",
        attributes: {
          size: 2,
          color: "#000000",
        }
      },
      {
        key: "e27",
        source: "n23",
        target: "n2",
        attributes: {
          size: 2,
          color: "#000000",
        }
      },
    ],
    options: {} 
  }

  const graphMain=Graph.from(graph)


  return (
    <>
      <SigmaContainer settings={sigmaSettings} style={{width:800, height:500}} graph={graphMain}>
          <GraphEvents />
      </SigmaContainer>
    </>
  )
}

export default App
