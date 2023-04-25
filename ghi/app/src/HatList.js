import React, { useEffect, useState } from "react";

const HatList = (props) => {
  const [hats, setHats] = useState(props.hats);

  const handleDelete = async (hatId) => {
    const url = `http://localhost:8090/api/hats/${hatId}/`;

    const fetchConfig = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    };

    await fetch(url, fetchConfig);
  };

  useEffect(() => {
    const fetchHats = async () => {
      const hatList = await fetch("http://localhost:8090/api/hats");
      if (hatList.ok) {
        const data = await hatList.json();
        setHats(data.hats);
      }
    };

    fetchHats();
  }, []);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Style</th>
          <th>Fabric</th>
          <th>Color</th>
          <th>Picture</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {hats.map((hat, i) => {
          return (
            <tr key={i}>
              <td>{hat.style}</td>
              <td>{hat.fabric}</td>
              <td>{hat.color}</td>
              <td>
                <img
                  src={
                    hat.picture_url ||
                    "data:image/png;base64,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"
                  }
                  style={{ width: "100px", height: "100px" }}
                />
              </td>
              <td>{`${hat.location.closet_name} - Section Number: ${hat.location.section_number} - Shelf Number: ${hat.location.shelf_number}`}</td>
              <td>
                <button onClick={() => handleDelete(hat.id)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default HatList;
