import { useQuery } from "@apollo/client";
import { getGame } from "@/api/games.js";
import { ChaoticOrbit } from "@uiball/loaders";
import { useParams } from "react-router-dom";
import { GraphVisualizer } from "@neo4j-devtools/arc";

const Game = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(getGame, {
    variables: { gameId: id }
  });

  return (
    <div className={"mt-10 flex h-auto flex-col items-center justify-center"}>
      {loading ? (
        <ChaoticOrbit size={40} speed={1.7} color={"hsl(var(--foreground))"} />
      ) : error ? (
        <p className={"capitalize text-red-600"}>{`${error.message}!`}</p>
      ) : data?.game ? (
        <div className={"flex flex-col items-start justify-center gap-4"}>
          <div>
            <p>Title:</p>
            <p className={"rounded-sm border border-primary p-2"}>{data?.game?.title}</p>
          </div>
          <div>
            <p>Platforms:</p>
            <div className={"rounded-sm border border-primary p-2"}>
              {data?.game?.platform?.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>
          <div>
            <p>Reviews:</p>
            {data?.game?.reviews?.map((item, index) => (
              <div key={index} className={"mb-3 rounded-sm border border-primary p-2"}>
                <p>{`Rating: ${item?.rating}`}</p>
                <p className={"capitalize"}>{`Author: ${item.author.name}`}</p>
                <p>{`Content: ${item.content}`}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className={"capitalize text-red-600"}>No Game Found With That ID!</p>
      )}
      <div className={"m-10 h-[600px] w-9/12 border"}>
        <GraphVisualizer
          autocompleteRelationships={false}
          nodes={[]}
          relationships={[]}
          initialZoomToFit
        />
      </div>
    </div>
  );
};

export default Game;
