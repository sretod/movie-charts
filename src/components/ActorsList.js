import React from "react";

const ActorsList = ({ id, name, profile_path, gender, known_for }) => {
  return (
    <div key={id} style={{ marginBottom: "75px" }}>
      <img
        src={
          "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/" + profile_path
        }
        alt="actor poster"
      ></img>
      <div style={{ fontWeight: "bold" }}>
        <p>{name}</p>{" "}
        {gender === 2 ? (
          <p className="coin-percent red">Male</p>
        ) : gender === 1 ? (
          <p className="coin-percent green">Female</p>
        ) : (
          <p className="coin-percent green">Other</p>
        )}
      </div>
      <div style={{ fontWeight: "" }}>
        {known_for.map((known, index) => {
          <p>Test</p>;
          return (
            <div key={index}>
              {known.media_type === "tv" ? (
                <p key={index + 1}>{"Tv series: " + known.name}</p>
              ) : (
                <p key={index}>{"Movie: " + known.original_title}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActorsList;
