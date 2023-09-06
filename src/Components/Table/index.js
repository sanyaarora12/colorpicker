import React, { useEffect, useState } from "react";
import "./style.css";

function Table() {
  const [colorData, setColorData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const baseURL = "https://color-test-resources.pages.dev/xkcd-colors.json";

    fetch(baseURL)
      .then((response) => response.json())
      .then((data) => {
        const extractedColorData = data.colors.map((color) => ({
          name: color.color,
          hex: color.hex,
          rgb: hexToRgb(color.hex),
        }));

        setColorData(extractedColorData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
  };

  const filteredColorData = colorData.filter(
    (color) => color.rgb.includes(search) || color.hex.includes(search)
  );

  return (
    <div>
      <div className="header_container">
        <h1>Color Searcher</h1>
      </div>
      <div className="input">
        <input
          className="input_container"
          type="text"
          placeholder="Search by hex..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Hex</th>
            <th>RGB</th>
          </tr>
        </thead>
        <tbody>
          {filteredColorData.map((color, index) => (
            <tr key={index}>
              <td>
                {
                  <input
                    className="color_input"
                    type="color"
                    value={color.hex}
                    readOnly
                  />
                }
              </td>
              <td>{color.name}</td>
              <td>{color.hex}</td>
              <td>{color.rgb}</td>-
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
