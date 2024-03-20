import { Games } from "../domain/games";
import gamesJson from "../games.json";

export const gamesMap = new Map<string, string>();

// First, populate the gamesMap with all game titles and their corresponding descriptions
//TODO: change this if we want to map them to something else
gamesJson.forEach((gamesJson: any) => {
  gamesMap.set(gamesJson.title, gamesJson.description);
});

export const games: Games[] = gamesJson.map((gamesJson: any): Games => {
  //TODO: other stuff to parese if we need it? Note sure how we want to organize things

  return {
    title: gamesJson.title,
    description: gamesJson.description,
    musician: gamesJson.muscisian,
    similarGames: gamesJson.similarGames,
    gamesByDevelopers: gamesJson.gamesByDevelopers,
    genre: gamesJson.genre,
    vibe: gamesJson.vibe,
    price: gamesJson.price,
    reviews: gamesJson.reviews,
    multiplayer: gamesJson.multiplayer,
    competitive: gamesJson.competitive,
    developerSite: gamesJson.dveloperSite,
    soldWhere: gamesJson.soldWhere,
    rating: gamesJson.rating,
    awards: gamesJson.awards,
    accessibilities: gamesJson.accessibilities,
    warnings: gamesJson.warnings,
    gameSpecs: gamesJson.gameSpecs,
    platform: gamesJson.platform,
    memoryUsage: gamesJson.memoryUsage,
  };
});
