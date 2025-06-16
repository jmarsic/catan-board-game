export const PieceCost = {
  road: { lumber: 1, brick: 1 },
  settlement: { lumber: 1, brick: 1, grain: 1, wool: 1 },
  city: { grain: 2, ore: 3 },
};

export const DevelopmentCardCost = {
  wool: 1,
  grain: 1,
  ore: 1,
};

export const InitialPieces = {
  roads: 15,
  settlements: 5,
  cities: 4,
};

export const PhaseMessages = {
  setup: "Click on vertex and then adjacent edge to build.",
  placeRobber: "Robber activated! Click a hex to move and steal.",
  steal: "Choose a player to steal from.",
  freeRoad: "Place your free roads.",
};
