import { Row, ListGroup, Container } from "react-bootstrap";
import { Cards } from "./Cards";
import { useSelector, useDispatch } from "react-redux";
import { handleDelete } from "../store/slices/characters";

export const Home = () => {
  const {
    rootReducer: { character },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const maxTeamCount = 3;

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
        const { powerstats } = character.value;
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

  const goodCharacters = character.filter(
    (character) => character.alignment === "good"
  );

  const badCharacters = character.filter(
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
      <Row xs={1} md={3} className="g-4">
        {character.map((card, index) => (
          <Cards
            key={index}
            value={card.value}
            sumPower={card.sumPowers}
            cardId={card.id}
            onDelete={() => dispatch(handleDelete(card.id))}
          />
        ))}
      </Row>
    </Container>
  );
};
