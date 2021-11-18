import { useState } from "react";
import { Row, ListGroup, Container } from "react-bootstrap";
import { characterContext } from "../context/characterContext";
import { Cards } from "./Cards";

export const Home = () => {
  const maxTeamCount = 3;
  const [goodCharacter, setGoodCharacter] = useState(0);
  const [badCharacter, setBadCharacter] = useState(0);
  const [characters, setCharacters] = useState([
    { id: 0, value: "", sumPowers: 0, alignment: "", height: 0, weight: 0 },
    { id: 1, value: "", sumPowers: 0, alignment: "", height: 0, weight: 0 },
    { id: 2, value: "", sumPowers: 0, alignment: "", height: 0, weight: 0 },
    { id: 3, value: "", sumPowers: 0, alignment: "", height: 0, weight: 0 },
    { id: 4, value: "", sumPowers: 0, alignment: "", height: 0, weight: 0 },
    { id: 5, value: "", sumPowers: 0, alignment: "", height: 0, weight: 0 },
  ]);

  const handleFetchResult = (id, result) => {
    let sum = 0;
    let objP = result.data.results[0].powerstats;
    const { height } = result.data.results[0].appearance;
    const { weight } = result.data.results[0].appearance;

    const characterIndex = characters.findIndex(
      (character) => character.id === id
    );
    if (characterIndex === -1) {
      return console.error("index not found");
    }

    const newState = [...characters];
    newState[characterIndex].value = result;

    //sum PomerStats
    for (const [, value] of Object.entries(objP)) {
      if (value !== "null") sum += parseInt(value);
    }
    newState[characterIndex].sumPowers = sum;

    // height and weight
    newState[characterIndex].height = parseInt(height[1].replace(/\D/g, ""));
    newState[characterIndex].weight = parseInt(weight[1].replace(/\D/g, ""));

    //Alignment
    const alignment = result.data.results[0].biography.alignment;
    alignment === "good"
      ? setGoodCharacter(goodCharacter + 1)
      : setBadCharacter(badCharacter + 1);
    newState[characterIndex].alignment = alignment;

    setCharacters(newState);
  };

  const handleDelete = (id) => {
    const characterIndex = characters.findIndex(
      (character) => character.id === id
    );
    if (characterIndex === -1) {
      return console.error("index not found");
    }

    const newState = [...characters];
    newState[characterIndex].value.data.results[0].biography.alignment ===
    "good"
      ? setGoodCharacter(goodCharacter - 1)
      : setBadCharacter(badCharacter - 1);
    newState[characterIndex].value = "";
    newState[characterIndex].height = 0;
    newState[characterIndex].weight = 0;

    setCharacters(newState);
  };

  const statAccumulator = (characters) => {
    const arrStats = [];

    let haveValues = false;
    let sumI = 0;
    let sumS = 0;
    let sumSp = 0;
    let sumD = 0;
    let sumP = 0;
    let sumC = 0;

    characters.forEach((character) => {
      if (character.value) {
        const { powerstats } = character.value.data.results[0];
        sumI += parseInt(powerstats.intelligence);
        sumS += parseInt(powerstats.strength);
        sumSp += parseInt(powerstats.speed);
        sumD += parseInt(powerstats.durability);
        sumP += parseInt(powerstats.power);
        sumC += parseInt(powerstats.combat);
        haveValues = true;
      }
    });
    const teamStats = {
      0: "intelligence",
      1: "strength",
      2: "speed",
      3: "durability",
      4: "power",
      5: "combat",
      6: "Plase add character",
    };
    if (haveValues) {
      arrStats.push(sumI, sumS, sumSp, sumD, sumP, sumC);

      let maxStat = Math.max(...arrStats);
      let indexMax = arrStats.indexOf(maxStat);

      const maxTeamStats = teamStats[indexMax];

      return maxTeamStats;
    } else {
      const emptyStats = teamStats[6];
      return emptyStats;
    }
  };

  //AVERAGE
  const averageH = (goodCharacter) => {
    let sumH = 0;
    goodCharacter.forEach((e) => (sumH += e.height));
    return (sumH / maxTeamCount).toFixed(2);
  };
  const averageW = (goodCharacter) => {
    let sumW = 0;
    goodCharacter.forEach((e) => (sumW += e.weight));
    return (sumW / maxTeamCount).toFixed(2);
  };

  const goodCharacters = characters.filter(
    (character) => character.alignment === "good"
  );

  const badCharacters = characters.filter(
    (character) => character.alignment === "bad"
  );

  return (
    <Container>
      <h4 className="text-center my-4">
        The team must be made up of three heroes and three villains
      </h4>
      <div className="d-flex justify-content-around mb-3">
        {goodCharacters.length === maxTeamCount ? (
          <ListGroup className="w-25 text-center">
            <h4>The first team</h4>
            <ListGroup.Item>
              Type teams: {statAccumulator(goodCharacters)}
            </ListGroup.Item>
            <ListGroup.Item>
              The average height is: {averageH(goodCharacters)}
            </ListGroup.Item>
            <ListGroup.Item>
              The average weight is: {averageW(goodCharacters)}
            </ListGroup.Item>
          </ListGroup>
        ) : (
          <div className="text-center">
            <p>
              choose three heroes or three villains to see the type of equipment
            </p>
          </div>
        )}
        {badCharacters.length === maxTeamCount ? (
          <ListGroup className="w-25 text-center">
            <h4>The second team</h4>
            <ListGroup.Item>
              Type teams: {statAccumulator(badCharacters)}
            </ListGroup.Item>
            <ListGroup.Item>
              The avarage height is: {averageH(badCharacters)}
            </ListGroup.Item>
            <ListGroup.Item>
              The avarage weight is: {averageW(badCharacters)}
            </ListGroup.Item>
          </ListGroup>
        ) : (
          <div className="text-center">
            <p>
              choose three heroes or three villains to see the type of equipment
            </p>
          </div>
        )}
      </div>
      <characterContext.Provider value={{ goodCharacter, badCharacter }}>
        <Row xs={1} md={3} className="g-4">
          {characters.map((card, index) => (
            <Cards
              key={index}
              value={card.value}
              sumPower={card.sumPowers}
              onFetchResult={(result) => handleFetchResult(card.id, result)}
              onDelete={() => handleDelete(card.id)}
            />
          ))}
        </Row>
      </characterContext.Provider>
    </Container>
  );
};
