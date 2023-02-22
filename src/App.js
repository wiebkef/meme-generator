import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Draggable from "react-draggable";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";

function App() {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const randomMeme = Math.floor(Math.random() * (memes.length - 1));
  console.log(randomMeme);

  useEffect(() => {
    memes.length === 0 &&
      axios
        .get("https://api.imgflip.com/get_memes")
        .then((response) => {
          console.log(response.data.data.memes);
          setMemes(response.data.data.memes);
          setLoading(false);
        })
        .catch((err) => console.log(err));
  });

  const getBoxCount = (count) => {
    let boxes = [];
    for (let i = 0; i < count; i++) {
      console.log("COUNT: ", i);
      boxes.push(
        <Draggable>
          <input key={i} placeholder={i + 1}></input>
        </Draggable>
      );
    }
    return boxes;
  };

  return (
    <div className="App">
      {!loading && (
        <Row>
          <Col>
            <img src={`${memes[randomMeme].url}`} alt="a random meme" />
          </Col>
          <Col>
            <Stack gap={1}>
              <h3>Write your own meme</h3>
              {console.log("HUUUUU", memes[randomMeme].box_count)}
              {getBoxCount(memes[randomMeme].box_count)}
            </Stack>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default App;
